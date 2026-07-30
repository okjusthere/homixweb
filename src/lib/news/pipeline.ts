import "server-only";

import { createHash } from "node:crypto";
import { getSupabase } from "@/lib/supabase";
import { writeAndVerifyNews, type NewsDraft } from "@/lib/news/editor";
import {
  candidatesCorroborate,
  fetchFeedCandidates,
  type FeedCandidate,
  type NewsSource,
} from "@/lib/news/rss";

type SourceRow = {
  id: number | string;
  source_key: string;
  name: string;
  source_type: "publisher_rss" | "google_news";
  trust_tier: "A" | "B" | "C";
  feed_url: string;
  publisher_domain: string | null;
  categories: string[] | null;
  regions: string[] | null;
  requires_corroboration: boolean;
};

type CandidateRow = {
  id: number | string;
  content_hash: string;
  status: "new" | "selected" | "rejected" | "published";
  rejection_reason: string | null;
};

export type NewsPipelineResult = {
  status: "published" | "skipped_no_candidate" | "already_complete";
  runDate: string;
  fetched: number;
  qualified: number;
  slug?: string;
  reason?: string;
  failedSources?: string[];
  sourceCounts?: Record<string, number>;
};

function newYorkDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function mapSource(row: SourceRow): NewsSource {
  return {
    id: Number(row.id),
    sourceKey: row.source_key,
    name: row.name,
    sourceType: row.source_type,
    trustTier: row.trust_tier,
    feedUrl: row.feed_url,
    publisherDomain: row.publisher_domain,
    categories: row.categories ?? [],
    regions: row.regions ?? [],
    requiresCorroboration: row.requires_corroboration,
  };
}

function deduplicateCandidates(candidates: FeedCandidate[]): FeedCandidate[] {
  const byHash = new Map<string, FeedCandidate>();
  for (const candidate of candidates) {
    const existing = byHash.get(candidate.contentHash);
    if (!existing || candidate.score > existing.score) {
      byHash.set(candidate.contentHash, candidate);
    }
  }
  return [...byHash.values()].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");
  });
}

function slugify(title: string, publishedAt: string | null): string {
  const root = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 68)
    .replace(/-+$/g, "");
  const date = (publishedAt ?? new Date().toISOString()).slice(0, 10).replace(/-/g, "");
  const suffix = createHash("sha1").update(title).digest("hex").slice(0, 7);
  return `${root || "new-york-real-estate-news"}-${date}-${suffix}`;
}

