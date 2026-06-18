import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MortgageCalculator } from "@/components/tools/MortgageCalculator";
import { getT } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description: "Estimate your monthly mortgage payment for a New York home.",
};

export default async function CalculatorPage() {
  const { t } = await getT();
  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl">
          <Eyebrow>{t.calculator.eyebrow}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
            {t.calculator.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t.calculator.lead}</p>
        </div>

        <div className="mt-12">
          <MortgageCalculator labels={t.calculator} />
        </div>

        <p className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-muted">
          {t.calculator.disclaimer}
        </p>
      </div>
    </Container>
  );
}
