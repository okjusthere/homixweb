import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";
import { ShareRedirect } from "./ShareRedirect";
import { localizePath, localeFromParam } from "@/lib/locale";
import { resolvePublicShare } from "@/lib/share-links";
import { absUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SharePageProps = {
  params: Promise<{ locale: string; code: string }>;
};

const getShareContext = cache(resolvePublicShare);

function destinationPath(
  context: NonNullable<Awaited<ReturnType<typeof resolvePublicShare>>>,
) {
  const path = localizePath(context.locale, context.contentPath);
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}share=${encodeURIComponent(context.code)}`;
}

export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const { code } = await params;
  const context = await getShareContext(code);
  if (!context) {
    return {
      title: { absolute: siteConfig.name },
      robots: { index: false, follow: false },
    };
  }

  const { agent, locale } = context;
  const zh = locale === "zh";
  const title = zh
    ? `Homix Realty 的 ${agent.name}`
    : `${agent.name} at Homix Realty`;
  const description = zh
    ? `${agent.name} 来自 Homix Realty，专注纽约买卖、租赁与地产资讯。`
    : `${agent.name} at Homix Realty. New York homes, rentals, and real estate insights.`;
  const cardQuery = new URLSearchParams({
    card: "agent-v2",
    v: context.cardVersion,
  });
  const image = absUrl(agent.photoUrl || "/agent-placeholder-logo.png");
  const shareUrl = absUrl(
    `/s/${encodeURIComponent(context.code)}?${cardQuery.toString()}`,
  );
  const canonical = absUrl(localizePath(locale, context.contentPath));

  return {
    title: { absolute: title },
    description,
    robots: { index: false, follow: true },
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: shareUrl,
      siteName: "Homix Realty",
      locale: zh ? "zh_CN" : "en_US",
      title,
      description,
      images: [
        {
          url: image,
          width: 600,
          height: 600,
          alt: `${agent.name}, Homix Realty`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ShareLandingPage({ params }: SharePageProps) {
  const { code, locale: localeParam } = await params;
  const context = await getShareContext(code);
  if (!context) redirect(localizePath(localeFromParam(localeParam), "/"));

  return (
    <ShareRedirect
      target={destinationPath(context)}
      name={context.agent.name}
      photoUrl={absUrl(context.agent.photoUrl || "/agent-placeholder-logo.png")}
      locale={context.locale}
    />
  );
}
