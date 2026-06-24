"use client";

import { useState } from "react";

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5 shrink-0">
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="var(--color-bronze)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Step = {
  title: string;
  body: string;
  items: string[];
};

function AccordionItem({
  step,
  index,
  accentColor,
}: {
  step: Step;
  index: number;
  accentColor: "bronze" | "pine";
}) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");
  const headingTitle = step.title.replace(/^第.+步\s*[—–-]\s*|^\d+\s*[—–-]\s*/, "");

  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 py-6 text-left"
        aria-expanded={open}
        aria-controls={`guide-panel-${index}`}
      >
        <span
          className={`font-serif text-2xl tabular-nums ${accentColor === "bronze" ? "text-bronze" : "text-pine"}`}
        >
          {num}
        </span>
        <span className="flex-1 font-serif text-xl leading-snug text-ink">{headingTitle}</span>
        <span className="text-muted">
          <ChevronIcon open={open} />
        </span>
      </button>

      {open && (
        <div id={`guide-panel-${index}`} className="pb-7 pl-12">
          <p className="text-base leading-relaxed text-muted">{step.body}</p>
          <ul className="mt-5 space-y-3">
            {step.items.map((it) => (
              <li key={it} className="flex gap-3 text-base leading-relaxed text-muted">
                <Check />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function GuideAccordion({
  steps,
  accentColor = "bronze",
}: {
  steps: Step[];
  accentColor?: "bronze" | "pine";
}) {
  return (
    <div className="mt-6 divide-y divide-line border-t border-line">
      {steps.map((step, i) => (
        <AccordionItem key={step.title} step={step} index={i} accentColor={accentColor} />
      ))}
    </div>
  );
}
