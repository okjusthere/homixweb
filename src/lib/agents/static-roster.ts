/**
 * Static Homix advisor roster used only when Supabase is not configured.
 * Listing data must come from BBO and must not import this file.
 */

import { REAL_BIOS } from "@/data/agent-bios";
import type { Agent } from "@/lib/listings/types";

export const STATIC_AGENTS: Agent[] = [
  {
    id: "sunny",
    slug: "sunny",
    name: "Si Zhang (Sunny)",
    title: "Founder · Licensed Real Estate Broker",
    photo:
      "/agents/sunny.jpg",
    phone: "929-666-8268",
    email: "sunnyz@homixny.com",
    bio: "Founder of Homix. A top-producing New York broker who began in real estate in 2013, ranked third nationwide at Sunac China, and built a 400K+ personal social following before founding Homix in 2025 to merge professional brokerage with influential digital media.",
    specialties: ["Founder", "Media & branding", "Luxury / new development"],
    profileUrl: "https://www.homixny.com/agents/sunny",
    social: {
      douyin: "https://v.douyin.com/3ye-M8fQ41U/",
      xiaohongshu:
        "https://www.xiaohongshu.com/user/profile/653db5b50000000030031376",
    },
  },
  {
    id: "heidi",
    slug: "heidi",
    name: "Heidi Liu",
    title: "Co-Founder · Licensed Associate Real Estate Broker · Branch Manager",
    photo:
      "/agents/heidi.jpg",
    phone: "516-988-8668",
    email: "heidi@homixny.com",
    bio: "Associate Real Estate Broker, Branch Manager, and Co-Founder of Homix. With 13+ years full-time in New York real estate, Heidi is known for market expertise, relentless follow-up, and a long record of Top Producer awards across Long Island and Queens.",
    specialties: ["Associate Broker / Co-Founder", "Long Island & Queens", "Investors"],
    profileUrl: "https://www.homixny.com/agents/heidi",
  },
  {
    id: "queenie",
    slug: "queenie",
    name: "Queenie Zhuang",
    title: "Co-Founder · Licensed Real Estate Salesperson",
    photo:
      "/agents/queenie.jpg",
    phone: "917-569-8899",
    email: "queenie928@homixny.com",
    bio: "Co-Founder. Blending high-end hospitality and new-media innovation, Queenie specializes in premium service and full-scope personal-brand (IP) development for professionals.",
    specialties: ["Luxury service", "New media", "Personal IP"],
    profileUrl: "https://www.homixny.com/agents/queenie",
  },
  {
    id: "michelleli",
    slug: "michelleli",
    name: "Michelle Li",
    title: "Licensed Real Estate Salesperson",
    photo:
      "/agents/michelleli.jpg",
    phone: "929-530-8999",
    email: "michelleli@homixny.com",
    bio: "Senior agent serving Queens, Manhattan, LIC, and Long Island. In real estate since 2019 with multi-million annual sales, bilingual in Mandarin and English.",
    specialties: ["Queens & Manhattan", "LIC & Long Island", "Bilingual"],
    profileUrl: "https://www.homixny.com/agents/michelleli",
  },
  {
    id: "yanxue",
    slug: "yanxue",
    name: "Christina (Yan Xue) Zheng",
    title: "Licensed Associate Real Estate Broker",
    // Correct photo supplied by client — replace public/agents/yanxue.jpg to update.
    photo: "/agents/yanxue.jpg",
    phone: "917-836-1628",
    email: "chrisinanyrealtor@gmail.com",
    bio: "Associate Broker with nearly a decade in the business and a passion for staging, design, and photography — a perennial top-10 agent at her firm.",
    specialties: ["Associate Broker", "Staging & design", "Investors"],
    profileUrl: "https://www.homixny.com/agents/yanxue",
  },
  {
    id: "linafeng",
    slug: "linafeng",
    name: "Lina Feng",
    title: "Licensed Real Estate Salesperson",
    photo:
      "/agents/linafeng.jpg",
    phone: "929-598-1616",
    email: "LinaFeng1616@gmail.com",
    bio: "Nearly 20 years in real estate, from a listed China developer to the New York market — buying, selling, leasing, investment, and asset management.",
    specialties: ["Investment", "Commercial", "Asset management"],
    profileUrl: "https://www.homixny.com/agents/linafeng",
  },
  {
    id: "jingjingfeng",
    slug: "jingjingfeng",
    name: "Jingjing Feng",
    title: "Licensed Real Estate Salesperson",
    photo:
      "/agents/jingjingfeng.jpg",
    phone: "914-365-9887",
    email: "jjfeng.homix@gmail.com",
    bio: "Long Island specialist focused on luxury homes, boutique rentals, and cross-border investment, with a decade in top luxury brands before real estate.",
    specialties: ["Long Island", "Luxury homes", "Cross-border investment"],
    profileUrl: "https://www.homixny.com/agents/jingjingfeng",
  },
  {
    id: "kevinnli",
    slug: "kevinnli",
    name: "Kevinn Li",
    title: "Licensed Real Estate Salesperson · Director, Sona Media",
    photo:
      "/agents/kevinnli.jpg",
    phone: "",
    email: "",
    bio: "Licensed agent and Director at Sona Media — a one-stop visual marketing solution: professional photography, video walk-throughs, drone aerials, and virtual staging.",
    specialties: ["Visual marketing", "Video & drone", "Long Island"],
    profileUrl: "https://www.homixny.com/agents/kevinnli",
  },
  {
    id: "emmaniu",
    slug: "emmaniu",
    name: "Emma (Qian) Niu",
    title: "Licensed Real Estate Salesperson",
    photo:
      "/agents/emmaniu.jpg",
    phone: "631-339-3366",
    email: "reproperty.emma@gmail.com",
    bio: "Licensed New York agent with a strong administrative and client-service background, known for organization, communication, and careful attention to detail.",
    specialties: ["Client service", "First-time buyers"],
    profileUrl: "https://www.homixny.com/agents/emmaniu",
  },
  {
    id: "zoeyzhang",
    slug: "zoeyzhang",
    name: "Zoey (Zhijun) Zhang",
    title: "Licensed Real Estate Salesperson",
    photo:
      "/agents/zoeyzhang.jpg",
    phone: "319-512-4187",
    email: "zoey@homixny.com",
    bio: "Licensed New York agent who pairs a client-service background with Homix's data-driven, media-forward approach to help clients navigate the market with confidence.",
    specialties: ["Client service", "First-time buyers"],
    profileUrl: "https://www.homixny.com/agents/zoeyzhang",
  },
  // --- Salespeople (basic info migrated; bios to be added) ------------------
  { id: "gracexia", slug: "gracexia", name: "Grace (Jiaer) Xia", title: "Licensed Real Estate Salesperson", photo: "/agents/gracexia.jpg", phone: "347-475-7777", email: "gracex@homixny.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/gracexia" },
  { id: "davidwang", slug: "davidwang", name: "David (Wei) Wang", title: "Licensed Real Estate Salesperson", photo: "/agents/davidwang.jpg", phone: "929-770-6688", email: "agentdavidwang@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/davidwang" },
  { id: "shellylin", slug: "shellylin", name: "Shelly (Xuehui) Lin", title: "Licensed Real Estate Salesperson", photo: "/agents/shellylin.jpg", phone: "917-251-7918", email: "shellylin8209@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/shellylin" },
  { id: "charlottezhang", slug: "charlottezhang", name: "Charlotte Zhang", title: "Licensed Real Estate Salesperson", photo: "/agents/charlottezhang.jpg", phone: "929-888-9996", email: "zhangkun01381@hotmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/charlottezhang" },
  { id: "dannyhan", slug: "dannyhan", name: "Danny Han", title: "Licensed Real Estate Salesperson", photo: "/agents/dannyhan.jpg", phone: "917-519-0227", email: "donghan970@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/dannyhan" },
  { id: "zoeyzhao", slug: "zoeyzhao", name: "Zoey (Kai) Zhao", title: "Licensed Real Estate Salesperson", photo: "/agents/zoeyzhao.jpg", phone: "646-937-3683", email: "zoeyzhao3683@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/zoeyzhao" },
  { id: "tiffanywang", slug: "tiffanywang", name: "Tiffany Wang", title: "Licensed Real Estate Salesperson", photo: "/agents/tiffanywang.jpg", phone: "646-982-9222", email: "Tiffany.Homix@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/tiffanywang" },
  { id: "ryanhe", slug: "ryanhe", name: "Ryan (Dongjian) He", title: "Licensed Real Estate Salesperson", photo: "/agents/ryanhe.jpg", phone: "510-936-3220", email: "Ryan.he.realtor@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/ryanhe" },
  { id: "waynelu", slug: "waynelu", name: "Wayne (Wenquan) Lu", title: "Licensed Real Estate Salesperson", photo: "/agents/waynelu.jpg", phone: "917-365-7355", email: "WQLEuu@yahoo.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/waynelu" },
  { id: "sandyguan", slug: "sandyguan", name: "Sandy (Shanshan) Guan", title: "Licensed Real Estate Salesperson", photo: "/agents/sandyguan.jpg", phone: "646-894-6966", email: "sguan100@yahoo.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/sandyguan" },
  { id: "lilyliang", slug: "lilyliang", name: "Lily (Yiyang) Liang", title: "Licensed Real Estate Salesperson", photo: "/agents/lilyliang.webp", phone: "917-543-0322", email: "lilyyiyanghe@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/lilyliang" },
  { id: "dizhang", slug: "dizhang", name: "Di Zhang", title: "Licensed Real Estate Salesperson", photo: "/agents/dizhang.jpg", phone: "929-899-6868", email: "zhangdidd@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/dizhang" },
  { id: "rachelma", slug: "rachelma", name: "Rachel (Xiaoqian) Ma", title: "Licensed Real Estate Salesperson", photo: "/agents/rachelma.jpg", phone: "516-513-2468", email: "rmanyrealtor@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/rachelma" },
  { id: "queeniecheung", slug: "queeniecheung", name: "Queenie Cheung", title: "Licensed Real Estate Salesperson", photo: "/agents/queeniecheung.jpg", phone: "917-815-4822", email: "queeniecwhomix@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/queeniecheung" },
  { id: "yukizhang", slug: "yukizhang", name: "Yuki (Yan) Zhang", title: "Licensed Real Estate Salesperson", photo: "/agents/yukizhang.jpg", phone: "917-783-0806", email: "zhangyan14105@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/yukizhang" },
  { id: "angelalin", slug: "angelalin", name: "Angela (Jianxiu) Lin", title: "Licensed Real Estate Salesperson", photo: "/agents/angelalin.jpg", phone: "516-989-8588", email: "angelacomm688@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/angelalin" },
  { id: "davidhu", slug: "davidhu", name: "David Hu", title: "Licensed Real Estate Salesperson", photo: "/agents/davidhu.jpg", phone: "516-373-4779", email: "david.homix@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/davidhu" },
  { id: "kylehuang", slug: "kylehuang", name: "Kyle (Huizhong) Huang", title: "Licensed Real Estate Salesperson", photo: "/agents/kylehuang.jpg", phone: "347-637-9380", email: "homix.realty.kyle@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/kylehuang" },
  { id: "xueyaozou", slug: "xueyaozou", name: "Xueyao Zou", title: "Licensed Real Estate Salesperson", photo: "/agents/xueyaozou.png", phone: "", email: "xyzou98@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/xueyaozou" },
  { id: "shawnzhang", slug: "shawnzhang", name: "Shawn (Xiaoyi) Zhang", title: "Licensed Real Estate Salesperson", photo: "/agents/shawnzhang.png", phone: "201-889-0333", email: "shawnxiao1987@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/shawnzhang" },
  { id: "bingwu", slug: "bingwu", name: "Bing Wu", title: "Licensed Real Estate Salesperson (NY) · Broker (CA)", photo: "/agents/bingwu.jpg", phone: "951-733-8143", email: "bingwu.bwc@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/bingwu" },
  { id: "ericwei", slug: "ericwei", name: "Eric (Zhengle) Wei", title: "Licensed Real Estate Salesperson", photo: "/agents/ericwei.jpg", phone: "929-367-8402", email: "eric.wei@homixny.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/ericwei" },
  { id: "jaydoncai", slug: "jaydoncai", name: "Jaydon (Congyuan) Cai", title: "Licensed Real Estate Salesperson", photo: "/agents/jaydoncai.png", phone: "917-285-3491", email: "jaydoncai66@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/jaydoncai" },
  { id: "stevenchang", slug: "stevenchang", name: "Steven Chang", title: "Licensed Real Estate Salesperson", photo: "/agents/stevenchang.jpg", phone: "718-669-1534", email: "stevenchang2000@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/stevenchang" },
  { id: "junlincao", slug: "junlincao", name: "Junlin Cao", title: "Licensed Real Estate Salesperson", photo: "/agents/junlincao.jpg", phone: "", email: "caojunlin6699@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/junlincao" },
  { id: "reannechen", slug: "reannechen", name: "Reanne Chen", title: "Licensed Real Estate Salesperson", photo: "/agents/reannechen.png", phone: "347-255-4770", email: "reanne3@hotmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/reannechen" },
  { id: "pengxuhu", slug: "pengxuhu", name: "Pengxu Hu", title: "Licensed Real Estate Salesperson", photo: "/agents/pengxuhu.jpg", phone: "929-338-3555", email: "pengxuhu@yahoo.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/pengxuhu" },
  { id: "jorcylu", slug: "jorcylu", name: "Jorcy (Jueyao) Lu", title: "Licensed Real Estate Salesperson", photo: "/agents/jorcylu.jpg", phone: "917-821-5179", email: "jorcy@homixny.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/jorcylu" },
  { id: "chunchinyang", slug: "chunchinyang", name: "Chun Chin Yang", title: "Licensed Real Estate Salesperson", photo: "/agents/chunchinyang.png", phone: "917-355-5190", email: "ccy1368@outlook.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/chunchinyang" },
  { id: "yukeyhoo", slug: "yukeyhoo", name: "Yukey Hoo", title: "Licensed Real Estate Salesperson", photo: "/agents/yukeyhoo.png", phone: "407-937-8888", email: "", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/yukeyhoo" },
  // --- Added from the OneKey MLS office roster (not on the legacy site).
  // Replace public/agents/<slug>.jpg with real photos; add contact details as available.
  { id: "winarkotanumiharjo", slug: "winarkotanumiharjo", name: "Winarko Tanumiharjo", title: "Licensed Real Estate Salesperson", photo: "/agents/winarkotanumiharjo.jpg", phone: "", email: "", bio: "", specialties: [] },
  { id: "yufeiwang", slug: "yufeiwang", name: "Yufei Wang", title: "Licensed Real Estate Salesperson", photo: "/agents/yufeiwang.jpg", phone: "", email: "", bio: "", specialties: [] },
  { id: "yilinwang", slug: "yilinwang", name: "Yilin Wang", title: "Licensed Real Estate Salesperson", photo: "/agents/yilinwang.jpg", phone: "", email: "", bio: "", specialties: [] },
  { id: "evama", slug: "evama", name: "Eva Y. Ma", title: "Licensed Real Estate Salesperson", photo: "/agents/evama.jpg", phone: "", email: "", bio: "", specialties: [] },
  { id: "qinghe", slug: "qinghe", name: "Qing He", title: "Licensed Real Estate Salesperson", photo: "/agents/qinghe.jpg", phone: "", email: "", bio: "", specialties: [] },
  { id: "defenghuang", slug: "defenghuang", name: "Defeng Huang", title: "Licensed Real Estate Salesperson", photo: "/agents/defenghuang.jpg", phone: "", email: "", bio: "", specialties: [] },
  { id: "yixianli", slug: "yixianli", name: "Yixian Li", title: "Licensed Real Estate Salesperson", photo: "/agents/yixianli.jpg", phone: "", email: "", bio: "", specialties: [] },
  { id: "yinchunwu", slug: "yinchunwu", name: "Yinchun Wu", title: "Licensed Real Estate Salesperson", photo: "/agents/yinchunwu.jpg", phone: "", email: "", bio: "", specialties: [] },
  { id: "jinxiuyang", slug: "jinxiuyang", name: "Jinxiu Yang", title: "Licensed Real Estate Salesperson", photo: "/agents/jinxiuyang.jpg", phone: "", email: "", bio: "", specialties: [] },
  { id: "honglongchen", slug: "honglongchen", name: "Honglong Chen", title: "Licensed Real Estate Salesperson", photo: "/agents/honglongchen.jpg", phone: "", email: "", bio: "", specialties: [] },
];

// Overlay real bios scraped verbatim from homixny.com (only agents that have one).
for (const agent of STATIC_AGENTS) {
  const real = REAL_BIOS[agent.slug];
  if (real) {
    agent.bio = real.bio;
    if (real.specialties.length) agent.specialties = real.specialties;
  }
}
