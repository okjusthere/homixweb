import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getT } from "@/lib/i18n";
import { primaryNav, siteConfig, toolsNav } from "@/lib/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.market} Real Estate`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.market} Real Estate`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, t } = await getT();
  const nav = primaryNav.map((item) => ({
    href: item.href,
    label: t.common[item.key as keyof typeof t.common],
  }));
  const tools = toolsNav.map((item) => ({
    href: item.href,
    label: t.common[item.key as keyof typeof t.common],
    desc: t.toolDesc[item.key as keyof typeof t.toolDesc],
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
          Skip to content
        </a>
        <SiteHeader
          nav={nav}
          tools={tools}
          toolsLabel={t.common.tools}
          locale={locale}
          langLabel={t.common.langLabel}
          phone={siteConfig.contact.phone}
          phoneHref={siteConfig.contact.phoneHref}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
