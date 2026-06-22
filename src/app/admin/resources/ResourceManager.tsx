"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import {
  addResourceAction,
  deleteResourceAction,
  toggleResourceVisibleAction,
  type ActionState,
} from "../actions";

export interface AdminResource {
  id: string;
  title: string;
  category: string;
  url: string;
  visible: boolean;
}

const input =
  "rounded-sm border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-bronze focus:outline-none";

export function ResourceManager({ resources }: { resources: AdminResource[] }) {
  const [state, addAction, pending] = useActionState<ActionState | null, FormData>(
    addResourceAction,
    null,
  );
  return (
    <div className="space-y-10">
      <section className="rounded-sm border border-line bg-surface p-6 sm:p-8">
        <h2 className="font-serif text-xl text-ink">Add a resource</h2>
        <p className="mt-1 text-sm text-muted">
          Paste a link to a document, template, or folder (Google Drive, Notion,
          Dropbox, or a file URL). File uploads land here once storage is wired.
        </p>
        <form action={addAction} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input name="title" placeholder="Title" required className={`${input} sm:col-span-2`} />
          <input name="url" placeholder="Link (https://…)" required className={`${input} sm:col-span-2`} />
          <input name="category" placeholder="Category (e.g. Scripts)" className={input} />
          <input name="description" placeholder="Short description (optional)" className={input} />
          <div className="sm:col-span-2">
            <Button type="submit" disabled={pending}>
              {pending ? "Adding…" : "Add resource"}
            </Button>
          </div>
        </form>
        {state?.error && <p className="mt-3 text-sm text-bronze-dark">{state.error}</p>}
        {state?.ok && state.message && <p className="mt-3 text-sm text-pine">{state.message}</p>}
      </section>

      <section>
        <h2 className="font-serif text-xl text-ink">Resources ({resources.length})</h2>
        <div className="mt-5 divide-y divide-line border-y border-line">
          {resources.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center gap-3 py-4">
              <div className="min-w-48 flex-1">
                <p className="text-sm font-medium text-ink">
                  {r.title}
                  {!r.visible && (
                    <span className="ml-2 rounded-sm bg-line px-2 py-0.5 text-[11px] text-muted">
                      hidden
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-muted">
                  {r.category} · {r.url}
                </p>
              </div>
              <form action={toggleResourceVisibleAction}>
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="visible" value={String(r.visible)} />
                <button className="rounded-sm border border-line px-3 py-1.5 text-xs text-ink hover:border-bronze hover:text-bronze">
                  {r.visible ? "Hide" : "Show"}
                </button>
              </form>
              <form action={deleteResourceAction}>
                <input type="hidden" name="id" value={r.id} />
                <button
                  onClick={(e) => {
                    if (!confirm(`Delete "${r.title}"?`)) e.preventDefault();
                  }}
                  className="rounded-sm border border-line px-3 py-1.5 text-xs text-bronze-dark hover:border-bronze-dark"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
          {resources.length === 0 && (
            <p className="py-6 text-sm text-muted">No resources yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
