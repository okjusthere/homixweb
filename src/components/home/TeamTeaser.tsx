import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getAgents } from "@/lib/agents";
import { getT } from "@/lib/i18n";

export async function TeamTeaser() {
  const { t } = await getT();
  const agents = (await getAgents()).slice(0, 3);

  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-4">
            <Eyebrow>{t.team.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.4rem]">
              {t.team.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{t.team.lead}</p>
            <div className="mt-8">
              <Button href="/agents" variant="outline">
                {t.team.cta}
              </Button>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {agents.map((agent, i) => (
                <Reveal key={agent.id} delay={i * 70}>
                  <Link
                    href={`/agents/${agent.slug}`}
                    className="group block focus-visible:outline-none"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-line/50">
                      <Image
                        src={agent.photo}
                        alt={agent.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 200px"
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium text-ink transition-colors group-hover:text-bronze">
                      {agent.name}
                    </p>
                    <p className="text-sm text-muted">{agent.title}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
