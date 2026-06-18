import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <Container className="flex min-h-[62vh] flex-col justify-center py-24">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-5 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
        This page has moved on.
      </h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
        The page you&rsquo;re looking for isn&rsquo;t here. Let&rsquo;s get you
        back to the homes.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button href="/">Back home</Button>
        <Button href="/listings" variant="outline">
          Browse listings
        </Button>
      </div>
    </Container>
  );
}
