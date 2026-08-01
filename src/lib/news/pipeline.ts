import "server-only";

import { createHash } from "node:crypto";
import { getSupabase } from "@/lib/supabase";
import { generateNewsImageForArticle } from "@/lib/news/image";
import { writeAndVerifyNews, type NewsDraft } from "@/lib/news/editor";
import {
  candidatesCorroborate,
  fetchFeedCandidates,
  type FeedCandidate,
  type NewsSource,
} from "@/lib/news/rss";
import {
  NEWS_CATEGORIES,
  type NewsCategory,
} from "@/lib/news/types";

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

type RegenerationCandidateRow = {
  id: number | string;
  source_id: number | string | null;
  title: string;
  summary: string;
  source_name: string;
  source_url: string;
  publisher_url: string | null;
  published_at: string | null;
  category: string | null;
  region: string | null;
  content_hash: string;
  raw_payload: Record<string, unknown> | null;
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

export type NewsRegenerationResult =
  | {
      status: "regenerated";
      slug: string;
      bodyEnLength: number;
      bodyZhLength: number;
    }
  | { status: "not_found"; slug: string }
  | { status: "rejected"; slug: string; reason: string };

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

function isNewsCategory(value: string | null): value is NewsCategory {
  return (NEWS_CATEGORIES as readonly string[]).includes(value ?? "");
}

function regenerationCandidate(
  row: RegenerationCandidateRow,
  source: SourceRow,
): FeedCandidate {
  if (!isNewsCategory(row.category)) {
    throw new Error("News candidate has an invalid category");
  }
  return {
    sourceId: Number(row.source_id),
    sourceKey: source.source_key,
    trustTier: source.trust_tier,
    requiresCorroboration: source.requires_corroboration,
    title: row.title,
    summary: row.summary,
    sourceName: row.source_name,
    sourceUrl: row.source_url,
    publisherUrl: row.publisher_url,
    publishedAt: row.published_at,
    category: row.category,
    region: row.region ?? "New York Metro",
    contentHash: row.content_hash,
    score: 0,
    rawPayload: row.raw_payload ?? {},
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

export async function regenerateNewsArticle(
  slug: string,
): Promise<NewsRegenerationResult> {
  const client = getSupabase();
  if (!client) throw new Error("Supabase is not configured");

  const { data: article, error: articleError } = await client
    .from("news_articles")
    .select("id,slug,candidate_id")
    .eq("slug", slug)
    .maybeSingle();
  if (articleError) throw articleError;
  if (!article?.candidate_id) return { status: "not_found", slug };

  const { data: candidateData, error: candidateError } = await client
    .from("news_candidates")
    .select(
      "id,source_id,title,summary,source_name,source_url,publisher_url,published_at,category,region,content_hash,raw_payload",
    )
    .eq("id", article.candidate_id)
    .maybeSingle();
  if (candidateError) throw candidateError;
  const candidateRow = candidateData as RegenerationCandidateRow | null;
  if (!candidateRow?.source_id) return { status: "not_found", slug };

  const { data: sourceData, error: sourceError } = await client
    .from("news_sources")
    .select(
      "id,source_key,name,source_type,trust_tier,feed_url,publisher_domain,categories,regions,requires_corroboration",
    )
    .eq("id", candidateRow.source_id)
    .maybeSingle();
  if (sourceError) throw sourceError;
  const source = sourceData as SourceRow | null;
  if (!source) return { status: "not_found", slug };

  const result = await writeAndVerifyNews(
    regenerationCandidate(candidateRow, source),
  );
  if (!result.draft) {
    return { status: "rejected", slug, reason: result.reason };
  }

  const draft = result.draft;
  const { error: updateError } = await client
    .from("news_articles")
    .update({
      category: draft.category,
      region: draft.region,
      title_en: draft.title_en,
      title_zh: draft.title_zh,
      summary_en: draft.summary_en,
      summary_zh: draft.summary_zh,
      body_en: draft.body_en,
      body_zh: draft.body_zh,
      homix_take_en: draft.homix_take_en,
      homix_take_zh: draft.homix_take_zh,
      updated_at: new Date().toISOString(),
    })
    .eq("id", article.id);
  if (updateError) throw updateError;

  const { error: candidateStatusError } = await client
    .from("news_candidates")
    .update({ status: "published", rejection_reason: null })
    .eq("id", candidateRow.id);
  if (candidateStatusError) throw candidateStatusError;

  return {
    status: "regenerated",
    slug,
    bodyEnLength: draft.body_en.length,
    bodyZhLength: draft.body_zh.length,
  };
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
    const editorialRejections: string[] = [];

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
          editorialRejections.push(
            `${candidate.title}: ${result.reason}`.slice(0, 700),
          );
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
        let imageMessage = "";
        try {
          const imageResult = await generateNewsImageForArticle(article.slug);
          imageMessage =
            imageResult.status === "generated"
              ? "AI image generated"
              : "AI image article not found";
        } catch (imageError) {
          const message =
            imageError instanceof Error
              ? imageError.message
              : "unknown image error";
          imageMessage = `AI image fallback: ${message.slice(0, 500)}`;
          console.error("News image generation failed", {
            slug: article.slug,
            message,
          });
        }
        await finishRun({
          runDate,
          status: "published",
          fetched,
          qualified,
          articleId: article.id,
          message: `Published ${article.slug}. ${imageMessage}`,
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
        editorialRejections.length
          ? `Editorial rejections: ${editorialRejections.join(" | ")}`
          : "",
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
