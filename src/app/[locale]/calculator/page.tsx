import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MortgageCalculator } from "@/components/tools/MortgageCalculator";
import { getRouteLocale, getT } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({
    path: "/calculator",
    locale,
    title: {
      en: "Mortgage Calculator — Estimate Your Monthly Payment",
      zh: "房贷计算器——估算纽约买房月供",
    },
    description: {
      en: "Estimate your monthly mortgage payment for a New York home: adjust price, down payment, interest rate, and loan term to see principal and interest instantly.",
      zh: "免费在线房贷计算器：输入房屋总价、首付、利率与贷款年限，即时估算在纽约买房的每月本金加利息月供，帮您提前做好置业预算。",
    },
  });
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getRouteLocale(params);
  const { t } = await getT(locale);
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