async function finishRun(input: {
  runDate: string;
  status: "published" | "skipped_no_candidate" | "failed";
  fetched: number;
  qualified: number;
  articleId?: number | null;
  message?: string;
}) {
  const client = getSupabase();
  if (!client) return;
  await client
    .from("news_ingestion_runs")
    .update({
      status: input.status,
      finished_at: new Date().toISOString(),
      fetched_count: input.fetched,
      qualified_count: input.qualified,
      article_id: input.articleId ?? null,
      message: input.message?.slice(0, 2_000) ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("run_date", input.runDate);
}

async function persistCandidates(candidates: FeedCandidate[]) {
  const client = getSupabase();
  if (!client || candidates.length === 0) return new Map<string, CandidateRow>();

  const records = candidates.slice(0, 100).map((candidate) => ({
    source_id: candidate.sourceId,
    title: candidate.title,
    summary: candidate.summary,
    source_name: candidate.sourceName,
    source_url: candidate.sourceUrl,
    publisher_url: candidate.publisherUrl,
    published_at: candidate.publishedAt,
    category: candidate.category,
    region: candidate.region,
    content_hash: candidate.contentHash,
    status: candidatesCorroborate(candidate, candidates) ? "new" : "rejected",
    rejection_reason: candidatesCorroborate(candidate, candidates)
      ? null
      : "Discovery-only source was not independently corroborated",
    raw_payload: candidate.rawPayload,
  }));
  const { error: insertError } = await client
    .from("news_candidates")
    .upsert(records, { onConflict: "content_hash", ignoreDuplicates: true });
  if (insertError) throw insertError;

  const hashes = records.map((record) => record.content_hash);
  const { data: initialData, error: initialError } = await client
    .from("news_candidates")
    .select("id,content_hash,status,rejection_reason")
    .in("content_hash", hashes);
  if (initialError) throw initialError;
  const initialRows = new Map(
    ((initialData ?? []) as CandidateRow[]).map((row) => [
      row.content_hash,
      row,
    ]),
  );
  await Promise.all(
    candidates.map(async (candidate) => {
      const row = initialRows.get(candidate.contentHash);
      if (
        candidate.requiresCorroboration ||
        row?.status !== "rejected" ||
        row.rejection_reason !==
          "Discovery-only source was not independently corroborated"
      ) {
        return;
      }
      await client
        .from("news_candidates")
        .update({
          source_id: candidate.sourceId,
          source_name: candidate.sourceName,
          source_url: candidate.sourceUrl,
          publisher_url: candidate.publisherUrl,
          status: "new",
          rejection_reason: null,
          raw_payload: candidate.rawPayload,
        })
        .eq("id", Number(row.id));
    }),
  );

  const { data, error } = await client
    .from("news_candidates")
    .select("id,content_hash,status,rejection_reason")
    .in("content_hash", hashes);
  if (error) throw error;
  return new Map(
    ((data ?? []) as CandidateRow[]).map((row) => [row.content_hash, row]),
  );
}

async function publishDraft(input: {
  candidate: FeedCandidate;
  candidateId: number;
  draft: NewsDraft;
}): Promise<{ id: number; slug: string }> {
  const client = getSupabase();
  if (!client) throw new Error("Supabase is not configured");
  const slug = slugify(input.draft.title_en, input.candidate.publishedAt);
  const record = {
    slug,
    candidate_id: input.candidateId,
    status: "published",
    category: input.draft.category,
    region: input.draft.region,
    title_en: input.draft.title_en,
    title_zh: input.draft.title_zh,
    summary_en: input.draft.summary_en,
    summary_zh: input.draft.summary_zh,
    body_en: input.draft.body_en,
    body_zh: input.draft.body_zh,
    homix_take_en: input.draft.homix_take_en,
    homix_take_zh: input.draft.homix_take_zh,
    source_name: input.candidate.sourceName,
    source_url: input.candidate.sourceUrl,
    source_published_at: input.candidate.publishedAt,
    published_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await client
    .from("news_articles")
    .insert(record)
    .select("id,slug")
    .single();
  if (!error && data) return { id: Number(data.id), slug: data.slug as string };

  const { data: existing, error: existingError } = await client
    .from("news_articles")
    .select("id,slug")
    .eq("candidate_id", input.candidateId)
    .maybeSingle();
  if (existingError || !existing) throw error ?? existingError ?? new Error("Unable to publish news");
  return { id: Number(existing.id), slug: existing.slug as string };
}

export async function runNewsPipeline(
  now = new Date(),
): Promise<NewsPipelineResult> {
  const client = getSupabase();
  if (!client) throw new Error("Supabase is not configured");
  const runDate = newYorkDate(now);
  let fetched = 0;
  let qualified = 0;

  const { data: claimed, error: claimError } = await client.rpc(
    "claim_news_ingestion_run",
    { p_run_date: runDate },
  );
  if (claimError) throw claimError;
  if (!claimed) {
    return {
      status: "already_complete",
      runDate,
      fetched: 0,
      qualified: 0,
      reason: "Today's run is complete or already in progress",
    };
  }

  try {
    const { data: sourceData, error: sourceError } = await client
      .from("news_sources")
      .select(
        "id,source_key,name,source_type,trust_tier,feed_url,publisher_domain,categories,regions,requires_corroboration",
      )
      .eq("enabled", true)
      .order("trust_tier");
    if (sourceError) throw sourceError;
    const sources = ((sourceData ?? []) as SourceRow[]).map(mapSource);
    if (sources.length === 0) throw new Error("No enabled news sources");

    const feedResults = await Promise.allSettled(
      sources.map((source) => fetchFeedCandidates(source, now)),
    );
    const failedSources = feedResults.flatMap((result, index) =>
      result.status === "rejected"
        ? [
            `${sources[index].sourceKey}: ${
              result.reason instanceof Error
                ? result.reason.message
                : "feed failed"
            }`,
          ]
        : [],
    );
    const sourceCounts = Object.fromEntries(
      feedResults.map((result, index) => [
        sources[index].sourceKey,
        result.status === "fulfilled" ? result.value.length : 0,
      ]),
    );
    const fulfilled = feedResults.filter(
      (result): result is PromiseFulfilledResult<FeedCandidate[]> =>
        result.status === "fulfilled",
    );
    if (fulfilled.length === 0) {
      throw new Error("Every configured news feed failed");
    }

    const candidates = deduplicateCandidates(
      fulfilled.flatMap((result) => result.value),
    );
    fetched = candidates.length;
    const rowsByHash = await persistCandidates(candidates);
    const publishable = candidates.filter((candidate) => {
      const row = rowsByHash.get(candidate.contentHash);
      return (
        candidatesCorroborate(candidate, candidates) &&
        (row?.status === "new" || row?.status === "selected")
      );
    });
    qualified = publishable.length;

    for (const candidate of publishable.slice(0, 3)) {
      const row = rowsByHash.get(candidate.contentHash);
      if (!row) continue;
      const candidateId = Number(row.id);
      await client
        .from("news_candidates")
        .update({ status: "selected", rejection_reason: null })
        .eq("id", candidateId);

      try {
        const result = await writeAndVerifyNews(candidate);
        if (!result.draft) {
          await client
            .from("news_candidates")
            .update({ status: "rejected", rejection_reason: result.reason })
            .eq("id", candidateId);
          continue;
        }
        const article = await publishDraft({
          candidate,
          candidateId,
          draft: result.draft,
        });
        await client
          .from("news_candidates")
          .update({ status: "published", rejection_reason: null })
          .eq("id", candidateId);
        await finishRun({
          runDate,
          status: "published",
          fetched,
          qualified,
          articleId: article.id,
          message: `Published ${article.slug}`,
        });
        return {
          status: "published",
          runDate,
          fetched,
          qualified,
          slug: article.slug,
        };
      } catch (error) {
        await client
          .from("news_candidates")
          .update({
            status: "new",
            rejection_reason: null,
          })
          .eq("id", candidateId);
        throw error;
      }
    }

    await finishRun({
      runDate,
      status: "skipped_no_candidate",
      fetched,
      qualified,
      message: [
        "No candidate passed all deterministic and editorial gates",
        failedSources.length ? `Feed failures: ${failedSources.join(" | ")}` : "",
      ]
        .filter(Boolean)
        .join(". "),
    });
    return {
      status: "skipped_no_candidate",
      runDate,
      fetched,
      qualified,
      reason: "No candidate passed all publication gates",
      failedSources,
      sourceCounts,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "News pipeline failed";
    await finishRun({
      runDate,
      status: "failed",
      fetched,
      qualified,
      message,
    });
    throw error;
  }
}
