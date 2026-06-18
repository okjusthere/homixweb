import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h2: ({ children }) => (
    <h2 className="pt-4 font-serif text-2xl text-ink">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="pt-2 font-serif text-xl text-ink">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-lg leading-relaxed text-ink/85">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc space-y-2 pl-5 text-lg text-ink/85">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal space-y-2 pl-5 text-lg text-ink/85">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }) => <em className="text-muted">{children}</em>,
  a: ({ href, children }) => (
    <Link
      href={href ?? "#"}
      className="text-bronze underline-offset-4 hover:underline"
    >
      {children}
    </Link>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-bronze pl-5 italic text-muted">
      {children}
    </blockquote>
  ),
};

/** Renders article Markdown with brand-styled elements. */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="space-y-5">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
