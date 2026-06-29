import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Markdown } from "@/components/journal/Markdown";
import { getJournalPost, journalPosts } from "@/content/journal/posts";
import { getAgentBySlug } from "@/lib/agents";
import { getLocale, getT } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return { title: "Article not found" };
  const locale = await getLocale();
  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    openGraph: { images: [post.cover], type: "article" },
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const { locale, t } = await getT();
  const author = await getAgentBySlug(post.authorSlug);
  const df = new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.en,
    description: post.excerpt.en,
    image: post.cover,
    datePublished: post.date,
    author: author
      ? { "@type": "Person", name: author.name, jobTitle: author.title }
      : { "@type": "Organization", name: siteConfig.legalName },
    publisher: { "@type": "Organization", name: siteConfig.legalName },
  };

  return (
    <Container className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/journal"
          className="text-sm text-muted underline-offset-4 transition-colors hover:text-bronze hover:underline"
        >
          ← {t.journal.backToJournal}
        </Link>

        <div className="mt-6">
          <Eyebrow>{post.category[locale]}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {post.title[locale]}
          </h1>
          <p className="mt-5 text-sm text-muted">
            {t.journal.by}{" "}
            {author ? (
              <Link
                href={`/agents/${author.slug}`}
                className="text-ink underline-offset-4 hover:text-bronze hover:underline"
              >
                {author.name}
              </Link>
            ) : (
              "Homix"
            )}{" "}
            · {df.format(new Date(post.date))} · {post.readMinutes}{" "}
            {t.journal.minRead}
          </p>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-sm bg-line/50">
          <Image
            src={post.cover}
            alt={post.title[locale]}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
        {post.coverCredit && (
          <p className="mt-2 text-right text-[11px] leading-relaxed text-muted/70">
            {post.coverCredit}
          </p>
        )}

        <div className="mt-10">
          <Markdown>{post.body[locale]}</Markdown>
        </div>

        <div className="mt-14 rounded-sm border border-line bg-surface p-8 text-center">
          <p className="font-serif text-2xl text-ink">{t.contactBand.title}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            <Button href="/contact">{t.about.workWithUs}</Button>
            <Button href="/listings" variant="outline">
              {t.featured.viewAll}
            </Button>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Container>
  );
}
