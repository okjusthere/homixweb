"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import {
  addTrainingVideoAction,
  deleteTrainingVideoAction,
  toggleTrainingVisibleAction,
  type ActionState,
} from "../actions";

export interface AdminVideo {
  id: string;
  title: string;
  category: string;
  cloudflareUid: string;
  duration: string;
  visible: boolean;
}

const input =
  "rounded-sm border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-bronze focus:outline-none";

export function TrainingManager({ videos }: { videos: AdminVideo[] }) {
  const [state, addAction, pending] = useActionState<ActionState | null, FormData>(
    addTrainingVideoAction,
    null,
  );
  return (
    <div className="space-y-10">
      <section className="rounded-sm border border-line bg-surface p-6 sm:p-8">
        <h2 className="font-serif text-xl text-ink">Add a video</h2>
        <p className="mt-1 text-sm text-muted">
          Upload the video to Cloudflare Stream, then paste its UID here. Leave the
          UID blank to stage a lesson before its video is ready.
        </p>
        <form action={addAction} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input name="title" placeholder="Title" required className={`${input} sm:col-span-2`} />
          <input name="cloudflare_uid" placeholder="Cloudflare Stream UID" className={input} />
          <input name="category" placeholder="Category (e.g. Foundations)" className={input} />
          <input name="duration" placeholder="Duration (e.g. 8 min)" className={input} />
          <input name="summary" placeholder="Short summary (optional)" className={input} />
          <div className="sm:col-span-2">
            <Button type="submit" disabled={pending}>
              {pending ? "Adding…" : "Add video"}
            </Button>
          </div>
        </form>
        {state?.error && <p className="mt-3 text-sm text-bronze-dark">{state.error}</p>}
        {state?.ok && state.message && <p className="mt-3 text-sm text-pine">{state.message}</p>}
      </section>

      <section>
        <h2 className="font-serif text-xl text-ink">Videos ({videos.length})</h2>
        <div className="mt-5 divide-y divide-line border-y border-line">
          {videos.map((v) => (
            <div key={v.id} className="flex flex-wrap items-center gap-3 py-4">
              <div className="min-w-48 flex-1">
                <p className="text-sm font-medium text-ink">
                  {v.title}
                  {!v.visible && (
                    <span className="ml-2 rounded-sm bg-line px-2 py-0.5 text-[11px] text-muted">
                      hidden
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted">
                  {v.category}
                  {v.cloudflareUid ? ` · ${v.cloudflareUid}` : " · no video yet"}
                  {v.duration ? ` · ${v.duration}` : ""}
                </p>
              </div>
              <form action={toggleTrainingVisibleAction}>
                <input type="hidden" name="id" value={v.id} />
                <input type="hidden" name="visible" value={String(v.visible)} />
                <button className="rounded-sm border border-line px-3 py-1.5 text-xs text-ink hover:border-bronze hover:text-bronze">
                  {v.visible ? "Hide" : "Show"}
                </button>
              </form>
              <form action={deleteTrainingVideoAction}>
                <input type="hidden" name="id" value={v.id} />
                <button
                  onClick={(e) => {
                    if (!confirm(`Delete "${v.title}"?`)) e.preventDefault();
                  }}
                  className="rounded-sm border border-line px-3 py-1.5 text-xs text-bronze-dark hover:border-bronze-dark"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
          {videos.length === 0 && (
            <p className="py-6 text-sm text-muted">No videos yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
