"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/locale";

type ShareContext = {
  code: string;
  contentPath: string;
  contentTitle: string;
  locale: Locale;
  agent: {
    slug: string;
    name: string;
    title: string | null;
    photoUrl: string | null;
    phone: string | null;
    email: string | null;
    licenseNumber: string | null;
    wechatQr: string | null;
  };
};

function sessionKey(code: string): string {
  const key = `homix-share-session:${code}`;
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;
  const created = window.crypto.randomUUID();
  window.sessionStorage.setItem(key, created);
  return created;
}

function normalizePath(pathname: string): string {
  return pathname.replace(/^\/(?:en|zh)(?=\/|$)/, "") || "/";
}

export function ShareAttribution({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const code = searchParams.get("share") || "";
  const normalizedPath = normalizePath(pathname);
  const [context, setContext] = useState<ShareContext | null>(null);
  const activeContext =
    context?.code === code && context.contentPath === normalizedPath
      ? context
      : null;
  const [wechatOpen, setWechatOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);
  const sessionRef = useRef("");

  useEffect(() => {
    if (!/^[A-Za-z0-9_-]{8,24}$/.test(code)) return;
    const controller = new AbortController();
    fetch(
      `/api/share/context?code=${encodeURIComponent(code)}&path=${encodeURIComponent(normalizedPath)}`,
      { cache: "no-store", signal: controller.signal },
    )
      .then(async (response) => {
        if (!response.ok) return null;
        return (await response.json()) as ShareContext;
      })
      .then((value) => {
        if (!value) return;
        sessionRef.current = sessionKey(code);
        setContext(value);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [code, normalizedPath]);

  const postVisit = useCallback(
    (activeSecondsDelta: number, maxScrollDepth: number, beacon = false) => {
      if (!activeContext || !sessionRef.current) return;
      const body = JSON.stringify({
        code: activeContext.code,
        path: normalizedPath,
        sessionKey: sessionRef.current,
        activeSecondsDelta,
        maxScrollDepth,
        referrer: document.referrer,
      });
      if (beacon && navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/share/visit",
          new Blob([body], { type: "application/json" }),
        );
        return;
      }
      void fetch("/api/share/visit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body,
        keepalive: true,
      });
    },
    [activeContext, normalizedPath],
  );

  useEffect(() => {
    if (!activeContext) return;
    let pendingSeconds = 0;
    let maxScrollDepth = 0;

    const updateDepth = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const depth =
        scrollable <= 0 ? 100 : Math.round((window.scrollY / scrollable) * 100);
      maxScrollDepth = Math.max(maxScrollDepth, Math.min(100, Math.max(0, depth)));
    };
    const flush = (beacon = false) => {
      if (pendingSeconds === 0 && !beacon) return;
      postVisit(pendingSeconds, maxScrollDepth, beacon);
      pendingSeconds = 0;
    };

    updateDepth();
    postVisit(0, maxScrollDepth);
    const tick = window.setInterval(() => {
      if (document.visibilityState !== "visible" || !document.hasFocus()) return;
      pendingSeconds += 1;
      if (pendingSeconds >= 15) flush();
    }, 1000);
    const heartbeat = window.setInterval(() => flush(), 15_000);
    const onPageHide = () => flush(true);

    window.addEventListener("scroll", updateDepth, { passive: true });
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.clearInterval(tick);
      window.clearInterval(heartbeat);
      window.removeEventListener("scroll", updateDepth);
      window.removeEventListener("pagehide", onPageHide);
      flush(true);
    };
  }, [activeContext, postVisit]);

  useEffect(() => {
    if (!activeContext || !bannerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, [activeContext]);

  const trackEvent = useCallback(
    (eventType: "call" | "email" | "wechat" | "profile") => {
      if (!activeContext) return;
      void fetch("/api/share/event", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          code: activeContext.code,
          path: normalizedPath,
          sessionKey: sessionRef.current || null,
          eventType,
        }),
        keepalive: true,
      });
    },
    [activeContext, normalizedPath],
  );

  if (!activeContext) return null;

  const zh = locale === "zh";
  const profileHref =
    locale === "zh"
      ? `/zh/agents/${activeContext.agent.slug}`
      : `/agents/${activeContext.agent.slug}`;
  const phoneHref = activeContext.agent.phone
    ? `tel:${activeContext.agent.phone.replace(/[^\d+]/g, "")}`
    : null;
  const emailHref = activeContext.agent.email
    ? `mailto:${activeContext.agent.email}`
    : null;

  return (
    <>
      <section
        ref={bannerRef}
        className="border-y border-bronze/40 bg-ink text-paper"
        aria-label={zh ? "分享经纪人联系方式" : "Sharing agent contact"}
      >
        <div className="mx-auto grid min-h-[350px] max-w-[1320px] grid-cols-1 gap-8 px-5 py-9 sm:px-8 md:min-h-0 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:py-8 lg:px-12">
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-5">
              <Image
                src="/homix-mark-small.webp"
                alt="Homix"
                width={1500}
                height={699}
                className="h-9 w-auto brightness-0 invert"
                priority
              />
              <span className="text-[11px] uppercase tracking-[0.14em] text-paper/60">
                {zh ? "Homix 经纪人为你分享" : "Shared by your Homix advisor"}
              </span>
            </div>

            <div className="mt-7 flex items-center gap-5">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-paper/20 bg-paper/10">
                <Image
                  src={activeContext.agent.photoUrl || "/agent-placeholder-logo.png"}
                  alt={activeContext.agent.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-serif text-3xl leading-tight text-paper">
                  {activeContext.agent.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-paper/70">
                  {activeContext.agent.title ||
                    (zh
                      ? "Licensed Real Estate Salesperson"
                      : "Licensed Real Estate Salesperson")}
                </p>
                {activeContext.agent.licenseNumber && (
                  <p className="mt-1 text-xs text-paper/55">
                    {zh ? "执照" : "License"} {activeContext.agent.licenseNumber}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {phoneHref && (
                <a
                  href={phoneHref}
                  onClick={() => trackEvent("call")}
                  className="inline-flex min-h-11 items-center justify-center rounded-sm bg-bronze px-5 text-sm font-medium text-paper transition-colors hover:bg-bronze-dark"
                >
                  {zh ? "致电" : "Call"} {activeContext.agent.phone}
                </a>
              )}
              {emailHref && (
                <a
                  href={emailHref}
                  onClick={() => trackEvent("email")}
                  className="inline-flex min-h-11 items-center justify-center rounded-sm border border-paper/30 px-5 text-sm text-paper transition-colors hover:border-bronze hover:text-bronze"
                >
                  {zh ? "邮件联系" : "Email"}
                </a>
              )}
              {activeContext.agent.wechatQr && (
                <button
                  type="button"
                  onClick={() => {
                    setWechatOpen(true);
                    trackEvent("wechat");
                  }}
                  className="min-h-11 rounded-sm border border-paper/30 px-5 text-sm text-paper transition-colors hover:border-bronze hover:text-bronze"
                >
                  {zh ? "微信" : "WeChat"}
                </button>
              )}
              <Link
                href={profileHref}
                onClick={() => trackEvent("profile")}
                className="inline-flex min-h-11 items-center justify-center px-2 text-sm text-paper/75 underline decoration-paper/30 underline-offset-4 hover:text-bronze"
              >
                {zh ? "查看个人主页" : "View profile"}
              </Link>
            </div>
          </div>

          <div className="border-t border-paper/15 pt-5 md:max-w-sm md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <p className="text-[11px] uppercase tracking-[0.14em] text-paper/50">
              {zh ? "正在阅读" : "Now viewing"}
            </p>
            <p className="mt-2 font-serif text-2xl leading-snug text-paper">
              {activeContext.contentTitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-paper/60">
              {zh
                ? "内容由 Homix 官方网站提供，房源与文章保持实时更新。"
                : "Official Homix content, kept current at its original source."}
            </p>
          </div>
        </div>
      </section>

      {stickyVisible && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-bronze/40 bg-ink px-4 py-3 text-paper shadow-[0_-8px_24px_rgba(0,0,0,0.16)]">
          <div className="mx-auto flex max-w-[1320px] items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-paper/10">
              <Image
                src={activeContext.agent.photoUrl || "/agent-placeholder-logo.png"}
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{activeContext.agent.name}</p>
              <p className="truncate text-xs text-paper/55">
                {zh ? "你的 Homix 经纪人" : "Your Homix advisor"}
              </p>
            </div>
            {phoneHref && (
              <a
                href={phoneHref}
                onClick={() => trackEvent("call")}
                className="inline-flex h-10 shrink-0 items-center rounded-sm bg-bronze px-4 text-sm font-medium"
              >
                {zh ? "联系" : "Contact"}
              </a>
            )}
          </div>
        </div>
      )}

      {wechatOpen && activeContext.agent.wechatQr && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zh ? "微信二维码" : "WeChat QR code"}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/75 p-5"
          onClick={() => setWechatOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-sm bg-surface p-6 text-center text-ink"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="font-serif text-2xl">{activeContext.agent.name}</p>
            <p className="mt-1 text-sm text-muted">
              {zh ? "长按或扫码添加微信" : "Scan to connect on WeChat"}
            </p>
            <div className="relative mx-auto mt-5 aspect-square w-full max-w-[280px] overflow-hidden bg-white">
              <Image
                src={activeContext.agent.wechatQr}
                alt={zh ? "微信二维码" : "WeChat QR code"}
                fill
                sizes="280px"
                className="object-contain"
              />
            </div>
            <button
              type="button"
              onClick={() => setWechatOpen(false)}
              className="mt-5 min-h-11 w-full rounded-sm border border-line text-sm hover:border-bronze"
            >
              {zh ? "关闭" : "Close"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
