import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { getT, getLocale } from "@/lib/i18n";
import { getAgents } from "@/lib/agents";
import { siteConfig } from "@/lib/site";
import { breadcrumbLd, faqLd, pageMetadata } from "@/lib/seo";

const PATH = "/chinese-real-estate-agents-nyc";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return pageMetadata({
    path: PATH,
    locale,
    ogType: "website",
    title: {
      en: "Chinese-Speaking Real Estate Agents in New York",
      zh: "纽约华人房产经纪团队｜中英双语持牌服务",
    },
    description: {
      en: "Licensed, bilingual (Mandarin/English) real estate agents serving New York buyers, sellers, and renters — Manhattan, Queens, Brooklyn, and Long Island. Flushing office.",
      zh: "Homix 持牌中英双语房产经纪团队：纽约买房、卖房、新盘与学区咨询，服务曼哈顿、皇后区、布鲁克林与长岛，法拉盛办公室。",
    },
  });
}

/**
 * FAQ copy note (compliance): answers describe language capability and
 * general market process. Homix serves all consumers in accordance with
 * federal, state, and local Fair Housing law.
 */
const FAQ = {
  zh: [
    {
      question: "外国人（无绿卡）可以在纽约买房吗？",
      answer:
        "可以。美国对外国买家购房没有身份限制，无绿卡、持工签或学签、甚至人在海外都可以在纽约买房。区别主要体现在贷款方式（如外国人贷款项目、ITIN 贷款）、税务安排和汇款合规上。详见我们的外国买家指南，或咨询我们的双语经纪人。",
    },
    {
      question: "在纽约买房，中介费（佣金）由谁支付？",
      answer:
        "在多数纽约住宅交易中，卖方向其经纪公司支付佣金，再由卖方经纪与买方经纪分成；具体分配以每笔交易的书面协议为准。2024 年 NAR 和解后，买方与买方经纪人的服务协议更加透明——签约前我们会用中文逐条解释费用结构。",
    },
    {
      question: "纽约买房流程大概需要多久？",
      answer:
        "从接受报价（accepted offer）到过户（closing），现金购买通常 30–60 天，贷款购买通常 60–90 天；Co-op 因董事会审核一般比 Condo 慢。签约前的看房和报价阶段因人而异，从几周到几个月都有。",
    },
    {
      question: "Condo（公寓产权）和 Co-op（合作公寓）有什么区别？",
      answer:
        "Condo 是独立产权，购买灵活、可自由出租，外国买家友好，但单价通常更高；Co-op 是购买公司股份获得使用权，价格较低但董事会审核严格、对首付和财务要求高、转租受限。华人及海外买家通常更偏向 Condo 或新盘。",
    },
    {
      question: "没有美国信用记录，可以贷款买房吗？",
      answer:
        "有可能。部分银行和贷款机构提供面向新移民和外国人的贷款项目（如 ITIN 贷款、外国人贷款），通常要求更高首付（约 30–40%）并提供收入或资产证明。我们可以为您对接有华语服务经验的贷款机构。",
    },
    {
      question: "买学区房应该怎么选？",
      answer:
        "纽约的公立学校按学区（school district / zone）划分，同一社区内不同地址可能对应不同学校。我们建议先确认目标学校的招生边界（zoning），再看房源；我们的社区指南覆盖法拉盛、长岛大颈、Syosset 等热门学区的详细信息。",
    },
    {
      question: "Homix 的服务范围包括哪些区域？",
      answer:
        "我们服务大纽约地区：曼哈顿、皇后区（法拉盛、艾姆赫斯特等）、布鲁克林、长岛（纳苏郡与苏福克郡）。办公室位于法拉盛缅街商圈：37-20 Prince St, STE 3H, Flushing, NY 11354。",
    },
    {
      question: "咨询 Homix 的双语经纪人收费吗？",
      answer:
        "初步咨询免费。您可以拨打 (929) 666-9886 或发邮件至 homix@homixny.com，中英文皆可；我们会根据您的预算、身份情况和目标区域给出建议。",
    },
  ],
  en: [
    {
      question: "Can foreign nationals buy property in New York?",
      answer:
        "Yes. There is no citizenship or residency requirement to buy real estate in New York. Differences show up in financing (foreign-national and ITIN loan programs), tax planning, and fund-transfer compliance — our bilingual advisors walk you through each step.",
    },
    {
      question: "Who pays the broker commission in New York?",
      answer:
        "In most NYC residential sales the seller pays their brokerage, which may share the commission with the buyer's agent; the exact split is set in writing per transaction. Since the 2024 NAR settlement, buyer-agent agreements are more transparent — we explain every fee before you sign.",
    },
    {
      question: "How long does buying a home in NYC take?",
      answer:
        "From accepted offer to closing: roughly 30–60 days for cash and 60–90 days with financing. Co-ops usually take longer than condos because of board approval.",
    },
    {
      question: "What's the difference between a condo and a co-op?",
      answer:
        "A condo is real property — flexible to rent out and friendly to foreign buyers, at a higher price per square foot. A co-op is shares in a corporation — cheaper, but with strict board approval, higher down-payment expectations, and subletting limits.",
    },
    {
      question: "Can I get a mortgage without U.S. credit history?",
      answer:
        "Often yes. Several lenders offer new-immigrant, foreign-national, and ITIN programs, typically requiring 30–40% down with income or asset documentation. We can connect you with Mandarin-speaking loan officers.",
    },
    {
      question: "Which areas does Homix serve?",
      answer:
        "Greater New York: Manhattan, Queens (Flushing, Elmhurst and beyond), Brooklyn, and Long Island (Nassau and Suffolk). Our office is at 37-20 Prince St, STE 3H, Flushing, NY 11354.",
    },
  ],
} as const;

