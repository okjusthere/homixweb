import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Inter } from "next/font/google";
import { Suspense } from "react";
import "../globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ShareAttribution } from "@/components/share/ShareAttribution";
import { getRouteLocale, getT } from "@/lib/i18n";
import { isLocale, locales, localizePath } from "@/lib/locale";
import { buyNav, primaryNav, siteConfig } from "@/lib/site";
import { jsonLd, organizationLd, webSiteLd } from "@/lib/seo";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// CMS-backed child routes (notably /agents/[slug]) must be able to render
// records created after the last deployment. The locale values themselves are
// still prebuilt below, while the public proxy only emits "en" or "zh".
export const dynamicParams = true;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${siteConfig.market} Real Estate`,
      template: `%s · ${siteConfig.name}`,
    },
    description: siteConfig.description,
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: `${siteConfig.name} — ${siteConfig.market} Real Estate`,
      description: siteConfig.description,
    },
    // Card type ONLY. Setting twitter.title/description here would be
    // inherited verbatim by every page and suppress Next's per-page auto-fill
    // from OG — the old root config made every twitter card read just "Homix".
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const { locale, t } = await getT(localeParam);
  const nav = primaryNav.map((item) => ({
    href: localizePath(locale, item.href),
    label: t.common[item.key as keyof typeof t.common],
  }));
  const buy = buyNav.map((href, i) => ({
    href: localizePath(locale, href),
    label: t.buyMenu[i].title,
    desc: t.buyMenu[i].desc,
  }));

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${inter.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        <a
          href="#main"
          className="absolute left-4 top-4 z-[100] -translate-y-24 rounded-sm bg-ink px-4 py-2 text-sm text-paper transition-transform focus:translate-y-0"
        >
          {locale === "zh" ? "跳至正文" : "Skip to content"}
        </a>
        <SiteHeader
          nav={nav}
          buy={buy}
          buyLabel={t.common.listings}
          locale={locale}
          homeHref={localizePath(locale, "/")}
          langLabel={t.common.langLabel}
          phone={siteConfig.contact.phone}
          phoneHref={siteConfig.contact.phoneHref}
          portalLabel={t.common.agentLogin}
          portalHref={siteConfig.portalUrl}
        />
        <Suspense fallback={null}>
          <ShareAttribution locale={locale} />
        </Suspense>
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} />
        {/* Sitewide brand entity for search + AI engines (NAP, license, geo,
            bilingual alternate names, social profiles). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(webSiteLd()) }}
        />
      </body>
    </html>
  );
}
