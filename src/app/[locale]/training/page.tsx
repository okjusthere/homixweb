import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getRouteLocale, getT, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { SITE_MEDIA_ROOT } from "@/lib/media";

const ARCHIVE_URL = "https://agents.homixny.com/training";
const POSTER_ROOT =
  `${SITE_MEDIA_ROOT}/training`;

type LocalizedText = Record<Locale, string>;

type TrainingPoster = {
  title: LocalizedText;
  detail: LocalizedText;
  alt: LocalizedText;
  image: string;
  width: number;
  height: number;
};

type TrainingPhoto = TrainingPoster;

const posters: TrainingPoster[] = [
  {
    title: { en: "Buyer Boot Camp", zh: "买家精英实战营" },
    detail: { en: "Six weeks · 12 practical sessions", zh: "6 周 · 12 节实战课程" },
    alt: {
      en: "Homix Buyer Boot Camp six-week training program poster",
      zh: "Homix 买家精英实战营六周培训课程海报",
    },
    image: `${POSTER_ROOT}/buyer-bootcamp.jpg`,
    width: 1280,
    height: 2134,
  },
  {
    title: { en: "The Listing Mastery Bootcamp", zh: "Listing 系统训练营" },
    detail: { en: "Six weeks · 12 practical sessions", zh: "6 周 · 12 节实战课程" },
    alt: {
      en: "Homix Listing Mastery six-week training program poster",
      zh: "Homix Listing Mastery 六周系统训练营海报",
    },
    image: `${POSTER_ROOT}/listing-bootcamp.jpg`,
    width: 1080,
    height: 1920,
  },
  {
    title: { en: "New York transaction pitfalls", zh: "纽约地产交易常见问题" },
    detail: { en: "Attorney Chen Heng · April 15, 2026", zh: "陈恒律师 · 2026 年 4 月 15 日" },
    alt: {
      en: "Homix seminar poster about common issues in New York real estate transactions",
      zh: "Homix 纽约地产交易常见问题专题讲座海报",
    },
    image: `${POSTER_ROOT}/ny-transaction-pitfalls.jpg`,
    width: 1131,
    height: 1600,
  },
  {
    title: { en: "No-income loan programs", zh: "不查收入贷款项目" },
    detail: { en: "Li Li · April 13", zh: "Li Li · 4 月 13 日" },
    alt: {
      en: "Homix seminar poster about no-income loan program categories and advantages",
      zh: "Homix 不查收入贷款项目类别与优势专题课海报",
    },
    image: `${POSTER_ROOT}/no-income-loan-week4.jpg`,
    width: 899,
    height: 1600,
  },
  {
    title: { en: "Loan strategies that help agents close", zh: "贷款如何帮助地产经纪人成单" },
    detail: { en: "David Wu · April 10", zh: "David Wu · 4 月 10 日" },
    alt: {
      en: "Homix loan strategy seminar poster featuring David Wu",
      zh: "Homix 贷款如何帮助地产经纪人成单专题讲座海报",
    },
    image: `${POSTER_ROOT}/loan-seminar-david-wu.jpg`,
    width: 1280,
    height: 1600,
  },
  {
    title: { en: "Listing appointment mastery", zh: "Listing Appointment 高转化邀约" },
    detail: { en: "Judy Markowitz · April 8", zh: "Judy Markowitz · 4 月 8 日" },
    alt: {
      en: "Homix Listing Appointment training poster featuring Judy Markowitz",
      zh: "Homix Listing Appointment 高转化邀约专题课海报",
    },
    image: `${POSTER_ROOT}/listing-appointment-week3.jpg`,
    width: 898,
    height: 1600,
  },
  {
    title: { en: "Mortgage process essentials", zh: "房贷过程注意事项" },
    detail: { en: "Jing Rao Mortgage Team · February 13", zh: "Jing Rao 房贷团队 · 2 月 13 日" },
    alt: {
      en: "Homix mortgage process and risk training poster featuring Jing Rao",
      zh: "Homix 房贷流程与风险提示专题讲座海报",
    },
    image: `${POSTER_ROOT}/mortgage-process-notes.jpg`,
    width: 1079,
    height: 1600,
  },
  {
    title: { en: "Media monetization and applied AI", zh: "自媒体变现与 AI 运用" },
    detail: { en: "Sunny Zhang & Eric Wei · January 22, 2026", zh: "Sunny Zhang、Eric Wei · 2026 年 1 月 22 日" },
    alt: {
      en: "Homix public class poster about media monetization and applied AI",
      zh: "Homix 自媒体变现与 AI 运用公开课海报",
    },
    image: `${POSTER_ROOT}/ai-media-event.jpg`,
    width: 900,
    height: 1600,
  },
];

