import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** On-brand stand-in for pages not yet built out. */
export function PagePlaceholder({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Container className="flex min-h-[62vh] flex-col justify-center py-24">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-5 max-w-2xl font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      <div className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        {children ?? "This page is on the way."}
      </div>
      <div className="mt-8">
        <Button href="/" variant="ghost">
          ← Back home
        </Button>
      </div>
    </Container>
  );
}
