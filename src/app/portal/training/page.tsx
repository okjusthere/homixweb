import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Watermark } from "@/components/portal/Watermark";
import { cloudflareStreamIframeUrl } from "@/lib/embeds";
import { getT } from "@/lib/i18n";
import { requirePortal } from "@/lib/portal-auth";
import { getTrainingVideos, groupByCategory, type TrainingVideo } from "@/lib/portal-content";
import { PortalShell } from "../PortalShell";

export const metadata: Metadata = {
  title: "Training",
  robots: { index: false, follow: false },
};

function VideoTile({
  video,
  watermark,
  pendingLabel,
}: {
  video: Pick<TrainingVideo, "cloudflareUid" | "title">;
  watermark: string;
  pendingLabel: string;
}) {
  const src = cloudflareStreamIframeUrl(video.cloudflareUid ?? "");
  return (
    <div className="relative aspect-video overflow-hidden rounded-sm bg-ink">
      {src ? (
        <iframe
          src={src}
          title={video.title || "Homix training"}
          loading="lazy"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-sm border border-paper/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-paper/70">
            {pendingLabel}
          </span>
        </div>
      )}
      <Watermark label={watermark} />
    </div>
  );
}

export default async function PortalTraining() {
  const { t } = await getT();
  const p = t.portal;
  const { preview, identity } = await requirePortal();
  const videos = await getTrainingVideos();
  const groups = groupByCategory(videos);
  const watermark = `${identity} · Homix`;

  const shellLabels = {
    workspace: p.workspace,
    signOut: p.signOut,
    previewBanner: p.previewBanner,
    training: p.trainingCard,
    resources: p.resourcesCard,
  };

  return (
    <PortalShell active="training" preview={preview} identity={identity} labels={shellLabels}>
      <Container className="py-14 sm:py-20">
        <Eyebrow>{p.trainingEyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          {p.trainingTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{p.trainingLead}</p>

        {videos.length === 0 ? (
          <>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <article key={i}>
                  <VideoTile
                    video={{ cloudflareUid: null, title: "" }}
                    watermark={watermark}
                    pendingLabel={p.videoPending}
                  />
                  <div className="mt-4 h-4 w-2/3 rounded-sm bg-line" />
                  <div className="mt-2 h-3 w-full rounded-sm bg-line/70" />
                </article>
              ))}
            </div>
            <p className="mt-10 text-sm text-muted">{p.trainingEmpty}</p>
          </>
        ) : (
          <div className="mt-12 space-y-14">
            {groups.map(([category, items]) => (
              <section key={category}>
                <h2 className="font-serif text-2xl text-ink">{category}</h2>
                <div className="mt-6 grid gap-8 lg:grid-cols-2">
                  {items.map((v) => (
                    <article key={v.id}>
                      <VideoTile video={v} watermark={watermark} pendingLabel={p.videoPending} />
                      <div className="mt-4 flex items-baseline justify-between gap-4">
                        <h3 className="font-serif text-xl text-ink">{v.title}</h3>
                        {v.duration && (
                          <span className="shrink-0 text-xs text-muted">{v.duration}</span>
                        )}
                      </div>
                      {v.summary && (
                        <p className="mt-2 text-sm leading-relaxed text-muted">{v.summary}</p>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <p className="mt-14 border-t border-line pt-6 text-xs uppercase tracking-[0.14em] text-muted">
          {p.confidential}
        </p>
      </Container>
    </PortalShell>
  );
}
