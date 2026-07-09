import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata = { title: "Page not found | 页面未找到" };

export default function NotFound() {
  return (
    <Container className="flex min-h-[62vh] flex-col justify-center py-24">
      <Eyebrow>Not found | 页面未找到</Eyebrow>
      <h1 className="mt-5 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
        This page is unavailable. | 此页面无法访问。
      </h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
        The link may be outdated, or the page may have moved. | 链接可能已失效，或页面已移动。
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button href="/">Home | 返回首页</Button>
        <Button href="/listings" variant="outline">
          Listings | 浏览房源
        </Button>
      </div>
    </Container>
  );
}
