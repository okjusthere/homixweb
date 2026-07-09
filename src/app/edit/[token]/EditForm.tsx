"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import type { Agent } from "@/lib/listings";
import { AvatarCropper } from "./AvatarCropper";
import { QrUpload } from "./QrUpload";
import { updateAgentProfile, type SaveState } from "./actions";

const MAX_TESTIMONIALS = 3;

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
  const reviews = agent.reviews ?? {};
  const [title, setTitle] = useState(agent.title);
  const [phone, setPhone] = useState(agent.phone);
  const [email, setEmail] = useState(agent.email);
  const [bio, setBio] = useState(agent.bio);
  const [specialtiesStr, setSpecialtiesStr] = useState(agent.specialties.join(", "));
  const [languagesStr, setLanguagesStr] = useState((agent.languages ?? []).join(", "));
  const [instagram, setInstagram] = useState(social.instagram ?? "");
  const [xiaohongshu, setXiaohongshu] = useState(social.xiaohongshu ?? "");
  const [douyin, setDouyin] = useState(social.douyin ?? "");
  const [youtube, setYoutube] = useState(social.youtube ?? "");
  const [linkedin, setLinkedin] = useState(social.linkedin ?? "");
  const [website, setWebsite] = useState(social.website ?? "");
  const [zillowUrl, setZillowUrl] = useState(reviews.zillow?.url ?? "");
  const [googleUrl, setGoogleUrl] = useState(reviews.google?.url ?? "");
  const [photoPicked, setPhotoPicked] = useState(
    Boolean(agent.photo) && agent.photo !== PLACEHOLDER,
  );
  const [wechatPicked, setWechatPicked] = useState(Boolean(agent.wechatQr));

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
  const languagesList = parseSpecialties(languagesStr);
  const socialCount = [instagram, xiaohongshu, douyin, youtube, linkedin, website].filter(
    (s) => s.trim(),
  ).length;
  const hasReviews = Boolean(zillowUrl.trim() || googleUrl.trim());
  const score =
    (photoPicked ? 20 : 0) +
    (bio.trim().length >= BIO_GOOD ? 20 : 0) +
    (title.trim() ? 8 : 0) +
    (phone.trim() ? 8 : 0) +
    (email.trim() ? 8 : 0) +
    (specialtiesList.length ? 8 : 0) +
    (languagesList.length ? 6 : 0) +
    (socialCount ? 8 : 0) +
    (wechatPicked ? 6 : 0) +
    (hasReviews ? 8 : 0);

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
        : !languagesList.length
          ? "List the languages you speak · 添加你会的语言"
          : !socialCount
            ? "Link a social channel · 关联一个社交账号"
            : !wechatPicked
              ? "Add your WeChat QR · 上传微信二维码"
              : !hasReviews
                ? "Link your Zillow / Google reviews · 关联 Zillow / Google 评价"
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
          <div className="sm:col-span-2">
            <label className={label} htmlFor="languages">Languages you speak / 你会的语言</label>
            <input
              id="languages"
              name="languages"
              value={languagesStr}
              onChange={(e) => setLanguagesStr(e.target.value)}
              placeholder="English, 中文, 粤语 / 用逗号分隔"
              className={input}
            />
            {languagesList.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {languagesList.map((l, i) => (
                  <span key={`${l}-${i}`} className="rounded-sm border border-line px-3 py-1 text-xs text-muted">
                    {l}
                  </span>
                ))}
              </div>
            )}
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
          <input name="social_youtube" value={youtube} onChange={(e) => setYoutube(e.target.value)} placeholder="YouTube URL" className={input} />
          <input name="social_linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn URL" className={input} />
          <input name="social_website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website URL" className={`${input} sm:col-span-2`} />
        </div>
      </section>

      {/* WeChat QR */}
      <section>
        <p className="eyebrow mb-1">WeChat QR / 微信二维码</p>
        <p className="mb-4 text-xs text-muted">
          For many clients WeChat is the fastest way to reach you · 对很多客户，微信是最快的联系方式。
        </p>
        <QrUpload
          current={agent.wechatQr}
          onChange={(hasQr) => {
            setWechatPicked(hasQr);
            onFormChange();
          }}
        />
      </section>

      {/* Reviews */}
      <section>
        <p className="eyebrow mb-1">Reviews / 客户评价</p>
        <p className="mb-4 text-xs text-muted">
          Paste your public review-profile link. Rating and count are optional and shown next to a
          live link to the source · 填公开评价主页链接；星级与条数选填，会与「实时链接」一起显示。
        </p>
        <div className="space-y-4">
          <div>
            <label className={label}>Zillow</label>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
              <input name="review_zillow_url" value={zillowUrl} onChange={(e) => setZillowUrl(e.target.value)} placeholder="Zillow profile URL" className={input} />
              <input name="review_zillow_rating" defaultValue={reviews.zillow?.rating ?? ""} placeholder="4.9" className={`${input} sm:w-24`} />
              <input name="review_zillow_count" defaultValue={reviews.zillow?.count ?? ""} placeholder="# reviews" className={`${input} sm:w-28`} />
            </div>
          </div>
          <div>
            <label className={label}>Google</label>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
              <input name="review_google_url" value={googleUrl} onChange={(e) => setGoogleUrl(e.target.value)} placeholder="Google reviews URL" className={input} />
              <input name="review_google_rating" defaultValue={reviews.google?.rating ?? ""} placeholder="4.9" className={`${input} sm:w-24`} />
              <input name="review_google_count" defaultValue={reviews.google?.count ?? ""} placeholder="# reviews" className={`${input} sm:w-28`} />
            </div>
          </div>
        </div>
      </section>

      {/* Track record */}
      <section>
        <p className="eyebrow mb-1">Track record / 业绩与资历</p>
        <p className="mb-4 text-xs text-muted">
          Optional. Enter only figures you can stand behind — they must be truthful and current ·
          选填。只填你能负责的真实、最新数字。
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="stat_years">Years in real estate / 从业年数</label>
            <input id="stat_years" name="stat_years" defaultValue={agent.stats?.years ?? ""} placeholder="10+" className={input} />
          </div>
          <div>
            <label className={label} htmlFor="stat_transactions">Homes closed / 成交套数</label>
            <input id="stat_transactions" name="stat_transactions" defaultValue={agent.stats?.transactions ?? ""} placeholder="150+" className={input} />
          </div>
          <div>
            <label className={label} htmlFor="stat_volume">Sales volume / 成交额</label>
            <input id="stat_volume" name="stat_volume" defaultValue={agent.stats?.volume ?? ""} placeholder="$80M+" className={input} />
          </div>
          <div>
            <label className={label} htmlFor="stat_areas">Areas served / 服务区域</label>
            <input id="stat_areas" name="stat_areas" defaultValue={agent.stats?.areas ?? ""} placeholder="Flushing · Long Island · Manhattan" className={input} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <p className="eyebrow mb-1">Client testimonials / 客户好评</p>
        <p className="mb-4 text-xs text-muted">
          Up to {MAX_TESTIMONIALS}. Use real client words you have permission to share ·
          最多 {MAX_TESTIMONIALS} 条，请使用获授权分享的真实客户原话。
        </p>
        <div className="space-y-4">
          {Array.from({ length: MAX_TESTIMONIALS }).map((_, i) => {
            const t = agent.testimonials?.[i];
            return (
              <div key={i} className="rounded-sm border border-line p-4">
                <textarea
                  name={`testimonial_${i}_quote`}
                  rows={2}
                  defaultValue={t?.quote ?? ""}
                  placeholder={`Testimonial ${i + 1} · 客户原话`}
                  className={input}
                />
                <input
                  name={`testimonial_${i}_author`}
                  defaultValue={t?.author ?? ""}
                  placeholder="Attribution, e.g. J. Chen · 署名（可用姓名缩写）"
                  className={`${input} mt-3`}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Sticky action bar: strength meter + save */}
      <div className="sticky bottom-0 z-30 space-y-3 border-t border-line bg-surface/95 py-4">
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
