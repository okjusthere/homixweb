import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { AgentCard } from "@/components/agents/AgentCard";
import { getAgents } from "@/lib/agents";
import { getLocale, getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({
    path: "/agents",
    locale,
    title: {
      en: "Our Advisors — Bilingual NYC Real Estate Agents",
      zh: "纽约华人房产经纪人——中英双语持牌团队",
    },
    description: {
      en: "Meet the Homix team — licensed, bilingual English/Chinese real estate agents serving buyers and sellers across Queens, Manhattan, and Long Island.",
      zh: "Homix 纽约房产经纪人团队均为持牌顾问，提供中英双语服务，熟悉皇后区、曼哈顿、布鲁克林与长岛市场，从看房、谈判到过户全程陪同。",
    },
  });
}

export default async function AgentsPage() {
  const { t } = await getT();
  const agents = await getAgents();

  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <Eyebrow>{t.agentsPage.eyebrow}</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          {t.agentsPage.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {t.agentsPage.lead}
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {agents.map((agent, i) => (
          <Reveal key={agent.id} delay={(i % 4) * 50}>
            <AgentCard agent={agent} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
