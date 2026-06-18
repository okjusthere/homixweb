"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  addAgentAction,
  deleteAgentAction,
  logoutAction,
  toggleVisibleAction,
  type ActionState,
} from "./actions";

export interface AdminAgent {
  id: string;
  name: string;
  slug: string;
  visible: boolean;
  editUrl: string;
}

const input =
  "rounded-sm border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-bronze focus:outline-none";

export function Dashboard({ agents }: { agents: AdminAgent[] }) {
  const [state, addAction, pending] = useActionState<ActionState | null, FormData>(
    addAgentAction,
    null,
  );

  return (
    <div className="space-y-12">
      {/* Add advisor */}
      <section className="rounded-sm border border-line bg-surface p-6 sm:p-8">
        <h2 className="font-serif text-xl text-ink">Add an advisor / 新增经纪人</h2>
        <p className="mt-1 text-sm text-muted">
          Enter a name. We&rsquo;ll create the profile and a private edit link to send them.
        </p>
        <form action={addAction} className="mt-4 flex flex-wrap items-center gap-3">
          <input name="name" placeholder="Full name / 姓名" required className={`${input} min-w-56 flex-1`} />
          <Button type="submit" disabled={pending}>
            {pending ? "Adding…" : "Add / 新增"}
          </Button>
        </form>
        {state?.error && <p className="mt-3 text-sm text-bronze-dark">{state.error}</p>}
        {state?.ok && state.editUrl && (
          <div className="mt-4 rounded-sm border border-line bg-paper p-4">
            <p className="text-sm text-ink">
              Added <strong>{state.name}</strong>. Send them this private edit link:
            </p>
            <CopyLink url={state.editUrl} />
          </div>
        )}
      </section>

      {/* Roster */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-ink">
            Advisors / 经纪人 ({agents.length})
          </h2>
          <form action={logoutAction}>
            <button className="text-sm text-muted underline-offset-4 hover:text-bronze hover:underline">
              Sign out / 退出
            </button>
          </form>
        </div>

        <div className="mt-5 divide-y divide-line border-y border-line">
          {agents.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center gap-3 py-4">
              <div className="min-w-48 flex-1">
                <p className="text-sm font-medium text-ink">
                  {a.name}
                  {!a.visible && (
                    <span className="ml-2 rounded-sm bg-line px-2 py-0.5 text-[11px] text-muted">
                      hidden
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted">/{a.slug}</p>
              </div>
              <CopyLink url={a.editUrl} compact />
              <form action={toggleVisibleAction}>
                <input type="hidden" name="id" value={a.id} />
                <input type="hidden" name="visible" value={String(a.visible)} />
                <button className="rounded-sm border border-line px-3 py-1.5 text-xs text-ink hover:border-bronze hover:text-bronze">
                  {a.visible ? "Hide" : "Show"}
                </button>
              </form>
              <DeleteButton id={a.id} name={a.name} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CopyLink({ url, compact }: { url: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className={
        compact
          ? "rounded-sm border border-line px-3 py-1.5 text-xs text-ink hover:border-bronze hover:text-bronze"
          : "mt-2 inline-flex items-center gap-2 rounded-sm bg-ink px-4 py-2 text-sm text-paper hover:bg-bronze"
      }
    >
      {copied ? "Copied ✓" : compact ? "Copy link" : "Copy edit link"}
    </button>
  );
}

function DeleteButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteAgentAction}
      onSubmit={(e) => {
        if (!confirm(`Delete ${name}? This can't be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="rounded-sm border border-line px-3 py-1.5 text-xs text-muted hover:border-bronze-dark hover:text-bronze-dark">
        Delete
      </button>
    </form>
  );
}
