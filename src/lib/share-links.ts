import { createHmac } from "node:crypto";
import { getSupabase } from "@/lib/supabase";
import { normalizeShareContentPath } from "@/lib/share-catalog";

const SHARE_CODE = /^[A-Za-z0-9_-]{8,24}$/;
const SESSION_KEY = /^[A-Za-z0-9-]{20,64}$/;

export type PublicShareAgent = {
  slug: string;
  name: string;
  title: string | null;
  photoUrl: string | null;
  phone: string | null;
  email: string | null;
  licenseNumber: string | null;
  wechatQr: string | null;
};

export type PublicShareContext = {
  linkId: number;
  agentId: number;
  code: string;
  contentPath: string;
  contentTitle: string;
  locale: "en" | "zh";
  agent: PublicShareAgent;
};

type ShareLinkRow = {
  id: number;
  code: string;
  agent_id: number;
  content_path: string;
  content_title: string;
  locale: "en" | "zh";
  is_active: boolean;
};

export function validShareCode(value: unknown): value is string {
  return typeof value === "string" && SHARE_CODE.test(value);
}

export function validShareSession(value: unknown): value is string {
  return typeof value === "string" && SESSION_KEY.test(value);
}

export async function resolvePublicShare(
  code: string,
  expectedPath?: string,
): Promise<PublicShareContext | null> {
  if (!validShareCode(code)) return null;
  const sb = getSupabase();
  if (!sb) return null;

  const { data: linkData, error: linkError } = await sb
    .from("share_links")
    .select("id, code, agent_id, content_path, content_title, locale, is_active")
    .eq("code", code)
    .eq("is_active", true)
    .maybeSingle();
  if (linkError) {
    console.error("Share link lookup failed:", linkError.message);
    return null;
  }
  const link = linkData as ShareLinkRow | null;
  if (!link) return null;
  if (
    expectedPath &&
    normalizeShareContentPath(expectedPath) !==
      normalizeShareContentPath(link.content_path)
  ) {
    return null;
  }

  const { data: agentData, error: agentError } = await sb
    .from("agents")
    .select(
      "slug, name, title, photo_url, phone, email, license_number, wechat_qr, visibility_status",
    )
    .eq("portal_agent_id", link.agent_id)
    .eq("visibility_status", "visible")
    .maybeSingle();
  if (agentError) {
    console.error("Share agent lookup failed:", agentError.message);
    return null;
  }
  if (!agentData) return null;

  return {
    linkId: link.id,
    agentId: link.agent_id,
    code: link.code,
    contentPath: normalizeShareContentPath(link.content_path),
    contentTitle: link.content_title,
    locale: link.locale === "en" ? "en" : "zh",
    agent: {
      slug: String(agentData.slug),
      name: String(agentData.name),
      title: agentData.title ? String(agentData.title) : null,
      photoUrl: agentData.photo_url ? String(agentData.photo_url) : null,
      phone: agentData.phone ? String(agentData.phone) : null,
      email: agentData.email ? String(agentData.email) : null,
      licenseNumber: agentData.license_number
        ? String(agentData.license_number)
        : null,
      wechatQr: agentData.wechat_qr ? String(agentData.wechat_qr) : null,
    },
  };
}

export async function resolveTrackedShare(
  code: string,
  currentPath: string,
  sessionKey?: string | null,
): Promise<PublicShareContext | null> {
  const context = await resolvePublicShare(code);
  if (!context) return null;
  if (
    normalizeShareContentPath(currentPath) ===
    normalizeShareContentPath(context.contentPath)
  ) {
    return context;
  }
  if (!sessionKey || !validShareSession(sessionKey)) return null;

  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("share_visits")
    .select("share_link_id")
    .eq("session_key", sessionKey)
    .maybeSingle();
  if (error) {
    console.error("Share continuation lookup failed:", error.message);
    return null;
  }
  return data && Number(data.share_link_id) === context.linkId ? context : null;
}

