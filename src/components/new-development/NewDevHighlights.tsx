"use client";

import { useState } from "react";

export interface HighlightItem {
  title: string;
  body: string;
}

export function NewDevHighlights({
  items,
  hint,
}: {
  items: HighlightItem[];
  hint: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, idx) => (
        <FlipCard key={it.title} index={idx} title={it.title} body={it.body} hint={hint} />
      ))}
    </div>
  );
}

function FlipCard({
  index,
  title,
  body,
  hint,
}: {
  index: number;
  title: string;
  body: string;
  hint: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      className="group h-60 text-left [perspective:1400px] focus:outline-none"
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* front */}
        <div className="absolute inset-0 flex flex-col justify-between border border-line bg-surface p-6 [backface-visibility:hidden]">
          <p className="font-serif text-5xl leading-none text-bronze/25">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div>
            <h3 className="font-serif text-xl font-normal leading-snug text-ink">
              {title}
            </h3>
            <p className="mt-3 text-[0.7rem] uppercase tracking-[0.14em] text-muted">
              {hint} ↻
            </p>
          </div>
        </div>
        {/* back */}
        <div className="absolute inset-0 overflow-auto border border-bronze/40 bg-ink p-6 text-paper [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h3 className="font-serif text-lg font-normal leading-snug text-bronze">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-paper/85">{body}</p>
        </div>
      </div>
    </button>
  );
}
