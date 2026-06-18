import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { getAgents, getAgentBySlug } from "@/lib/agents";
import { getT } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const agents = await getAgents();
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) return { title: "Advisor not found" };
  return {
    title: agent.name,
    description: agent.bio?.slice(0, 155) || `${agent.name}, ${agent.title} at Homix.`,
  };
}

export default async function AgentProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) notFound();

  const { locale, t } = await getT();
  const social = Object.entries(agent.social ?? {}).filter(([, v]) => v) as [
    string,
    string,
  ][];

  const fallbackBio =
    locale === "zh"
      ? `${agent.name} 是 Homix 的纽约持牌地产专业人士，服务大纽约地区的买家与卖家。`
      : `${agent.name} is a licensed New York real estate professional with Homix, serving buyers and sellers across the greater New York market.`;
  const callLabel = locale === "zh" ? "致电" : "Call";
  const emailLabel = locale === "zh" ? "邮件" : "Email";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: agent.name,
    jobTitle: agent.title,
    image: agent.photo,
    telephone: agent.phone || undefined,
    email: agent.email || undefined,
    worksFor: { "@type": "Organization", name: siteConfig.legalName },
  };

  return (
    <Container className="py-12 sm:py-16">
      <Link
        href="/agents"
        className="text-sm text-muted underline-offset-4 transition-colors hover:text-bronze hover:underline"
      >
        ← {t.agentsPage.title}
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-line/50">
            <Image
              src={agent.photo}
              alt={agent.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <Eyebrow>{agent.title}</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
            {agent.name}
          </h1>

          {agent.specialties.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {agent.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-sm border border-line px-3 py-1 text-xs text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          <p className="mt-7 whitespace-pre-line text-lg leading-relaxed text-ink/85">
            {agent.bio || fallbackBio}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {agent.phone && (
              <Button href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}>
                {callLabel} {agent.phone}
              </Button>
            )}
            {agent.email && (
              <Button href={`mailto:${agent.email}`} variant="outline">
                {emailLabel}
              </Button>
            )}
          </div>

          {(social.length > 0 || agent.profileUrl || agent.licenseNumber) && (
            <div className="mt-8 space-y-2 border-t border-line pt-6 text-sm text-muted">
              {agent.licenseNumber && (
                <p>
                  {t.agentsPage.licenseNo}
                  {agent.licenseNumber}
                </p>
              )}
              {social.length > 0 && (
                <p className="flex flex-wrap gap-x-4">
                  {social.map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="capitalize text-ink underline-offset-4 hover:text-bronze hover:underline"
                    >
                      {platform}
                    </a>
                  ))}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Container>
  );
}
