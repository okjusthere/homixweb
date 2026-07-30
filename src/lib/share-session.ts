"use client";

const ATTRIBUTION_KEY = "homix-share-attribution";
const ATTRIBUTION_TTL_MS = 30 * 60 * 1000;
const CODE_PATTERN = /^[A-Za-z0-9_-]{8,24}$/;
const SESSION_PATTERN = /^[A-Za-z0-9-]{20,64}$/;

export type StoredShareAttribution = {
  code: string;
  sessionKey: string;
  originPath: string;
  lastActiveAt: number;
};

function sessionStore(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function validClientShareCode(value: string): boolean {
  return CODE_PATTERN.test(value);
}

export function getOrCreateShareSession(code: string): string | null {
  if (!validClientShareCode(code)) return null;
  const store = sessionStore();
  if (!store) return null;
  const key = `homix-share-session:${code}`;
  const existing = store.getItem(key);
  if (existing && SESSION_PATTERN.test(existing)) return existing;
  const created = window.crypto.randomUUID();
  store.setItem(key, created);
  return created;
}

export function readShareAttribution(): StoredShareAttribution | null {
  const store = sessionStore();
  if (!store) return null;
  try {
    const parsed = JSON.parse(store.getItem(ATTRIBUTION_KEY) || "null") as
      | StoredShareAttribution
      | null;
    if (
      !parsed ||
      !validClientShareCode(parsed.code) ||
      !SESSION_PATTERN.test(parsed.sessionKey) ||
      !parsed.originPath.startsWith("/") ||
      !Number.isFinite(parsed.lastActiveAt) ||
      Date.now() - parsed.lastActiveAt > ATTRIBUTION_TTL_MS
    ) {
      store.removeItem(ATTRIBUTION_KEY);
      return null;
    }
    return parsed;
  } catch {
    store.removeItem(ATTRIBUTION_KEY);
    return null;
  }
}

export function saveShareAttribution(
  value: Omit<StoredShareAttribution, "lastActiveAt">,
): void {
  const store = sessionStore();
  if (!store) return;
  store.setItem(
    ATTRIBUTION_KEY,
    JSON.stringify({ ...value, lastActiveAt: Date.now() }),
  );
}

export function touchShareAttribution(code: string): void {
  const current = readShareAttribution();
  if (!current || current.code !== code) return;
  saveShareAttribution(current);
}

export function clearShareAttribution(): void {
  sessionStore()?.removeItem(ATTRIBUTION_KEY);
}