const trainingPhotos: TrainingPhoto[] = [
  {
    title: { en: "Live workshop session", zh: "线下实战课现场" },
    detail: { en: "Scripts, Q&A, and deal practice", zh: "话术、答疑与交易演练" },
    alt: {
      en: "Homix agents studying scripts during a live workshop session",
      zh: "Homix 经纪人在线下实战课中学习话术与交易流程",
    },
    image: `${POSTER_ROOT}/live-workshop.jpg`,
    width: 908,
    height: 1600,
  },
  {
    title: { en: "Cohort team session", zh: "班级合影" },
    detail: { en: "Office training and team learning", zh: "办公室培训与团队学习" },
    alt: {
      en: "Homix team members gathered in the office during training",
      zh: "Homix 团队成员在办公室培训期间合影",
    },
    image: `${POSTER_ROOT}/training-team.jpg`,
    width: 1600,
    height: 1199,
  },
  {
    title: { en: "Office coaching moment", zh: "办公室带教时刻" },
    detail: { en: "Hands-on support and milestone check-ins", zh: "实战支持与阶段性复盘" },
    alt: {
      en: "Homix agents and coaches together after an office training session",
      zh: "Homix 经纪人与导师在办公室培训后的交流时刻",
    },
    image: `${POSTER_ROOT}/training-milestone.jpg`,
    width: 1200,
    height: 1600,
  },
  {
    title: { en: "Roundtable training", zh: "会议室圆桌培训" },
    detail: { en: "Group coaching and discussion", zh: "集体带教与案例讨论" },
    alt: {
      en: "Homix agents gathered around a conference table for training",
      zh: "Homix 经纪人在会议室参加圆桌培训",
    },
    image: `${POSTER_ROOT}/roundtable-window-session.jpg`,
    width: 1199,
    height: 1600,
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return pageMetadata({
    path: "/training",
    locale,
    title: {
      en: "Agent Training Programs & Seminars | Homix Realty",
      zh: "纽约地产经纪人培训与实战讲座 | Homix Realty",
    },
    description: {
      en: "Explore Homix agent boot camps and specialist seminars on buyer representation, listings, financing, legal issues, media, and applied AI in New York real estate.",
      zh: "查看 Homix 纽约地产经纪人训练营与专题课，涵盖买家服务、房源开发、贷款、交易法律、自媒体与 AI 实战。",
    },
  });
}

export default async function TrainingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getRouteLocale(params);
  const { t } = await getT(locale);

  return (
    <>
      <section className="border-b border-line bg-surface">
        <Container className="py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
            <div className="max-w-3xl">
              <Eyebrow>{t.training.eyebrow}</Eyebrow>
              <h1 className="mt-5 font-serif text-4xl font-normal leading-[1.08] text-ink sm:text-[3.4rem]">
                {t.training.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                {t.training.lead}
              </p>
            </div>
            <div>
              <Button href={ARCHIVE_URL} variant="outline">
                {t.training.archiveCta}
                <span aria-hidden>↗</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <div className="border-b border-line pb-6">
            <Eyebrow>{t.training.galleryEyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.55rem]">
              {t.training.galleryTitle}
            </h2>
          </div>

          <div className="mt-8 columns-1 gap-7 sm:columns-2 lg:columns-3">
            {posters.map((poster, index) => (
              <div
                key={poster.image}
                className="mb-9 break-inside-avoid"
              >
                <figure className="break-inside-avoid">
                  <div className="overflow-hidden rounded-sm border border-line bg-surface">
                    <Image
                      src={poster.image}
                      alt={poster.alt[locale]}
                      width={poster.width}
                      height={poster.height}
                      loading={index === 0 || index === 3 || index === 6 ? "eager" : "lazy"}
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-4 border-l border-bronze/50 pl-4">
                    <h3 className="font-serif text-xl leading-tight text-ink">
                      {poster.title[locale]}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {poster.detail[locale]}
                    </p>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-12 sm:py-14">
        <Container>
          <div className="border-b border-line pb-6">
            <Eyebrow>{t.training.photosEyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl font-normal leading-tight text-ink sm:text-[2.55rem]">
              {t.training.photosTitle}
            </h2>
          </div>

          <div className="mt-8 columns-1 gap-7 sm:columns-2">
            {trainingPhotos.map((photo, index) => (
              <figure key={photo.image} className="mb-9 break-inside-avoid">
                <div className="overflow-hidden rounded-sm border border-line bg-canvas">
                  <Image
                    src={photo.image}
                    alt={photo.alt[locale]}
                    width={photo.width}
                    height={photo.height}
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="(min-width: 640px) 46vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-4 border-l border-bronze/50 pl-4">
                  <h3 className="font-serif text-xl leading-tight text-ink">
                    {photo.title[locale]}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {photo.detail[locale]}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