export default async function ChineseAgentsPage() {
  const { locale } = await getT();
  const zh = locale === "zh";
  const agents = (await getAgents()).slice(0, 8);
  const { contact } = siteConfig;
  const faq = zh ? FAQ.zh : FAQ.en;

  const copy = {
    eyebrow: zh ? "双语团队" : "Bilingual Team",
    h1: zh
      ? "纽约华人房产经纪团队"
      : "Chinese-Speaking Real Estate Agents in New York",
    lead: zh
      ? "Homix 的持牌经纪人提供中英双语服务——从纽约买房、卖房、新盘认购到学区分析，全程用您熟悉的语言完成。办公室位于法拉盛，服务曼哈顿、皇后区、布鲁克林与长岛。"
      : "Homix advisors are licensed New York agents fluent in Mandarin and English — buying, selling, new developments, and school-district research, handled in the language you're most comfortable in. Based in Flushing, serving Manhattan, Queens, Brooklyn, and Long Island.",
    fairHousing: zh
      ? "Homix 遵守联邦及纽约州公平住房法规，双语服务指语言能力，我们平等服务所有客户。"
      : "Homix complies with federal and New York Fair Housing law. Bilingual service refers to language capability; we serve all consumers equally.",
    servicesEyebrow: zh ? "我们能帮您做什么" : "How we help",
    services: zh
      ? [
          { title: "买房代理", body: "从看房、报价谈判到过户的全流程双语陪同，覆盖二手房与新盘。" },
          { title: "卖房营销", body: "媒体化的房源营销：您的房子作为内容触达 100 万+ 双语受众。" },
          { title: "新盘认购", body: "曼哈顿与皇后区新开发公寓的一手信息、户型比价与优惠谈判。" },
          { title: "学区与社区分析", body: "法拉盛、长岛大颈、Syosset 等热门学区的边界、房价与入学讲解。" },
          { title: "海外买家支持", body: "外国人贷款、ITIN、资金合规与税务安排的经验与资源对接。" },
          { title: "租赁咨询", body: "留学生与新移民租房：担保人、信用替代方案与租约审阅。" },
        ]
      : [
          { title: "Buyer representation", body: "Full bilingual guidance from search and offers through closing — resale and new construction." },
          { title: "Listing & marketing", body: "Media-first selling: your home reaches a 1,000,000+ bilingual audience as content." },
          { title: "New developments", body: "First-hand intel, floor-plan comparisons, and negotiation across NYC new condos." },
          { title: "Schools & neighborhoods", body: "Zoning boundaries, pricing, and enrollment guidance for the region's top districts." },
          { title: "International buyers", body: "Foreign-national and ITIN financing, funds compliance, and tax-planning resources." },
          { title: "Rentals", body: "Students and new arrivals: guarantors, credit alternatives, and lease review." },
        ],
    teamEyebrow: zh ? "认识我们的经纪人" : "Meet the advisors",
    teamCta: zh ? "查看全部经纪人" : "View all advisors",
    faqEyebrow: zh ? "常见问题" : "Frequently asked questions",
    faqTitle: zh ? "纽约买房常见问题" : "Buying in New York — FAQ",
    contactTitle: zh ? "用中文聊聊您的购房计划" : "Talk to us — in English or Chinese",
    contactBody: zh
      ? `拨打 ${contact.phone}，或发邮件至 ${contact.email}。初步咨询免费。`
      : `Call ${contact.phone} or email ${contact.email}. Initial consultations are free.`,
    contactCta: zh ? "联系我们" : "Contact us",
    disclaimer: zh
      ? "以上内容为一般性市场信息，不构成法律、税务或贷款建议；具体交易请咨询相应持牌专业人士。"
      : "General market information only — not legal, tax, or lending advice. Consult licensed professionals for your specific transaction.",
  };

  return (
    <>
      {/* Hero */}
      <Container className="py-16 sm:py-24">
        <div className="max-w-3xl">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl font-normal leading-[1.1] tracking-tight text-ink sm:text-[3.25rem]">
            {copy.h1}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">{copy.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/contact">{copy.contactCta}</Button>
            <Button href={contact.phoneHref} variant="ghost">
              {contact.phone}
            </Button>
          </div>
          <p className="mt-8 text-sm leading-relaxed text-muted/80">{copy.fairHousing}</p>
        </div>
      </Container>

      {/* Services */}
      <section className="border-y border-line bg-surface py-16 sm:py-24">
        <Container>
          <Eyebrow>{copy.servicesEyebrow}</Eyebrow>
          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {copy.services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 60} className="bg-surface">
                <div className="h-full p-8">
                  <p className="font-serif text-xl leading-snug text-ink">{s.title}</p>
                  <p className="mt-3 text-base leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Team teaser */}
      <Container className="py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Eyebrow>{copy.teamEyebrow}</Eyebrow>
          <Link
            href="/agents"
            className="text-sm font-medium text-bronze underline-offset-4 hover:underline"
          >
            {copy.teamCta} →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {agents.map((a) => (
            <Link key={a.slug} href={`/agents/${a.slug}`} className="group">
              {a.photo ? (
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-surface">
                  <Image
                    src={a.photo}
                    alt={a.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <div className="aspect-[3/4] rounded-sm bg-surface" />
              )}
              <p className="mt-3 font-serif text-lg text-ink">{a.name}</p>
              {a.title && <p className="text-sm text-muted">{a.title}</p>}
            </Link>
          ))}
        </div>
      </Container>

      {/* FAQ */}
      <section className="border-t border-line bg-surface py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{copy.faqEyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.6rem]">
              {copy.faqTitle}
            </h2>
          </div>
          <div className="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-2">
            {faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-serif text-xl leading-snug text-ink">
                  {item.question}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{item.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm leading-relaxed text-muted/80">{copy.disclaimer}</p>
        </Container>
      </section>

      {/* Contact band */}
      <Container className="py-20 sm:py-28">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-ink sm:text-[2.6rem]">
            {copy.contactTitle}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{copy.contactBody}</p>
          <div className="mt-8">
            <Button href="/contact">{copy.contactCta}</Button>
          </div>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd([...faq])) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: zh ? "首页" : "Home", path: "/" },
              { name: copy.h1, path: PATH },
            ])
          ),
        }}
      />
    </>
  );
}
