"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import type { Agent } from "@/lib/listings";
import { AvatarCropper } from "./AvatarCropper";
import { updateAgentProfile, type SaveState } from "./actions";

const PLACEHOLDER = "/agent-placeholder-logo.png";

const input =
  "w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-bronze focus:outline-none";
const label = "mb-2 block text-sm text-muted";
const BIO_MAX = 600;
const BIO_GOOD = 120;
const TITLE_MAX = 80;

function parseSpecialties(s: string): string[] {
  return s
    .split(/[,，]/)
    .map((x) => x.trim())
    .filter(Boolean);
}

export function EditForm({ agent, token }: { agent: Agent; token: string }) {
  const [state, formAction, pending] = useActionState<SaveState | null, FormData>(
    updateAgentProfile,
    null,
  );

  const social = agent.social ?? {};
  const [title, setTitle] = useState(agent.title);
  const [phone, setPhone] = useState(agent.phone);
  const [email, setEmail] = useState(agent.email);
  const [bio, setBio] = useState(agent.bio);
  const [specialtiesStr, setSpecialtiesStr] = useState(agent.specialties.join(", "));
  const [instagram, setInstagram] = useState(social.instagram ?? "");
  const [xiaohongshu, setXiaohongshu] = useState(social.xiaohongshu ?? "");
  const [douyin, setDouyin] = useState(social.douyin ?? "");
  const [linkedin, setLinkedin] = useState(social.linkedin ?? "");
  const [website, setWebsite] = useState(social.website ?? "");
  const [photoPicked, setPhotoPicked] = useState(
    Boolean(agent.photo) && agent.photo !== PLACEHOLDER,
  );

  const [dirty, setDirty] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const onFormChange = () => {
    setDirty(true);
    setShowToast(false);
  };

  // React to the action result: clear the dirty flag and surface the toast.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (state?.ok) {
      setDirty(false);
      setShowToast(true);
    }
  }, [state]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // A successful save with no fresh edits = show the "Saved" state.
  const saved = Boolean(state?.ok) && !dirty && !pending;

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  // Profile-strength score.
  const specialtiesList = parseSpecialties(specialtiesStr);
  const socialCount = [instagram, xiaohongshu, douyin, linkedin, website].filter(
    (s) => s.trim(),
  ).length;
  const score =
    (photoPicked ? 25 : 0) +
    (bio.trim().length >= BIO_GOOD ? 25 : 0) +
    (title.trim() ? 10 : 0) +
    (phone.trim() ? 10 : 0) +
    (email.trim() ? 10 : 0) +
    (specialtiesList.length ? 10 : 0) +
    (socialCount ? 10 : 0);

  const tier =
    score >= 80
      ? "Profile complete / 完整"
      : score >= 40
        ? "Looking good / 不错"
        : "Getting started / 起步";

  const nudge = !photoPicked
    ? "Add a headshot to stand out · 添加头像更出众"
    : bio.trim().length < BIO_GOOD
      ? "A short bio builds trust · 写几句简介更可信"
      : !specialtiesList.length
        ? "Add your specialties · 添加你的专长"
        : !socialCount
          ? "Link a social channel · 关联一个社交账号"
          : !phone.trim()
            ? "Add a phone number · 添加电话"
            : !email.trim()
              ? "Add an email · 添加邮箱"
              : null;

  const bioLen = bio.trim().length;
  const bioColor =
    bioLen === 0
      ? "text-muted"
      : bioLen < BIO_GOOD
        ? "text-muted"
        : bioLen > BIO_MAX - 60
        ? "text-bronze-dark"
          : "text-ink";

  return (
    <form action={formAction} onChange={onFormChange} className="space-y-10">
      <input type="hidden" name="token" value={token} />

      {/* Photo */}
      <section>
        <p className="eyebrow mb-4">Photo / 头像</p>
        <AvatarCropper
          name="photo"
          currentSrc={agent.photo}
          alt={agent.name}
          onPick={() => {
            setPhotoPicked(true);
            onFormChange();
          }}
        />
      </section>

      {/* Basics */}
      <section>
        <p className="eyebrow mb-4">Basics / 基本信息</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="name">Name / 姓名</label>
            <input id="name" name="name" defaultValue={agent.name} className={input} required />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm text-muted" htmlFor="title">Title / 职位</label>
              <span className={`text-xs ${title.length > TITLE_MAX ? "text-bronze-dark" : "text-muted"}`}>
                {title.length} / {TITLE_MAX}
              </span>
            </div>
            <input
              id="title"
              name="title"
              value={title}
              maxLength={TITLE_MAX}
              onChange={(e) => setTitle(e.target.value)}
              className={input}
            />
          </div>
          <div>
            <label className={label} htmlFor="phone">Phone / 电话</label>
            <input id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={input} />
          </div>
          <div>
            <label className={label} htmlFor="email">Email / 邮箱</label>
            <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="license">License # / 牌照号</label>
            <input id="license" name="license" defaultValue={agent.licenseNumber ?? ""} className={input} />
          </div>
        </div>
      </section>

      {/* About */}
      <section>
        <p className="eyebrow mb-4">About you / 个人简介</p>
        <div className="space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm text-muted" htmlFor="bio">Bio / 简介</label>
              <span className={`text-xs tabular-nums ${bioColor}`} aria-live="polite">
                {bioLen} / {BIO_MAX}
              </span>
            </div>
            <textarea
              id="bio"
              name="bio"
              rows={7}
              value={bio}
              maxLength={BIO_MAX}
              onChange={(e) => setBio(e.target.value)}
              aria-describedby="bio-hint"
              className={input}
            />
            <p id="bio-hint" className="mt-2 text-xs text-muted">
              {bioLen < BIO_GOOD
                ? "A line or two more helps clients trust you · 多写一两句更能赢得信任。"
                : "Looks great. · 写得很好。"}
            </p>
          </div>
          <div>
            <label className={label} htmlFor="specialties">Specialties / 专长</label>
            <input
              id="specialties"
              name="specialties"
              value={specialtiesStr}
              onChange={(e) => setSpecialtiesStr(e.target.value)}
              placeholder="Queens, Luxury, Investment / 用逗号分隔"
              className={input}
            />
            {specialtiesList.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {specialtiesList.map((s, i) => (
                  <span key={`${s}-${i}`} className="rounded-sm border border-line px-3 py-1 text-xs text-muted">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social */}
      <section>
        <p className="eyebrow mb-4">Where to find you / 社交账号</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="social_instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="Instagram URL" className={input} />
          <input name="social_xiaohongshu" value={xiaohongshu} onChange={(e) => setXiaohongshu(e.target.value)} placeholder="小红书 / RED URL" className={input} />
          <input name="social_douyin" value={douyin} onChange={(e) => setDouyin(e.target.value)} placeholder="抖音 / Douyin URL" className={input} />
          <input name="social_linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn URL" className={input} />
          <input name="social_website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website URL" className={`${input} sm:col-span-2`} />
        </div>
      </section>

      {/* Sticky action bar: strength meter + save */}
      <div className="sticky bottom-0 z-30 space-y-3 border-t border-line bg-surface/95 py-4 backdrop-blur">
        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted">Profile strength / 资料完整度 · {tier}</span>
            <span className="tabular-nums text-ink">{score}%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-sm bg-line">
            <div
              className="h-full rounded-sm transition-[width] duration-500 ease-out"
              style={{
                width: `${score}%`,
                backgroundColor: score >= 80 ? "var(--color-ink)" : "var(--color-bronze)",
              }}
            />
          </div>
          {nudge && <p className="mt-1.5 text-xs text-muted">{nudge}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={pending}
            className={`inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-medium text-paper transition-colors disabled:opacity-60 ${
              saved ? "bg-ink" : "bg-bronze hover:bg-bronze-dark"
            } ${state?.error && !pending ? "shake" : ""}`}
          >
            {pending ? (
              "Saving… / 保存中…"
            ) : saved ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    className="check-draw"
                    d="M5 12.5l4.5 4.5L19 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Saved / 已保存
              </>
            ) : (
              "Save changes / 保存修改"
            )}
          </button>

          {dirty && !pending && (
            <span className="flex items-center gap-2 text-sm text-muted">
              <span className="h-2 w-2 rounded-full bg-bronze" />
              Unsaved changes / 有未保存的修改
            </span>
          )}
          {state?.error && !pending && (
            <span className="text-sm text-bronze-dark">{state.error}</span>
          )}
        </div>
      </div>

      {/* Success toast */}
      {showToast && (
        <div
          className="toast-in fixed left-1/2 top-24 z-50 flex max-w-[92vw] -translate-x-1/2 items-center gap-4 rounded-sm border border-line bg-ink px-5 py-3 text-sm text-paper shadow-lg"
          role="status"
        >
          <span>Saved — live in about a minute · 已保存，约一分钟后同步</span>
          <Link
            href={`/agents/${agent.slug}`}
            className="shrink-0 font-medium text-bronze underline-offset-4 hover:underline"
          >
            View my page → / 查看主页
          </Link>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            aria-label="Dismiss"
            className="shrink-0 text-paper/60 hover:text-paper"
          >
            ✕
          </button>
        </div>
      )}
    </form>
  );
}
