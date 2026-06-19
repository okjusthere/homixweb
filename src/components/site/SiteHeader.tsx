"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import { LocaleToggle } from "./LocaleToggle";

export interface HeaderNavItem {
  href: string;
  label: string;
}

export function SiteHeader({
  nav,
  locale,
  langLabel,
  phone,
  phoneHref,
}: {
  nav: HeaderNavItem[];
  locale: Locale;
  langLabel: string;
  phone: string;
  phoneHref: string;
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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
          solid ? "bg-surface/95 backdrop-blur-sm" : "bg-transparent",
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
        <div className="fixed inset-0 z-40 flex flex-col bg-paper px-5 pb-10 pt-[68px] md:hidden">
          <nav className="mt-8 flex flex-col gap-2">
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
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
        </div>
      )}
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
