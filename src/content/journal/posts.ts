/**
 * Journal / 观察 — editorial content (SAMPLE posts).
 *
 * Bilingual (en/zh) market reports, guides, and brand pieces. Body is Markdown.
 * Replace these samples with real content; market figures here are illustrative.
 * `authorSlug` ties to an agent in the listings roster (Person schema + profile link).
 */

const cover = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export interface Bilingual {
  en: string;
  zh: string;
}

export interface JournalPost {
  slug: string;
  /** ISO date. */
  date: string;
  authorSlug: string;
  cover: string;
  readMinutes: number;
  category: Bilingual;
  title: Bilingual;
  excerpt: Bilingual;
  /** Markdown. */
  body: Bilingual;
}

export const journalPosts: JournalPost[] = [
  {
    slug: "flushing-queens-market-report",
    date: "2026-06-10",
    authorSlug: "michelleli",
    cover: cover("photo-1502602898657-3e91760cbb34"),
    readMinutes: 4,
    category: { en: "Market Report", zh: "市场观察" },
    title: {
      en: "Flushing & Queens Market Report: What Buyers and Sellers Should Know",
      zh: "法拉盛与皇后区市场观察：买家与卖家该知道的",
    },
    excerpt: {
      en: "Inventory is tight near transit, well-staged homes still draw multiple offers, and exposure is where price is won or lost.",
      zh: "临近交通的库存偏紧，布置出色的房子依旧多份报价——而价格,往往赢在曝光。",
    },
    body: {
      en: `The New York market rewards preparation. Here's how the numbers around Flushing and greater Queens are shaping up — and what it means whether you're buying or selling this season.

## What we're seeing

Inventory remains tight in the most walkable pockets — near the 7 train, Main Street, and the new-construction condos along Sanford and Roosevelt. Well-priced homes that show beautifully are still drawing multiple offers within the first two weeks.

- **Condos** near transit are moving fastest.
- **Single-family** homes in top school districts hold their value through any season.
- **Sellers** who invest in staging and professional media consistently close higher.

## For buyers

Get pre-approved before you tour. In a competitive pocket, the difference between a clean, ready offer and a slow one is often the home itself.

## For sellers

Exposure is everything. A listing that lives only on the MLS reaches a fraction of the audience a media-first campaign does. That gap is where price is won or lost.

*Figures are illustrative. For a current, address-specific read, [reach out](/contact) — we'll run the real numbers for you.*`,
      zh: `纽约市场，准备充分者得利。下面是法拉盛与皇后区近期的行情走向——无论你这一季是买还是卖，都值得一看。

## 我们看到的

最走得通的地段库存依然偏紧——7 号线沿线、缅街，以及 Sanford 与 Roosevelt 一带的新建公寓。定价合理、展示出色的房子，往往在挂牌头两周就收到多份报价。

- 临近地铁的**公寓**成交最快。
- 顶级学区的**独立屋**穿越周期、保值能力强。
- 在布置与专业媒体上投入的**卖家**，成交价普遍更高。

## 给买家

看房前先拿到贷款预批。在抢手地段，一份干净、随时可成交的报价，常常就是赢下心仪房子的关键。

## 给卖家

曝光决定一切。只挂在 MLS 上的房源，触达的人群只是"媒体优先"打法的一个零头。价格的高低，往往就赢在这个差距里。

*以上数据仅作示意。需要针对具体地址的最新行情，[联系我们](/contact)，我们为你跑真实数字。*`,
    },
  },
  {
    slug: "first-time-buyer-guide-nyc",
    date: "2026-05-22",
    authorSlug: "heidi",
    cover: cover("photo-1568605114967-8130f3a36994"),
    readMinutes: 5,
    category: { en: "Buyer Guide", zh: "购房指南" },
    title: {
      en: "A First-Time Buyer's Guide to New York Real Estate",
      zh: "纽约购房：首次买家完全指南",
    },
    excerpt: {
      en: "Buying your first home in New York isn't a maze — not with the right order of operations. Here's the path we walk every first-timer through.",
      zh: "在纽约买第一套房不必像走迷宫——只要步骤对。这是我们带每位首次买家走过的路。",
    },
    body: {
      en: `Buying your first home in New York can feel like a maze. It isn't — not with the right order of operations. Here's the path we walk every first-time buyer through.

## 1. Know your number

Before you fall in love with a listing, get pre-approved. It tells you what you can comfortably afford and makes your offer credible.

## 2. Map your must-haves

Commute, schools, space, and the rhythm of a street matter more than square footage alone. We help you weigh the trade-offs honestly.

## 3. Tour with intent

Two or three well-chosen showings beat ten random ones. We curate the list so your time goes to homes that actually fit.

## 4. Offer with strategy

Price is only part of an offer. Terms, timing, and how you present matter — especially in a competitive pocket.

## 5. To the closing table

Inspection, appraisal, and paperwork can rattle a first-timer. You'll have an advisor — and AI-assisted tools — keeping every date on track.

Ready when you are. [Start a conversation](/contact).`,
      zh: `在纽约买第一套房，常让人觉得像走迷宫。其实不必——只要步骤对。下面是我们带每一位首次买家走过的路。

## 1. 先搞清预算

在你爱上某套房之前，先拿到贷款预批。它让你知道自己能从容负担多少，也让你的报价更可信。

## 2. 列出必备项

通勤、学区、空间，以及一条街的生活气息，往往比单纯的面积更重要。我们帮你诚实地权衡取舍。

## 3. 带着目标看房

两三套精挑细选的看房，胜过十套漫无目的。我们替你筛好清单，让时间花在真正合适的房子上。

## 4. 有策略地出价

价格只是报价的一部分。条款、时机，以及你如何呈现同样关键——在抢手地段尤其如此。

## 5. 走到成交桌

验房、估价、文书，容易让新手手忙脚乱。你会有一位顾问——以及 AI 工具——帮你把每个节点都盯住。

你准备好，我们就开始。[聊一聊](/contact)。`,
    },
  },
  {
    slug: "why-media-first-sells-faster",
    date: "2026-05-05",
    authorSlug: "queenie",
    cover: cover("photo-1600607687939-ce8a6c25118c"),
    readMinutes: 4,
    category: { en: "Selling", zh: "卖房策略" },
    title: {
      en: "Why Selling With a Media-First Brokerage Sells Faster",
      zh: "为什么用「媒体优先」的经纪公司卖房更快",
    },
    excerpt: {
      en: "Two identical homes can sell weeks — and dollars — apart. The difference is rarely the house. It's how many of the right people saw it.",
      zh: "两套一模一样的房子，成交可能差上几周、差出真金白银。差别很少在房子，而在于多少对的人看见过它。",
    },
    body: {
      en: `Two identical homes can sell weeks — and dollars — apart. The difference is rarely the house. It's how many of the right people ever saw it.

## The MLS is the floor, not the ceiling

Listing on the MLS is table stakes. It puts your home in front of agents and the portals. But the buyers scrolling video at night, discovering neighborhoods through content — they're not refreshing the MLS.

## Where Homix is different

We were built as a media company that sells homes. Every listing gets:

- A professionally produced **video tour** and **Reels**, cut for how people actually watch.
- Distribution to a **1,000,000+ audience** already tuned to New York real estate.
- A campaign measured like marketing — reach, saves, inquiries — not just a sign in the yard.

## What that buys you

More qualified eyes, faster. And when demand shows up early, you negotiate from strength. That's how homes sell over ask — not by luck, but by exposure.

Thinking of selling? [Let's talk](/contact).`,
      zh: `两套一模一样的房子，成交可能差上几周、差出真金白银。差别很少在房子本身，而在于：到底有多少"对的人"看见过它。

## MLS 是地板，不是天花板

挂上 MLS 只是入场券。它让你的房子出现在经纪人和门户网站面前。但那些夜里刷视频、通过内容认识社区的买家——他们可不会去刷新 MLS。

## Homix 的不同

我们生来就是一家"会卖房的媒体公司"。每一套房源都会得到：

- 一支专业制作的**视频带看**与 **Reels**，按人们真正的观看习惯剪辑。
- 投放给一个**100 万+**、本就关注纽约地产的受众。
- 像做营销一样被衡量的投放——触达、收藏、咨询——而不只是院子里插块牌子。

## 这能为你带来什么

更多、更快的精准目光。当需求早早出现，你就能从强势的一方谈判。房子之所以能卖超挂牌价，靠的不是运气，而是曝光。

在考虑卖房？[聊聊看](/contact)。`,
    },
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}
