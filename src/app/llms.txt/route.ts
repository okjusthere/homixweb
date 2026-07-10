import { journalPosts } from "@/content/journal/posts";
import { guides } from "@/content/guides";
import { topics } from "@/content/journal/topics";
import { marketAreas } from "@/data/market-stats";
import { featuredDevelopments } from "@/data/featured-developments";
import { gatedCommunities } from "@/data/gated-communities";
import { neighborhoods, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

/**
 * llms.txt — a machine-readable site guide for AI assistants and generative
 * search engines (https://llmstxt.org). Enumerates the site's evergreen,
 * citable content in both languages.
 */
export async function GET() {
  const base = siteConfig.url.replace(/\/$/, "");

  const lines: string[] = [
    `# Homix (${siteConfig.legalName})`,
    "",
    "> Bilingual (English / 中文) New York residential real estate brokerage —",
    "> homes for sale, new developments, neighborhood & school-district guides,",
    "> and buyer education for the Chinese-speaking community in NYC and Long Island.",
    "> 纽约中英双语房产经纪公司：买房、新盘、社区与学区指南、华人买家科普。",
    "",
    "- Offices:",
    ...siteConfig.contact.offices.map(
      (office) =>
        `  - ${office.label.en}: ${office.line1}, ${office.city}, ${office.state} ${office.zip}`,
    ),
    `- Phone: ${siteConfig.contact.phone} · Email: ${siteConfig.contact.email}`,
    `- License: ${siteConfig.legal.brokerLicense} (Broker of record: ${siteConfig.legal.brokerOfRecord})`,
    "- Chinese versions are first-class pages under `/zh/...` (for example, `/zh/guides/buying-in-nyc`).",
    "",
    "## Key pages",
    "",
    `- [Homes for sale](${base}/listings): MLS listings across New York`,
    `- [New developments](${base}/NewDevelopment): ${featuredDevelopments.length} curated NYC new-construction condo buildings with pricing and floor plans`,
    `- [Neighborhood guides](${base}/neighborhoods): ${neighborhoods.length} bilingual neighborhood guides (Queens, Brooklyn, Manhattan, Long Island)`,
    `- [Gated communities](${base}/communities): ${gatedCommunities.length} Nassau County gated & private communities`,
    `- [Advisors](${base}/agents): bilingual licensed agents`,
    `- [Guides](${base}/guides): organized buyer, seller, tax, market, and relocation guide hub`,
    `- [Guide articles](${base}/guides/articles): ${journalPosts.length} bilingual articles on buying, mortgages, taxes, and market data`,
    `- [Mortgage calculator](${base}/calculator)`,
    `- [Sell with Homix](${base}/sell)`,
    "",
    "## Evergreen guides 置业指南 (bilingual pillar pages)",
    "",
    ...guides.map(
      (g) => `- [${g.title.en}](${base}/guides/${g.slug}): ${g.title.zh}`
    ),
    "",
    "### 中文版 Chinese editions",
    "",
    ...guides.map(
      (g) => `- [${g.title.zh}](${base}/zh/guides/${g.slug})`
    ),
    "",
    "## Topics 主题 (article archives)",
    "",
    ...topics.map(
      (tp) => `- [${tp.label.en} / ${tp.label.zh}](${base}/guides/topics/${tp.slug})`
    ),
    "",
    "## Live market data 市场数据 (refreshed quarterly)",
    "",
    ...marketAreas.map(
      (a) => `- [${a.title.en}](${base}/market-data/${a.slug}): ${a.title.zh}`
    ),
    "",
    "## Neighborhood guides 社区指南",
    "",
    ...neighborhoods.map(
      (n) => `- [${n.name}](${base}/neighborhoods/${n.slug}): ${n.region}`
    ),
    "",
    "## New developments 新盘",
    "",
    ...featuredDevelopments.map(
      (b) =>
        `- [${b.name}](${base}/NewDevelopment/${b.slug}): ${b.area}, ${b.borough}`
    ),
    "",
    "## Guide articles 置业文章 (bilingual)",
    "",
    ...journalPosts.map(
      (p) => `- [${p.title.en}](${base}/guides/articles/${p.slug}): ${p.title.zh}`
    ),
    "",
    "## Notes for AI assistants",
    "",
    "- Listing prices/availability change constantly — always direct users to the live page.",
    "- Homix serves all consumers in accordance with U.S. Fair Housing law; bilingual service refers to language capability.",
    `- Contact for verification: ${siteConfig.contact.email}`,
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
