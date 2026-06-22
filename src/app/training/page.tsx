import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cloudflareStreamIframeUrl } from "@/lib/embeds";
import { getT, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Agent Training Library",
  description:
    "Homix agent portal training videos: onboarding, media production, buyer and seller playbooks, compliance, and operations.",
};

type Lesson = {
  title: string;
  summary: string;
  duration: string;
  level: string;
  cloudflareVideoUid?: string;
  iframeUrl?: string;
};

type Program = {
  eyebrow: string;
  title: string;
  summary: string;
  outcome: string;
  lessons: Lesson[];
};

const copy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    stats: { value: string; label: string }[];
    featuredLabel: string;
    pendingLabel: string;
    programEyebrow: string;
    programTitle: string;
    lessonLabel: string;
    outcomeLabel: string;
    cloudflareNote: string;
    programs: Program[];
  }
> = {
  en: {
    eyebrow: "Agent Portal · Training",
    title: "Training videos for the way Homix actually works.",
    lead: "A practical curriculum for Homix agents: how we talk to clients, shoot media, run deals, stay compliant, and turn attention into closings.",
    primaryCta: "Start with onboarding",
    secondaryCta: "Talk to operations",
    stats: [
      { value: "4", label: "Programs" },
      { value: "12", label: "Core lessons" },
      { value: "Cloudflare", label: "Stream-ready" },
    ],
    featuredLabel: "Featured lesson",
    pendingLabel: "Coming soon",
    programEyebrow: "Video curriculum",
    programTitle: "Programs built for agents in the field",
    lessonLabel: "Lessons",
    outcomeLabel: "Outcome",
    cloudflareNote:
      "Videos will play here through Cloudflare Stream as each lesson is published.",
    programs: [
      {
        eyebrow: "Program 01",
        title: "Homix Foundations",
        summary:
          "The operating model: brand promise, client standard, systems, and your first 90-day rhythm.",
        outcome:
          "New agents know where to find answers, how Homix talks, and what a strong first month looks like.",
        lessons: [
          {
            title: "Welcome to the Homix operating model",
            summary:
              "Brokerage, media studio, and agent incubator in one working rhythm.",
            duration: "12 min",
            level: "Start here",
          },
          {
            title: "Systems, accounts, and daily cadence",
            summary:
              "Email, CRM, MLS access, AI workspace, and the habits that keep every lead moving.",
            duration: "15 min",
            level: "Core",
          },
          {
            title: "The first 90 days",
            summary:
              "What to complete, who to meet, and how mentors review progress before the first deal.",
            duration: "18 min",
            level: "Core",
          },
        ],
      },
      {
        eyebrow: "Program 02",
        title: "Media & Personal Brand",
        summary:
          "How agents become recognizable: scripting, on-camera confidence, listing tours, and channel cadence.",
        outcome:
          "Agents can plan, film, and publish content that sounds like Homix and builds trust before a client call.",
        lessons: [
          {
            title: "Your first intro video",
            summary:
              "A simple on-camera structure for credibility, warmth, and bilingual clarity.",
            duration: "10 min",
            level: "Starter",
          },
          {
            title: "Listing tour playbook",
            summary:
              "Turn rooms, light, floor plan, and neighborhood context into a story buyers understand.",
            duration: "20 min",
            level: "Field",
          },
          {
            title: "Weekly content cadence",
            summary:
              "What to post, when to shoot, and how to coordinate with the in-house studio.",
            duration: "14 min",
            level: "Core",
          },
        ],
      },
      {
        eyebrow: "Program 03",
        title: "Buyer & Seller Playbooks",
        summary:
          "Consultations, valuations, showings, offers, negotiation, and keeping clients calm through the middle.",
        outcome:
          "Agents can run the client conversation from first contact to signed agreement with a clear process.",
        lessons: [
          {
            title: "Buyer consultation script",
            summary:
              "Budget, timing, property type, financing, decision-makers, and next steps in one clean call.",
            duration: "16 min",
            level: "Core",
          },
          {
            title: "Seller valuation conversation",
            summary:
              "How to explain comps, media strategy, timing, and realistic pricing without losing confidence.",
            duration: "22 min",
            level: "Field",
          },
          {
            title: "Offer and negotiation flow",
            summary:
              "Terms, proof of funds, attorney review, counteroffers, and the handoff to operations.",
            duration: "19 min",
            level: "Core",
          },
        ],
      },
      {
        eyebrow: "Program 04",
        title: "Compliance & Operations",
        summary:
          "The details that protect clients and the brokerage: agency disclosure, Fair Housing, advertising, and file hygiene.",
        outcome:
          "Agents understand what must be documented, disclosed, reviewed, and escalated before a deal gets risky.",
        lessons: [
          {
            title: "Fair Housing in real conversations",
            summary:
              "How to answer sensitive neighborhood, school, and demographic questions correctly.",
            duration: "17 min",
            level: "Required",
          },
          {
            title: "Advertising and license disclosures",
            summary:
              "What every post, flyer, landing page, and listing caption needs before it goes live.",
            duration: "13 min",
            level: "Required",
          },
          {
            title: "Transaction file checklist",
            summary:
              "Forms, signatures, timelines, deal notes, and when to involve broker review.",
            duration: "21 min",
            level: "Required",
          },
        ],
      },
    ],
  },
  zh: {
    eyebrow: "经纪人门户 · 培训",
    title: "Homix 经纪人的视频培训库。",
    lead: "一套实战型课程：如何与客户沟通、拍摄内容、推进交易、保持合规，并把流量转化为成交。",
    primaryCta: "先看入职课程",
    secondaryCta: "联系运营",
    stats: [
      { value: "4", label: "课程模块" },
      { value: "12", label: "核心视频" },
      { value: "Cloudflare", label: "视频源已预留" },
    ],
    featuredLabel: "推荐课程",
    pendingLabel: "即将上线",
    programEyebrow: "视频课程",
    programTitle: "为一线经纪人设计的训练节目",
    lessonLabel: "课程",
    outcomeLabel: "学习结果",
    cloudflareNote: "每支课程发布后，将通过 Cloudflare Stream 在此播放。",
    programs: [
      {
        eyebrow: "课程 01",
        title: "Homix 基础训练",
        summary: "公司的工作方式：品牌承诺、客户标准、系统工具，以及前 90 天节奏。",
        outcome: "新经纪人知道从哪里找答案、如何代表 Homix 说话，以及第一个月应该做到什么。",
        lessons: [
          {
            title: "欢迎进入 Homix 工作模式",
            summary: "经纪公司、媒体工作室、经纪人孵化器如何形成一套日常节奏。",
            duration: "12 分钟",
            level: "从这里开始",
          },
          {
            title: "系统、账户与每日节奏",
            summary: "邮箱、CRM、MLS、AI 工作台，以及让每条线索持续推进的习惯。",
            duration: "15 分钟",
            level: "核心",
          },
          {
            title: "前 90 天路线图",
            summary: "要完成什么、要见谁，以及导师如何在第一单前做进度复盘。",
            duration: "18 分钟",
            level: "核心",
          },
        ],
      },
      {
        eyebrow: "课程 02",
        title: "媒体与个人品牌",
        summary: "让经纪人被记住：脚本、镜头表现、房源视频与账号更新节奏。",
        outcome: "经纪人能规划、拍摄并发布符合 Homix 声音、且能在客户来电前建立信任的内容。",
        lessons: [
          {
            title: "你的第一支自我介绍视频",
            summary: "一个简单的出镜结构，兼顾专业感、亲和力与中英双语表达。",
            duration: "10 分钟",
            level: "入门",
          },
          {
            title: "房源导览拍摄方法",
            summary: "把空间、采光、户型和社区背景，讲成买家听得懂的故事。",
            duration: "20 分钟",
            level: "实战",
          },
          {
            title: "每周内容节奏",
            summary: "发什么、什么时候拍、如何与自有工作室协同。",
            duration: "14 分钟",
            level: "核心",
          },
        ],
      },
      {
        eyebrow: "课程 03",
        title: "买卖双方实战流程",
        summary: "咨询、估价、看房、报价、谈判，以及在交易中段稳住客户。",
        outcome: "经纪人能用清晰流程，把客户从第一次沟通带到签约阶段。",
        lessons: [
          {
            title: "买家咨询话术",
            summary: "预算、时间线、房型、贷款、决策人和下一步，一通电话讲清楚。",
            duration: "16 分钟",
            level: "核心",
          },
          {
            title: "卖家估价沟通",
            summary: "如何解释 comps、媒体策略、上市时机与真实定价，同时保持信任。",
            duration: "22 分钟",
            level: "实战",
          },
          {
            title: "报价与谈判流程",
            summary: "条款、资金证明、律师审阅、还价，以及如何交接给运营。",
            duration: "19 分钟",
            level: "核心",
          },
        ],
      },
      {
        eyebrow: "课程 04",
        title: "合规与运营",
        summary: "保护客户与公司的关键细节：代理披露、公平住房、广告规范、文件完整性。",
        outcome: "经纪人理解哪些内容必须记录、披露、复核，以及何时需要升级给经纪负责人。",
        lessons: [
          {
            title: "真实对话中的公平住房",
            summary: "如何正确回答有关社区、学校和人口结构等敏感问题。",
            duration: "17 分钟",
            level: "必修",
          },
          {
            title: "广告与执照披露",
            summary: "每条帖子、传单、落地页和房源文案上线前必须包含什么。",
            duration: "13 分钟",
            level: "必修",
          },
          {
            title: "交易文件清单",
            summary: "表格、签名、时间线、交易备注，以及何时需要经纪负责人审核。",
            duration: "21 分钟",
            level: "必修",
          },
        ],
      },
    ],
  },
};

