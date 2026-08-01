import type { Metadata } from "next";
import { AgentDirectory } from "@/components/agents/AgentDirectory";
import { Container } from "@/components/ui/Container";
import { getAgents } from "@/lib/agents";
import { getRouteLocale, getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
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

export default async function AgentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getRouteLocale(params);
  const { t } = await getT(locale);
  const agents = await getAgents();

  return (
    <Container className="py-12 sm:py-16">
      <AgentDirectory agents={agents} labels={t.agentsPage} />
    </Container>
  );
}
