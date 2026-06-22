import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getT, messages } from "@/lib/i18n";

export async function generateStaticParams() {
  return messages.en.onboarding.resources.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = messages.en.onboarding.resources.items.find((r) => r.slug === slug);
  if (!item) return { title: "Resource not found" };
  return {
    title: `${item.title} — Onboarding Resources`,
    description: item.body,
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { t } = await getT();
  const o = t.onboarding;
  const item = o.resources.items.find((r) => r.slug === slug);
  if (!item) notFound();

  return (
    <>
      {/* Hero */}
      <Container className="py-16 sm:py-24">
        <Link
          href="/onboarding"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {o.resources.eyebrow}
        </Link>
        <div className="mt-8 max-w-3xl">
          <Eyebrow>{o.resources.title}</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl font-normal leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">
            {item.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{item.body}</p>
        </div>
      </Container>

      {/* Content placeholder — to be filled in */}
      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl rounded-sm border border-dashed border-line bg-paper px-8 py-16 text-center">
            <p className="font-serif text-2xl text-ink">{o.resources.detailComingTitle}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              {o.resources.detailComingBody}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-sm bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-bronze"
            >
              {t.common.contact}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