function n2(i: number): string {
  return String(i + 1).padStart(2, "0");
}

function streamSrc(lesson: Lesson): string {
  return lesson.iframeUrl?.trim() || cloudflareStreamIframeUrl(lesson.cloudflareVideoUid ?? "");
}

function PlayMark() {
  return (
    <span
      aria-hidden
      className="flex size-14 items-center justify-center rounded-full border border-paper/40 bg-paper/15 text-paper backdrop-blur-sm"
    >
      <span className="ml-1 h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-current" />
    </span>
  );
}

function VideoFrame({
  lesson,
  labels,
}: {
  lesson: Lesson;
  labels: { pending: string; note: string };
}) {
  const src = streamSrc(lesson);

  if (src) {
    return (
      <iframe
        src={src}
        title={lesson.title}
        loading="lazy"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-ink p-6 text-paper">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-sm border border-paper/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-paper/75">
          {labels.pending}
        </span>
        <span className="text-sm text-paper/60">{lesson.duration}</span>
      </div>
      <div>
        <PlayMark />
        <p className="mt-6 font-serif text-2xl leading-tight">{lesson.title}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-paper/65">{labels.note}</p>
      </div>
    </div>
  );
}

export default async function TrainingPage() {
  const { locale } = await getT();
  const t = copy[locale];
  const featured = t.programs[0].lessons[0];

  return (
    <>
      <section className="border-b border-line bg-surface py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="max-w-3xl">
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h1 className="mt-5 font-serif text-4xl font-normal leading-[1.08] text-ink sm:text-[3.35rem]">
                {t.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">{t.lead}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="#programs">{t.primaryCta}</Button>
                <Button href="/contact" variant="outline">
                  {t.secondaryCta}
                </Button>
              </div>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
              {t.stats.map((item) => (
                <div key={item.label} className="bg-paper p-6">
                  <p className="font-serif text-3xl text-bronze">{item.value}</p>
                  <p className="mt-2 text-sm leading-snug text-muted">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-18">
        <div className="grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-stretch">
          <Reveal>
            <div className="relative aspect-video overflow-hidden rounded-sm border border-line bg-ink">
              <VideoFrame
                lesson={featured}
                labels={{
                  pending: t.pendingLabel,
                  note: t.cloudflareNote,
                }}
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex h-full flex-col justify-between border-y border-line py-7 lg:py-8">
              <div>
                <Eyebrow>{t.featuredLabel}</Eyebrow>
                <h2 className="mt-4 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.25rem]">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  {featured.summary}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                <span className="rounded-sm bg-surface px-3 py-2 text-ink">
                  {featured.level}
                </span>
                <span className="rounded-sm bg-surface px-3 py-2 text-muted">
                  {featured.duration}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      <section id="programs" className="border-t border-line py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{t.programEyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.65rem]">
              {t.programTitle}
            </h2>
          </div>

          <div className="mt-12 space-y-12">
            {t.programs.map((program, programIndex) => (
              <Reveal key={program.title}>
                <article className="grid gap-8 border-t border-line pt-10 lg:grid-cols-[0.42fr_1.58fr] lg:gap-12">
                  <div>
                    <p className="font-serif text-4xl text-bronze/70">{n2(programIndex)}</p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-muted">
                      {program.eyebrow}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl leading-tight text-ink">
                      {program.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">
                      {program.summary}
                    </p>
                    <div className="mt-6 border-l border-bronze/45 pl-4">
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-bronze">
                        {t.outcomeLabel}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink/75">
                        {program.outcome}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-sm font-medium text-ink">
                      {t.lessonLabel}
                    </p>
                    <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
                      {program.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.title} className="flex min-h-[320px] flex-col bg-surface">
                          <div className="relative aspect-video overflow-hidden bg-ink">
                            <VideoFrame
                              lesson={lesson}
                              labels={{
                                pending: t.pendingLabel,
                                note: t.cloudflareNote,
                              }}
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-5">
                            <div className="flex items-center justify-between gap-3 text-xs text-muted">
                              <span>{n2(lessonIndex)}</span>
                              <span>{lesson.duration}</span>
                            </div>
                            <h4 className="mt-4 font-serif text-xl leading-tight text-ink">
                              {lesson.title}
                            </h4>
                            <p className="mt-3 text-sm leading-relaxed text-muted">
                              {lesson.summary}
                            </p>
                            <p className="mt-auto pt-5 text-xs font-medium uppercase tracking-[0.14em] text-bronze">
                              {lesson.level}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
