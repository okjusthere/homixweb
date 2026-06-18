import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { AgentCard } from "@/components/agents/AgentCard";
import { getAgents } from "@/lib/agents";
import { getT } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Advisors",
  description:
    "Meet the Homix team — bilingual New York real estate advisors across Queens, Long Island, and Manhattan.",
};

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