export function visitorHash(ip: string, userAgent: string): string {
  const secret =
    process.env.SHARE_ANALYTICS_SALT?.trim() ||
    process.env.AGENTS_REVALIDATE_SECRET?.trim() ||
    "homix-share-local-development";
  return createHmac("sha256", secret)
    .update(`${ip.slice(0, 120)}\n${userAgent.slice(0, 500)}`)
    .digest("hex");
}

export function deviceType(userAgent: string): "mobile" | "tablet" | "desktop" {
  if (/ipad|tablet|kindle|silk/i.test(userAgent)) return "tablet";
  if (/mobile|iphone|ipod|android/i.test(userAgent)) return "mobile";
  return "desktop";
}

export function referrerDomain(value: string): string | null {
  if (!value) return null;
  try {
    return new URL(value).hostname.slice(0, 200) || null;
  } catch {
    return null;
  }
}

export async function upsertShareVisit(input: {
  context: PublicShareContext;
  sessionKey: string;
  visitorHash: string;
  referrerDomain: string | null;
  deviceType: "mobile" | "tablet" | "desktop";
  activeSecondsDelta: number;
  maxScrollDepth: number;
}): Promise<number | null> {
  if (!validShareSession(input.sessionKey)) return null;
  const sb = getSupabase();
  if (!sb) return null;

  const { data: existing, error: loadError } = await sb
    .from("share_visits")
    .select("id, share_link_id, active_seconds, max_scroll_depth")
    .eq("session_key", input.sessionKey)
    .maybeSingle();
  if (loadError) {
    console.error("Share visit lookup failed:", loadError.message);
    return null;
  }
  const now = new Date().toISOString();
  const delta = Math.min(60, Math.max(0, Math.floor(input.activeSecondsDelta)));
  const scroll = Math.min(100, Math.max(0, Math.floor(input.maxScrollDepth)));

  if (existing) {
    if (Number(existing.share_link_id) !== input.context.linkId) return null;
    const { error } = await sb
      .from("share_visits")
      .update({
        active_seconds: Math.min(
          86_400,
          Math.max(0, Number(existing.active_seconds) || 0) + delta,
        ),
        max_scroll_depth: Math.max(
          Math.max(0, Number(existing.max_scroll_depth) || 0),
          scroll,
        ),
        last_seen_at: now,
      })
      .eq("id", existing.id);
    if (error) {
      console.error("Share visit update failed:", error.message);
      return null;
    }
    return Number(existing.id);
  }

  const { data, error } = await sb
    .from("share_visits")
    .insert({
      share_link_id: input.context.linkId,
      session_key: input.sessionKey,
      visitor_hash: input.visitorHash,
      referrer_domain: input.referrerDomain,
      device_type: input.deviceType,
      active_seconds: delta,
      max_scroll_depth: scroll,
      started_at: now,
      last_seen_at: now,
    })
    .select("id")
    .single();
  if (error) {
    // Concurrent first heartbeats can race; the next heartbeat will update the
    // row selected by session_key, so this request can fail quietly.
    if (error.code !== "23505") {
      console.error("Share visit insert failed:", error.message);
    }
    return null;
  }
  return Number(data.id);
}

export async function recordShareEvent(input: {
  context: PublicShareContext;
  sessionKey?: string | null;
  eventType: "call" | "email" | "wechat" | "profile" | "inquiry";
  metadata?: Record<string, unknown>;
}): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  let visitId: number | null = null;
  if (input.sessionKey && validShareSession(input.sessionKey)) {
    const { data } = await sb
      .from("share_visits")
      .select("id, share_link_id")
      .eq("session_key", input.sessionKey)
      .maybeSingle();
    if (data && Number(data.share_link_id) === input.context.linkId) {
      visitId = Number(data.id);
    }
  }

  const { error } = await sb.from("share_events").insert({
    share_link_id: input.context.linkId,
    visit_id: visitId,
    event_type: input.eventType,
    metadata: input.metadata ?? null,
  });
  if (error) {
    console.error("Share event insert failed:", error.message);
    return false;
  }
  return true;
}
