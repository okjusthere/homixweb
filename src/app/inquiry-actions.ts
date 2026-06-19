"use server";

import { cookies, headers } from "next/headers";
import { sendInquiryEmail, type InquiryEmailData } from "@/lib/inquiry-email";
import { getSupabase } from "@/lib/supabase";

export interface InquiryActionState {
  ok: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "consent", string>>;
}

const SUCCESS_MESSAGE = "Thank you. We received your inquiry and will be in touch shortly.";

function clean(value: FormDataEntryValue | null, max: number): string {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanMessage(value: FormDataEntryValue | null): string {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim()
    .slice(0, 2000);
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function clientIp(h: Headers): string {
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || "";
}

export async function submitInquiry(
  _prev: InquiryActionState | null,
  formData: FormData,
): Promise<InquiryActionState> {
  const honeypot = clean(formData.get("company"), 120);
  if (honeypot) return { ok: true, message: SUCCESS_MESSAGE };

  const name = clean(formData.get("name"), 120);
  const phone = clean(formData.get("phone"), 40);
  const email = clean(formData.get("email"), 254).toLowerCase();
  const message = cleanMessage(formData.get("message"));
  const source = clean(formData.get("source"), 80) || "website";
  const pagePath = clean(formData.get("page_path"), 300);
  const consent = formData.get("consent") === "on";

  const fieldErrors: InquiryActionState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Please enter your name.";
  if (!validEmail(email)) fieldErrors.email = "Please enter a valid email.";
  if (!consent) fieldErrors.consent = "Please confirm consent before submitting.";
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, error: "Please check the highlighted fields.", fieldErrors };
  }

  const h = await headers();
  const store = await cookies();
  const locale = store.get("locale")?.value === "zh" ? "zh" : "en";
  const metadata = {
    ip_address: clientIp(h) || null,
    user_agent: h.get("user-agent") || null,
    referrer: h.get("referer") || null,
  };

  const emailData: InquiryEmailData = {
    name,
    phone,
    email,
    message,
    source,
    pagePath,
    locale,
  };

  const sb = getSupabase();
  let inquiryId: string | null = null;
  let stored = false;

  if (sb) {
    const { data, error } = await sb
      .from("inquiries")
      .insert({
        name,
        phone: phone || null,
        email,
        message: message || null,
        consent,
        source,
        page_path: pagePath || null,
        locale,
        status: "received",
        ...metadata,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Inquiry insert failed:", error.message);
    } else {
      stored = true;
      inquiryId = data?.id ?? null;
    }
  }

  const emailResult = await sendInquiryEmail(emailData);
  if (!emailResult.sent) {
    console.error("Inquiry email failed:", emailResult.error);
  }

  if (sb && inquiryId) {
    await sb
      .from("inquiries")
      .update({
        status: emailResult.sent
          ? "emailed"
          : emailResult.skipped
            ? "stored_email_not_configured"
            : "stored_email_failed",
        email_sent_at: emailResult.sent ? new Date().toISOString() : null,
        email_error: emailResult.sent ? null : emailResult.error,
      })
      .eq("id", inquiryId);
  }

  if (!stored && !emailResult.sent) {
    return {
      ok: false,
      error:
        "We could not send your inquiry right now. Please call or email Homix directly.",
    };
  }

  return { ok: true, message: SUCCESS_MESSAGE };
}
