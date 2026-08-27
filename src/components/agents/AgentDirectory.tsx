"use client";

import { useMemo, useState } from "react";
import { AgentCard } from "@/components/agents/AgentCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { Agent } from "@/lib/listings";

type AgentDirectoryLabels = {
  eyebrow: string;
  title: string;
  lead: string;
  searchLabel: string;
  placeholder: string;
  showing: string;
  noResults: string;
};

function searchable(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

export function AgentDirectory({
  agents,
  labels,
}: {
  agents: Agent[];
  labels: AgentDirectoryLabels;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = searchable(query.trim());
    if (!needle) return agents;
    return agents.filter((agent) =>
      searchable(
        [
          agent.name,
          agent.title,
          agent.phone,
          agent.email,
          agent.licenseNumber,
          ...(agent.languages || []),
          ...(agent.specialties || []),
        ]
          .filter(Boolean)
          .join(" "),
      ).includes(needle),
    );
  }, [agents, query]);

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,28rem)] lg:items-end lg:gap-16">
        <div className="max-w-2xl">
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
            {labels.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{labels.lead}</p>
        </div>

        <div className="lg:pb-1">
          <label htmlFor="advisor-search" className="sr-only">
            {labels.searchLabel}
          </label>
          <div className="relative">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            >
              <path
                fill="currentColor"
                d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l3.626 3.627a.75.75 0 1 1-1.06 1.06l-3.627-3.626A5.5 5.5 0 1 1 8.5 3Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
              />
            </svg>
            <input
              id="advisor-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={labels.placeholder}
              className="h-12 w-full rounded-sm border border-line bg-surface pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-bronze focus-visible:ring-2 focus-visible:ring-bronze/30"
            />
          </div>
          <p className="mt-2 text-right text-xs text-muted" aria-live="polite">
            {labels.showing} {filtered.length} / {agents.length}
          </p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 border-y border-line py-16 text-center text-muted">
          {labels.noResults}
        </p>
      ) : (
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {filtered.map((agent, index) => (
            <Reveal key={agent.id} delay={(index % 4) * 50}>
              <AgentCard agent={agent} />
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
