"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LocaleToggle } from "./LocaleToggle";

export interface HeaderNavItem {
  href: string;
  label: string;
}

export interface ToolNavItem {
  href: string;
  label: string;
  desc: string;
}

export function SiteHeader({
  nav,
  buy,
  buyLabel,
  locale,
  langLabel,
  phone,
  phoneHref,
  portalLabel,
  portalHref,
}: {
  nav: HeaderNavItem[];
  buy: ToolNavItem[];
  buyLabel: string;
  locale: Locale;
  langLabel: string;
  phone: string;
  phoneHref: string;
  portalLabel: string;
  portalHref: string;
}) {
  const pathname = usePathname();
  const overHero = pathname === "/" || pathname === "/about";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const light = overHero && !scrolled && !menuOpen;
  const solid = !light;
  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
          solid ? "bg-surface/95" : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "border-b transition-colors duration-200",
            solid ? "border-line" : "border-transparent",
          )}
        >
          <div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
            <Link href="/" aria-label="Homix — home" className="flex items-center">
              <Image
                src="/homix-mark.webp"
                alt="Homix"
                width={1500}
                height={699}
                priority
                className={cn(
                  "h-10 w-auto transition-[filter] duration-200",
                  light ? "brightness-0 invert" : "",
                )}
              />
            </Link>

            <nav className="hidden items-center gap-9 md:flex">
              <NavDropdown
                label={buyLabel}
                href={buy[0]?.href}
                items={buy}
                light={light}
              />
              {nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors hover:text-bronze",
                    light ? "text-paper/90" : "text-ink/80",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-5 md:flex">
              <LocaleToggle
                locale={locale}
                label={langLabel}
                className={light ? "text-paper/90" : "text-ink/80"}
              />
              <a
                href={phoneHref}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-bronze",
                  light ? "text-paper" : "text-ink",
                )}
              >
                {phone}
              </a>
              <a
                href={portalHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "rounded-sm border px-4 py-2 text-sm font-medium transition-colors hover:border-bronze hover:bg-bronze hover:text-paper",
                  light ? "border-paper/50 text-paper" : "border-ink/30 text-ink",
                )}
              >
                {portalLabel}
              </a>
            </div>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className={cn("md:hidden", light && !menuOpen ? "text-paper" : "text-ink")}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {!overHero && <div aria-hidden className="h-[68px]" />}

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper px-5 pb-10 pt-[68px] md:hidden">
          <nav className="mt-8 flex flex-col">
            <MobileSection label={buyLabel} items={buy} onNavigate={close} />
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="border-b border-line py-4 font-serif text-2xl text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex items-center justify-between">
            <a href={phoneHref} className="text-lg font-medium text-bronze">
              {phone}
            </a>
            <LocaleToggle locale={locale} label={langLabel} className="text-ink" />
          </div>
          <a
            href={portalHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-sm border border-ink/30 px-5 py-3.5 text-base font-medium text-ink transition-colors hover:border-bronze hover:bg-bronze hover:text-paper"
          >
            {portalLabel}
            <span aria-hidden>→</span>
          </a>
        </div>
      )}
    </>
  );
}

/** A header nav item with a hover/focus dropdown. If `href` is set the trigger
 *  is a link (clicking navigates); otherwise it's a button (menu only). */
function NavDropdown({
  label,
  href,
  items,
  light,
}: {
  label: string;
  href?: string;
  items: ToolNavItem[];
  light: boolean;
}) {
  const trigger = cn(
    "flex items-center gap-1 text-sm transition-colors hover:text-bronze",
    light ? "text-paper/90" : "text-ink/80",
  );
  const chevron = (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      aria-hidden
      className="opacity-70 transition-transform duration-200 group-hover:rotate-180"
    >
      <path
        d="M2.5 4.5L6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return (
    <div className="group relative">
      {href ? (
        <Link href={href} className={trigger}>
          {label}
          {chevron}
        </Link>
      ) : (
        <button type="button" aria-haspopup="true" className={trigger}>
          {label}
          {chevron}
        </button>
      )}
      <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="overflow-hidden rounded-sm border border-line bg-surface py-1.5">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="block px-4 py-2.5 transition-colors hover:bg-paper"
            >
              <p className="text-sm font-medium text-ink">{it.label}</p>
              <p className="mt-0.5 text-xs leading-snug text-muted">{it.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileSection({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: ToolNavItem[];
  onNavigate: () => void;
}) {
  return (
    <>
      <Eyebrow className="mb-1 mt-6 first:mt-0">{label}</Eyebrow>
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          onClick={onNavigate}
          className="border-b border-line py-3 text-lg text-ink"
        >
          {it.label}
        </Link>
      ))}
    </>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      {open ? (
        <>
          <line x1="6" y1="6" x2="20" y2="20" stroke="currentColor" strokeWidth="1.6" />
          <line x1="20" y1="6" x2="6" y2="20" stroke="currentColor" strokeWidth="1.6" />
        </>
      ) : (
        <>
          <line x1="4" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="1.6" />
          <line x1="4" y1="17" x2="22" y2="17" stroke="currentColor" strokeWidth="1.6" />
        </>
      )}
    </svg>
  );
}
