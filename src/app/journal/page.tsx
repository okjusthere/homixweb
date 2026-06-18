import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { journalPosts } from "@/content/journal/posts";
import { getT } from "@/lib/i18n";
import { listings } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Market reports, neighborhood deep-dives, and guides from the Homix team — New York's media-first brokerage.",
};

export default async function JournalPage() {
  const { locale, t } = await getT();
  const agents = await listings.getAgents();
  const authorName = (slug: string) =>
    agents.find((a) => a.slug === slug)?.name ?? "Homix";
  const df = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <Eyebrow>{t.journal.eyebrow}</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          {t.journal.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{t.journal.lead}</p>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {[...journalPosts]
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((post, i) => (
          <Reveal key={post.slug} delay={(i % 3) * 60}>
            <Link
              href={`/journal/${post.slug}`}
              className="group block focus-visible:outline-none"
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-line/50">
                <Image
                  src={post.cover}
                  alt={post.title[locale]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="eyebrow mt-4">{post.category[locale]}</p>
              <h2 className="mt-2 font-serif text-xl text-ink transition-colors group-hover:text-bronze">
                {post.title[locale]}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                {post.excerpt[locale]}
              </p>
              <p className="mt-3 text-xs text-muted">
                {authorName(post.authorSlug)} · {df.format(new Date(post.date))} ·{" "}
                {post.readMinutes} {t.journal.minRead}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
