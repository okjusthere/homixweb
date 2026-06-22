import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getT } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Agent Onboarding",
  description:
    "Homix agent onboarding: vision, mission, leadership, in-house support, resources, and the first 90 days from paperwork to your first deal.",
};

function n2(i: number): string {
  return String(i + 1).padStart(2, "0");
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5 shrink-0">
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="var(--color-bronze)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function SocialIcon({ platform }: { platform: string }) {
  const iconClass = "size-7";

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={iconClass}>
        <defs>
          <linearGradient id="instagram-gradient" x1="4" x2="20" y1="20" y2="4" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEDA75" />
            <stop offset="0.28" stopColor="#FA7E1E" />
            <stop offset="0.52" stopColor="#D62976" />
            <stop offset="0.74" stopColor="#962FBF" />
            <stop offset="1" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#instagram-gradient)" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="1.8" />
        <circle cx="16.7" cy="7.4" r="1.2" fill="#fff" />
      </svg>
    );
  }

  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={iconClass}>
        <circle cx="12" cy="12" r="11" fill="#1877F2" />
        <path
          d="M13.7 21v-7.1h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8.2V14h2.5v7h3Z"
          fill="#fff"
        />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={iconClass}>
        <rect width="24" height="24" rx="3" fill="#0A66C2" />
        <path d="M7.1 9.1H4V20h3.1V9.1ZM5.6 4a1.8 1.8 0 1 0 0 3.6A1.8 1.8 0 0 0 5.6 4Zm14.1 9.8c0-3.2-1.7-4.7-4-4.7a3.4 3.4 0 0 0-3.1 1.7h-.1V9.1h-3V20h3.1v-5.4c0-1.4.3-2.8 2-2.8s1.8 1.6 1.8 2.9V20h3.2v-6.2Z" fill="#fff" />
      </svg>
    );
  }

  if (platform === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={iconClass}>
        <rect width="24" height="24" rx="5" fill="#010101" />
        <path d="M14.1 4.2c.3 2.4 1.7 3.8 4.1 4v2.9a7 7 0 0 1-3.9-1.2v5.4c0 2.7-1.9 4.7-4.7 4.7a4.5 4.5 0 0 1-4.5-4.6c0-3 2.6-5.1 5.5-4.5v3c-1.3-.4-2.5.3-2.5 1.5 0 1 .7 1.7 1.7 1.7s1.7-.6 1.7-1.9v-11h2.6Z" fill="#25F4EE" opacity="0.9" />
        <path d="M15 4.2c.3 2.4 1.7 3.8 4.1 4v2.9a7 7 0 0 1-3.9-1.2v5.4c0 2.7-1.9 4.7-4.7 4.7a4.5 4.5 0 0 1-4.5-4.6c0-3 2.6-5.1 5.5-4.5v3c-1.3-.4-2.5.3-2.5 1.5 0 1 .7 1.7 1.7 1.7s1.7-.6 1.7-1.9v-11H15Z" fill="#FE2C55" opacity="0.9" />
        <path d="M14.5 4.2c.3 2.4 1.7 3.8 4.1 4v2.9a7 7 0 0 1-3.9-1.2v5.4c0 2.7-1.9 4.7-4.7 4.7a4.5 4.5 0 0 1-4.5-4.6c0-3 2.6-5.1 5.5-4.5v3c-1.3-.4-2.5.3-2.5 1.5 0 1 .7 1.7 1.7 1.7s1.7-.6 1.7-1.9v-11h2.6Z" fill="#fff" />
      </svg>
    );
  }

  if (platform === "red") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={iconClass}>
        <rect width="24" height="24" rx="5" fill="#FF2442" />
        <text x="12" y="14.5" textAnchor="middle" fill="#fff" fontSize="6.4" fontWeight="800" fontFamily="Arial, sans-serif">
          RED
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className={iconClass}>
      <rect width="24" height="24" rx="5" fill="#fff" />
      <path d="M12 11v3.2h4.6a4.9 4.9 0 0 1-1.8 2.8l2.7 2.1c1.6-1.5 2.5-3.7 2.5-6.3 0-.6-.1-1.2-.2-1.8H12Z" fill="#4285F4" />
      <path d="M12 20.5c2.3 0 4.2-.8 5.6-2.1L14.8 17a5.3 5.3 0 0 1-7.9-2.8H4.1v2.2A8.5 8.5 0 0 0 12 20.5Z" fill="#34A853" />
      <path d="M6.9 14.2a5.1 5.1 0 0 1 0-3.4V8.6H4.1a8.5 8.5 0 0 0 0 7.8l2.8-2.2Z" fill="#FBBC05" />
      <path d="M12 6.6c1.2 0 2.4.4 3.3 1.3l2.5-2.5A8.5 8.5 0 0 0 4.1 8.6l2.8 2.2A5.1 5.1 0 0 1 12 6.6Z" fill="#EA4335" />
      <path d="M5.8 4.4h12.4v3.2H5.8V4.4Z" fill="#4285F4" opacity="0.12" />
    </svg>
  );
}

