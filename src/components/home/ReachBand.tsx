import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n";
import { socialReach } from "@/lib/site";

/**
 * "Our reach" — honest content-platform presence in place of a press logo wall.
 * Homix's real asset is its own media following — exactly the "headlines" promise.
 */
export async function ReachBand() {
  const { t } = await getT();
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{t.reach.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.4rem]">
            {t.reach.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{t.reach.lead}</p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
          {socialReach.map((channel, i) => (
            <Reveal key={channel.platform} delay={i * 60} className="bg-surface">
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 transition-colors hover:bg-paper sm:p-10"
              >
                <p className="eyebrow">{channel.platform}</p>
                <p className="mt-3 font-serif text-2xl text-ink transition-colors group-hover:text-bronze">
                  {channel.handle}
                </p>
                <p className="mt-2 text-sm text-muted">{channel.stat}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
