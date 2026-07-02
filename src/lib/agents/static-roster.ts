/**
 * Static Homix advisor roster used only when Supabase is not configured.
 * Listing data must come from BBO and must not import this file.
 */

import { REAL_BIOS } from "@/data/agent-bios";
import type { Agent } from "@/lib/listings/types";

const PLACEHOLDER_PORTRAIT = "/agent-placeholder-logo.png";

export const STATIC_AGENTS: Agent[] = [
  {
    id: "sunny",
    slug: "sunny",
    name: "Si Zhang (Sunny)",
    title: "Founder · Licensed Real Estate Broker",
    photo:
      "https://static1.squarespace.com/static/686fe7f9a969e208b5dce2a0/t/68e7219b0c15f80109a40192/1759977883279/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2025-07-11_221820_990.jpg?format=1500w",
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
      "https://static1.squarespace.com/static/686fe7f9a969e208b5dce2a0/t/68e71c9abfacfd51a5dec3e6/1767633730997/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2025-07-11_222016_452.jpg?format=1500w",
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
      "https://static1.squarespace.com/static/686fe7f9a969e208b5dce2a0/t/68e721750c15f80109a4017b/1759977845630/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2025-07-12_232745_245.jpg?format=1500w",
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
      "https://static1.squarespace.com/static/686fe7f9a969e208b5dce2a0/t/68e721c81f47a440c1788cb7/1759977928977/Weixin+Image_2025-09-06_172942_515.jpg?format=1500w",
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
      "https://static1.squarespace.com/static/686fe7f9a969e208b5dce2a0/t/68e71fc2e89d27768f7bb85b/1759977410342/Weixin+Image_2025-10-08_222946_954.png?format=1500w",
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
      "https://static1.squarespace.com/static/686fe7f9a969e208b5dce2a0/t/68e72131e89d27768f7bb91c/1759977777785/Weixin+Image_2025-09-10_144721_328.jpg?format=1500w",
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
      "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/8c3129fa-2527-4a37-ab9e-3cfed511771d/3a3312b2a0f76d424740b7f6de1a1b16?format=1500w",
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
      "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/7fcb244c-121b-4d06-89fe-272e3ba4e446/Weixin+Image_20260409112358_28_8?format=1500w",
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
      "https://static1.squarespace.com/static/686fe7f9a969e208b5dce2a0/t/69fa178bcfa3e81e12d7728c/1777997707432/91d721c1f8e121f84c3834667d60ee99.jpg?format=1500w",
    phone: "319-512-4187",
    email: "zoey@homixny.com",
    bio: "Licensed New York agent who pairs a client-service background with Homix's data-driven, media-forward approach to help clients navigate the market with confidence.",
    specialties: ["Client service", "First-time buyers"],
    profileUrl: "https://www.homixny.com/agents/zoeyzhang",
  },
  // --- Salespeople (basic info migrated; bios to be added) ------------------
  { id: "gracexia", slug: "gracexia", name: "Grace (Jiaer) Xia", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/1eb7f335-eb52-4951-8b18-df1f5725135d/grace.jpg", phone: "347-475-7777", email: "gracex@homixny.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/gracexia" },
  { id: "davidwang", slug: "davidwang", name: "David (Wei) Wang", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/a00ceeee-690e-4710-9570-7aba43784dc9/davidwang.jpg", phone: "929-770-6688", email: "agentdavidwang@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/davidwang" },
  { id: "shellylin", slug: "shellylin", name: "Shelly (Xuehui) Lin", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/5fd45dfb-c3f8-4728-b74a-af73c517152f/shelly.jpg", phone: "917-251-7918", email: "shellylin8209@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/shellylin" },
  { id: "charlottezhang", slug: "charlottezhang", name: "Charlotte Zhang", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/126a8712-541d-493d-99e5-7dff3d8e0f68/charlottezhang.jpg", phone: "929-888-9996", email: "zhangkun01381@hotmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/charlottezhang" },
  { id: "dannyhan", slug: "dannyhan", name: "Danny Han", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/4f87d970-7e21-4cc5-b4d8-18b3a7ca3594/dannyhan.jpg", phone: "917-519-0227", email: "donghan970@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/dannyhan" },
  { id: "zoeyzhao", slug: "zoeyzhao", name: "Zoey (Kai) Zhao", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/79dfcb01-20c7-4fec-9cf7-faf1c04790f2/zoeyzhao.jpg", phone: "646-937-3683", email: "zoeyzhao3683@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/zoeyzhao" },
  { id: "tiffanywang", slug: "tiffanywang", name: "Tiffany Wang", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/46f83245-ef47-4ae3-896c-0dd29849e61a/tiffanywang.jpg", phone: "646-982-9222", email: "Tiffany.Homix@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/tiffanywang" },
  { id: "ryanhe", slug: "ryanhe", name: "Ryan (Dongjian) He", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/69bb6ea2-0ef0-455a-9fa7-8f05100c3968/ryanhe.jpg", phone: "510-936-3220", email: "Ryan.he.realtor@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/ryanhe" },
  { id: "waynelu", slug: "waynelu", name: "Wayne (Wenquan) Lu", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/a8fedf9e-92ab-4492-9dc8-e78612e94375/waynelu.jpg", phone: "917-365-7355", email: "WQLEuu@yahoo.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/waynelu" },
  { id: "sandyguan", slug: "sandyguan", name: "Sandy (Shanshan) Guan", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/f1d7d514-2a07-4ab5-b727-ff6559f38581/sandyguan.jpg", phone: "646-894-6966", email: "sguan100@yahoo.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/sandyguan" },
  { id: "lilyliang", slug: "lilyliang", name: "Lily (Yiyang) Liang", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/c364b839-2235-4398-8ef2-2ab1a7f1e5ab/lilyliang.webp", phone: "917-543-0322", email: "lilyyiyanghe@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/lilyliang" },
  { id: "dizhang", slug: "dizhang", name: "Di Zhang", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/5c6db961-f9b7-4e75-bfb9-eea136ead8fa/dizhang.jpg", phone: "929-899-6868", email: "zhangdidd@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/dizhang" },
  { id: "rachelma", slug: "rachelma", name: "Rachel (Xiaoqian) Ma", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/a36da140-db2a-4d7e-9348-2eb79d35af2d/25f83d85-1281-490c-b14b-cba2b2ab9b2f.png", phone: "516-513-2468", email: "rmanyrealtor@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/rachelma" },
  { id: "queeniecheung", slug: "queeniecheung", name: "Queenie Cheung", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/c8619245-a19a-461a-9857-f3f8d4c03b5f/queeniecheung.jpg", phone: "917-815-4822", email: "queeniecwhomix@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/queeniecheung" },
  { id: "yukizhang", slug: "yukizhang", name: "Yuki (Yan) Zhang", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/0a208a00-9989-4df6-8731-1087768f114a/yukizhang.jpg", phone: "917-783-0806", email: "zhangyan14105@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/yukizhang" },
  { id: "angelalin", slug: "angelalin", name: "Angela (Jianxiu) Lin", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/62d15b1e-45b5-4c75-86fc-1324c8b720c6/angelalin.jpg", phone: "516-989-8588", email: "angelacomm688@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/angelalin" },
  { id: "davidhu", slug: "davidhu", name: "David Hu", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/d40dcbd8-ee60-4c3a-a00a-ae60025aa2c2/davidhu.jpg", phone: "516-373-4779", email: "david.homix@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/davidhu" },
  { id: "kylehuang", slug: "kylehuang", name: "Kyle (Huizhong) Huang", title: "Licensed Real Estate Salesperson", photo: "/agents/kylehuang.jpg", phone: "347-637-9380", email: "homix.realty.kyle@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/kylehuang" },
  { id: "xueyaozou", slug: "xueyaozou", name: "Xueyao Zou", title: "Licensed Real Estate Salesperson", photo: PLACEHOLDER_PORTRAIT, phone: "", email: "xyzou98@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/xueyaozou" },
  { id: "shawnzhang", slug: "shawnzhang", name: "Shawn (Xiaoyi) Zhang", title: "Licensed Real Estate Salesperson", photo: PLACEHOLDER_PORTRAIT, phone: "201-889-0333", email: "shawnxiao1987@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/shawnzhang" },
  { id: "bingwu", slug: "bingwu", name: "Bing Wu", title: "Licensed Real Estate Salesperson (NY) · Broker (CA)", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/c9db9f8e-2918-4b34-8f53-1898f08c6d51/bingwu.jpg", phone: "951-733-8143", email: "bingwu.bwc@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/bingwu" },
  { id: "ericwei", slug: "ericwei", name: "Eric (Zhengle) Wei", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/1e82a2dd-cf54-43eb-a555-07dd96b7771a/ericwei.jpg", phone: "929-367-8402", email: "eric.wei@homixny.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/ericwei" },
  { id: "jaydoncai", slug: "jaydoncai", name: "Jaydon (Congyuan) Cai", title: "Licensed Real Estate Salesperson", photo: PLACEHOLDER_PORTRAIT, phone: "917-285-3491", email: "jaydoncai66@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/jaydoncai" },
  { id: "stevenchang", slug: "stevenchang", name: "Steven Chang", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/7a8b040c-8dd5-4bed-90e9-0e7a6adc20be/stevenchang.jpg", phone: "718-669-1534", email: "stevenchang2000@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/stevenchang" },
  { id: "junlincao", slug: "junlincao", name: "Junlin Cao", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/40ddcd1b-888c-486f-a005-5f9180f9e285/chelsea.jpg", phone: "", email: "caojunlin6699@gmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/junlincao" },
  { id: "reannechen", slug: "reannechen", name: "Reanne Chen", title: "Licensed Real Estate Salesperson", photo: PLACEHOLDER_PORTRAIT, phone: "347-255-4770", email: "reanne3@hotmail.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/reannechen" },
  { id: "pengxuhu", slug: "pengxuhu", name: "Pengxu Hu", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/23d232f7-9129-42e9-9ad5-bad7b110c7c9/pengxuhu.jpg", phone: "929-338-3555", email: "pengxuhu@yahoo.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/pengxuhu" },
  { id: "jorcylu", slug: "jorcylu", name: "Jorcy (Jueyao) Lu", title: "Licensed Real Estate Salesperson", photo: "https://images.squarespace-cdn.com/content/v1/686fe7f9a969e208b5dce2a0/f14fd0c3-81dd-4300-8a8e-903ba953a7db/jorcylu.jpg", phone: "917-821-5179", email: "jorcy@homixny.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/jorcylu" },
  { id: "chunchinyang", slug: "chunchinyang", name: "Chun Chin Yang", title: "Licensed Real Estate Salesperson", photo: PLACEHOLDER_PORTRAIT, phone: "917-355-5190", email: "ccy1368@outlook.com", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/chunchinyang" },
  { id: "yukeyhoo", slug: "yukeyhoo", name: "Yukey Hoo", title: "Licensed Real Estate Salesperson", photo: PLACEHOLDER_PORTRAIT, phone: "407-937-8888", email: "", bio: "", specialties: [], profileUrl: "https://www.homixny.com/agents/yukeyhoo" },
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