export default async function OnboardingPage() {
  const { t } = await getT();
  const o = t.onboarding;

  return (
    <>
      {/* Hero */}
      <Container className="py-16 sm:py-24">
        <div className="max-w-3xl">
          <Eyebrow>{o.eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl font-normal leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">
            {o.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{o.lead}</p>
        </div>
      </Container>

      {/* Vision & Mission */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div className="max-w-xl">
              <Eyebrow>{o.visionMission.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.55rem]">
                {o.visionMission.title}
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-muted">{o.visionMission.lead}</p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2">
            {o.visionMission.items.map((item) => (
              <Reveal key={item.title} className="bg-paper">
                <div className="h-full p-7 sm:p-8">
                  <p className="font-serif text-2xl text-ink">{item.title}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <Eyebrow>{o.leadership.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.65rem]">
            {o.leadership.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{o.leadership.lead}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {o.leadership.people.map((person, i) => (
            <Reveal key={person.name} delay={i * 70}>
              <article className="grid gap-6 border-t border-line pt-6 sm:grid-cols-[0.42fr_0.58fr]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-line">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(min-width: 1024px) 260px, (min-width: 640px) 38vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-bronze">
                    {person.role}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl leading-tight text-ink">
                    {person.name}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    {person.bio}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {person.focus.map((focus) => (
                      <span
                        key={focus}
                        className="rounded-sm bg-surface px-3 py-1.5 text-xs text-ink"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* In-house admins */}
      <section className="border-y border-line bg-surface py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <Eyebrow>{o.adminTeam.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.4rem]">
                {o.adminTeam.title}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">
                {o.adminTeam.lead}
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
              {o.adminTeam.members.map((member, i) => (
                <Reveal key={member.name} delay={i * 50} className="bg-paper">
                  <div className="flex h-full flex-col p-6">
                    {member.image ? (
                      <div className="relative size-16 overflow-hidden rounded-sm bg-line">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex size-12 items-center justify-center rounded-sm bg-ink font-serif text-lg text-paper">
                        {initials(member.name)}
                      </div>
                    )}
                    <p className="mt-5 font-serif text-xl text-ink">{member.name}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-bronze">
                      {member.role}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {member.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Admin checklist */}
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="max-w-xl">
            <Eyebrow>{o.adminChecklist.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.45rem]">
              {o.adminChecklist.title}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              {o.adminChecklist.lead}
            </p>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {o.adminChecklist.groups.map((group, i) => (
              <Reveal key={group.title} delay={i * 45}>
                <div className="grid gap-5 py-7 md:grid-cols-[0.36fr_0.64fr]">
                  <div>
                    <p className="font-serif text-3xl text-bronze/70">{n2(i)}</p>
                    <h3 className="mt-3 font-serif text-xl leading-tight text-ink">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                      {group.owner}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                        <Check />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      {/* Resources */}
      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <Container>
        <div className="max-w-3xl">
          <Eyebrow>{o.resources.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.55rem]">
            {o.resources.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{o.resources.lead}</p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {o.resources.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 45} className="bg-surface">
              <div className="h-full p-6">
                <p className="font-serif text-3xl text-bronze/70">{n2(i)}</p>
                <h3 className="mt-4 font-serif text-xl leading-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 border-t border-line pt-10">
          <h3 className="font-serif text-2xl leading-tight text-ink">
            {o.resources.socialPlatformsTitle}
          </h3>
          <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {o.resources.socialPlatforms.map((platform) => (
              <Reveal key={platform.key} className="bg-surface">
                <div className="flex h-full gap-4 p-5">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-line bg-paper shadow-sm">
                    <SocialIcon platform={platform.key} />
                  </div>
                  <div>
                    <p className="font-medium text-ink">{platform.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {platform.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        </Container>
      </section>

      {/* Phases */}
      <Container className="pb-20">
        <div className="mb-10 max-w-3xl">
          <Eyebrow>{o.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.55rem]">
            {o.title}
          </h2>
        </div>
        <div className="border-t border-line">
          {o.phases.map((p, i) => (
            <Reveal key={p.title}>
              <div className="grid gap-5 border-b border-line py-10 md:grid-cols-[0.42fr_1.58fr] md:gap-12">
                <div>
                  <p className="font-serif text-4xl text-bronze">{n2(i)}</p>
                  <h2 className="mt-3 font-serif text-2xl leading-snug text-ink">
                    {p.title}
                  </h2>
                </div>
                <div>
                  <p className="text-[15px] leading-relaxed text-muted">{p.blurb}</p>
                  <ul className="mt-5 space-y-3">
                    {p.items.map((it) => (
                      <li
                        key={it}
                        className="flex gap-3 text-[15px] leading-relaxed text-ink/85"
                      >
                        <Check />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Buyer Guide */}
      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{o.buyerGuide.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.55rem]">
              {o.buyerGuide.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{o.buyerGuide.lead}</p>
          </div>
          <div className="mt-10 border-t border-line">
            {o.buyerGuide.steps.map((step, i) => (
              <Reveal key={step.title}>
                <div className="grid gap-5 border-b border-line py-10 md:grid-cols-[0.42fr_1.58fr] md:gap-12">
                  <div>
                    <p className="font-serif text-4xl text-bronze">{n2(i)}</p>
                    <h3 className="mt-3 font-serif text-2xl leading-snug text-ink">{step.title.replace(/^\d+\s*—\s*/, "")}</h3>
                  </div>
                  <div>
                    <p className="text-[15px] leading-relaxed text-muted">{step.body}</p>
                    <ul className="mt-5 space-y-3">
                      {step.items.map((it) => (
                        <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
                          <Check />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Seller Guide */}
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <Eyebrow>{o.sellerGuide.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.55rem]">
            {o.sellerGuide.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{o.sellerGuide.lead}</p>
        </div>
        <div className="mt-10 border-t border-line">
          {o.sellerGuide.steps.map((step, i) => (
            <Reveal key={step.title}>
              <div className="grid gap-5 border-b border-line py-10 md:grid-cols-[0.42fr_1.58fr] md:gap-12">
                <div>
                  <p className="font-serif text-4xl text-pine">{n2(i)}</p>
                  <h3 className="mt-3 font-serif text-2xl leading-snug text-ink">{step.title.replace(/^第.+步\s*—\s*|^\d+\s*—\s*/, "")}</h3>
                </div>
                <div>
                  <p className="text-[15px] leading-relaxed text-muted">{step.body}</p>
                  <ul className="mt-5 space-y-3">
                    {step.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
                        <Check />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Closing */}
      <section className="bg-ink py-20 text-paper sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight sm:text-[2.6rem]">
              {o.closingTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-paper/75">
              {o.closingBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/join"
                className="inline-flex items-center rounded-sm bg-bronze px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-bronze-dark"
              >
                {t.join.heroCta}
              </a>
              <a
                href="/contact"
                className="inline-flex items-center rounded-sm border border-paper/30 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-paper"
              >
                {t.common.contact}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
