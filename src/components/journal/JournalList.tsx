"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

export interface JournalCardData {
  slug: string;
  cover: string;
  /** Stable filter key (category.en). */
  catKey: string;
  /** Localized category label shown on the card + tab. */
  catLabel: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readMinutes: number;
}

const ALL = "__all__";

export function JournalList({
  posts,
  categories,
  allLabel,
  minRead,
}: {
  posts: JournalCardData[];
  categories: { key: string; label: string }[];
  allLabel: string;
  minRead: string;
}) {
  const [active, setActive] = useState<string>(ALL);
  const shown = active === ALL ? posts : posts.filter((p) => p.catKey === active);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2 border-y border-line py-4">
        <Tab on={active === ALL} onClick={() => setActive(ALL)}>
          {allLabel}
        </Tab>
        {categories.map((c) => (
          <Tab key={c.key} on={active === c.key} onClick={() => setActive(c.key)}>
            {c.label}
          </Tab>
        ))}
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((post, i) => (
          <Reveal key={post.slug} delay={(i % 3) * 60}>
            <Link
              href={`/journal/${post.slug}`}
              className="group block focus-visible:outline-none"
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-line/50">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="eyebrow mt-4">{post.catLabel}</p>
              <h2 className="mt-2 font-serif text-xl text-ink transition-colors group-hover:text-bronze">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>
              <p className="mt-3 text-xs text-muted">
                {post.author} · {post.date} · {post.readMinutes} {minRead}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}

function Tab({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm transition-colors",
        on
          ? "border-ink bg-ink text-paper"
          : "border-line text-muted hover:border-bronze hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
