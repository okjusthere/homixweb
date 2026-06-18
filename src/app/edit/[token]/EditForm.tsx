"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Agent } from "@/lib/listings";
import { updateAgentProfile, type SaveState } from "./actions";

const input =
  "w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-bronze focus:outline-none";
const label = "mb-2 block text-sm text-muted";

export function EditForm({
  agent,
  token,
}: {
  agent: Agent;
  token: string;
}) {
  const [state, formAction, pending] = useActionState<SaveState | null, FormData>(
    updateAgentProfile,
    null,
  );
  const [preview, setPreview] = useState<string | null>(null);
  const social = agent.social ?? {};

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="token" value={token} />

      {/* Photo */}
      <div>
        <span className={label}>Headshot / 头像</span>
        <div className="flex items-center gap-5">
          <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-line/50">
            <Image
              src={preview || agent.photo}
              alt={agent.name}
              fill
              sizes="80px"
              className="object-cover"
              unoptimized={Boolean(preview)}
            />
          </div>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              setPreview(f ? URL.createObjectURL(f) : null);
            }}
            className="text-sm text-muted file:mr-3 file:rounded-sm file:border file:border-line file:bg-surface file:px-3 file:py-2 file:text-sm file:text-ink"
          />
        </div>
        <p className="mt-2 text-xs text-muted">JPG or PNG, up to 8MB. A clean studio headshot works best.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">Name / 姓名</label>
          <input id="name" name="name" defaultValue={agent.name} className={input} required />
        </div>
        <div>
          <label className={label} htmlFor="title">Title / 职位</label>
          <input id="title" name="title" defaultValue={agent.title} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="phone">Phone / 电话</label>
          <input id="phone" name="phone" defaultValue={agent.phone} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="email">Email / 邮箱</label>
          <input id="email" name="email" type="email" defaultValue={agent.email} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="license">License # / 牌照号</label>
          <input id="license" name="license" defaultValue={agent.licenseNumber ?? ""} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="specialties">Specialties / 专长</label>
          <input
            id="specialties"
            name="specialties"
            defaultValue={agent.specialties.join(", ")}
            placeholder="Queens, Luxury, Investment"
            className={input}
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="bio">Bio / 个人简介</label>
        <textarea id="bio" name="bio" rows={7} defaultValue={agent.bio} className={input} />
      </div>

      <div>
        <span className={label}>Social (optional) / 社交账号（选填）</span>
        <div className="grid gap-3 sm:grid-cols-3">
          <input name="social_instagram" defaultValue={social.instagram ?? ""} placeholder="Instagram URL" className={input} />
          <input name="social_xiaohongshu" defaultValue={social.xiaohongshu ?? ""} placeholder="小红书 URL" className={input} />
          <input name="social_douyin" defaultValue={social.douyin ?? ""} placeholder="抖音 URL" className={input} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-line pt-6">
        <Button type="submit" disabled={pending} className="bg-bronze hover:bg-bronze-dark">
          {pending ? "Saving… / 保存中…" : "Save changes / 保存"}
        </Button>
        {state?.ok && (
          <p className="text-sm text-pine">Saved — your profile is updated. / 已保存,主页已更新。</p>
        )}
        {state?.error && <p className="text-sm text-bronze-dark">{state.error}</p>}
      </div>
    </form>
  );
}
