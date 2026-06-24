import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { legalDocs } from "@/content/legal";
import { getT } from "@/lib/i18n";

/** Renders a bilingual legal document by key (privacy / terms / etc.). */
export async function LegalLayout({ doc }: { doc: keyof typeof legalDocs }) {
  const { locale, t } = await getT();
  const d = legalDocs[doc];

  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>{t.common.legal}</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          {d.title[locale]}
        </h1>
        <p className="mt-5 text-xl leading-relaxed text-muted">{d.intro[locale]}</p>

        {d.note && (
          <p className="mt-6 rounded-sm border border-line bg-surface p-4 text-sm text-muted">
            {t.legal.note}
          </p>
        )}

        <div className="mt-10 space-y-10">
          {d.sections.map((s) => (
            <section key={s.heading.en}>
              <h2 className="font-serif text-2xl text-ink">{s.heading[locale]}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-ink/85">
                {s.body[locale].split("\n\n").map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
