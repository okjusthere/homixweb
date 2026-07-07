import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getLocale, getT } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "zh" ? "页面未找到" : "Page not found",
  };
}

export default async function NotFound() {
  const { t } = await getT();
  return (
    <Container className="flex min-h-[62vh] flex-col justify-center py-24">
      <Eyebrow>{t.notFound.eyebrow}</Eyebrow>
      <h1 className="mt-5 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
        {t.notFound.title}
      </h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
        {t.notFound.lead}
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button href="/">{t.notFound.backHome}</Button>
        <Button href="/listings" variant="outline">
          {t.notFound.browseListings}
        </Button>
      </div>
    </Container>
  );
}
