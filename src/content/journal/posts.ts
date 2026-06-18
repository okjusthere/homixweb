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
    "slug": "long-island-city-buyers-guide",
    "date": "2026-06-15",
    "authorSlug": "michelleli",
    "cover": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    "readMinutes": 5,
    "category": {
      "en": "Neighborhood",
      "zh": "社区"
    },
    "title": {
      "en": "A Buyer's Guide to Long Island City: Waterfront, Transit, and What to Look For",
      "zh": "长岛市购房指南：滨水天际线、通勤与选房要点"
    },
    "excerpt": {
      "en": "Skyline views, parks at the water's edge, and a one-stop ride to Midtown make Long Island City one of New York's most considered places to buy — here is what to study before you do.",
      "zh": "天际线视野、紧贴水岸的公园，以及一站直达中城的通勤——长岛市是纽约最值得细看的购房地段之一，落笔之前，先读懂它。"
    },
    "body": {
      "en": "Long Island City sits on the Queens shoreline directly across the East River from Midtown Manhattan. Over the past two decades it has grown from an industrial waterfront into one of the city's most architecturally distinct residential districts — a place defined by glass towers, restored gantries, and an open horizon that most of Manhattan can no longer offer. For buyers weighing a new-construction condo, it rewards a close read.\n\n## The waterfront and its parks\n\nThe neighborhood's signature is the water. **Gantry Plaza State Park** anchors the southern stretch, where the restored Long Island Rail Road gantries frame the Manhattan skyline and the landmark Pepsi-Cola sign. Walk north and the green continues into **Hunter's Point South Park**, a contemporary waterfront design with lawns, an inlet, and some of the best uninterrupted views of the United Nations and the Midtown wall.\n\nThis ribbon of parkland is more than scenery. It shapes value: units with western and southern exposure toward the water and the skyline tend to command a premium, and the parks function as the neighborhood's shared front yard.\n\n## Getting to Midtown\n\nLIC is unusually well connected for an outer-borough address. The lineup includes:\n\n- The **7** from Vernon Blvd–Jackson Av and Hunters Point Av\n- The **E and M** from Court Square, which reach Midtown Manhattan in minutes\n- The **G**, useful for Brooklyn without crossing into Manhattan\n- The **NYC Ferry** at Hunters Point, a scenic East River route\n\nFew commutes in the city are shorter. From parts of LIC, a Midtown office is a single stop and a handful of minutes away — a practical advantage that holds its appeal across market cycles.\n\n## New construction and amenities\n\nMuch of LIC's housing stock is recent, which means buyers often choose between a brand-new tower and an early-2010s building. Newer developments tend to offer doorman service, fitness centers, residents' lounges, landscaped roof decks, and co-working space. Court Square and Hunters Point are the densest pockets; Vernon Boulevard keeps a lower-rise, main-street feel with cafes, bakeries, and restaurants at the sidewalk.\n\n## What buyers should look for\n\nA few practical notes before you tour or make an offer:\n\n- **Exposure and sightlines.** A skyline view today can be built out tomorrow. Ask what is zoned or under construction on neighboring lots.\n- **Tax abatements.** Many new condos carry time-limited tax benefits; confirm the type, the remaining term, and what monthly costs look like once it phases out.\n- **The full carrying cost.** Common charges in amenity-rich buildings add up. Read the offering plan and budget for the real monthly number, not just the price.\n- **Building track record.** For newer construction, review the sponsor, the warranty, and any reserve studies.\n- **Timing.** New developments often release inventory in phases, and resale supply moves with the seasons. A patient, pre-approved buyer has room to negotiate.\n\nLong Island City is a neighborhood you understand best with a clear-eyed walk-through and a careful read of the numbers. If you'd like a current, address-specific view of what's available and what it really costs to own there, [reach out](/contact) — or browse our current [listings](/listings) to start the conversation.",
      "zh": "长岛市（Long Island City，简称 LIC）位于皇后区滨水一线，隔东河与曼哈顿中城正面相望。过去二十年，它从工业岸线蜕变为全市建筑气质最鲜明的住宅区之一——玻璃塔楼、修复的旧码头吊架，以及一片曼哈顿大多地段早已无法提供的开阔天际线。对正在考量新建公寓的买家来说，这里值得细读。\n\n## 滨水与公园\n\n水，是这个社区的招牌。**Gantry Plaza State Park（码头广场州立公园）**坐落于南段，修复后的长岛铁路吊架将曼哈顿天际线与地标百事可乐霓虹招牌框入画中。往北走，绿意延续至 **Hunter's Point South Park**——一座当代滨水公园，草坪、内湾，以及看向联合国总部与中城楼墙最不被遮挡的视野之一。\n\n这条绿带远不只是风景。它影响价值：朝西、朝南、面向水面与天际线的单位往往溢价更高，而公园本身，就像整个社区共享的前院。\n\n## 通往中城\n\n作为一个外区地址，LIC 的通勤便利得有些不寻常。线路包括：\n\n- 从 Vernon Blvd–Jackson Av 与 Hunters Point Av 出发的 **7 号线**\n- 从 Court Square 出发的 **E、M 线**，几分钟即达曼哈顿中城\n- **G 线**，不进曼哈顿即可前往布鲁克林\n- Hunters Point 的 **NYC Ferry 渡轮**，一条风景宜人的东河航线\n\n全市少有比这更短的通勤。从 LIC 的部分地段出发，中城的办公室不过一站、几分钟之遥——这一实在的优势，穿越市场周期依旧成立。\n\n## 新建公寓与配套\n\nLIC 的住宅大多较新，买家常需在全新塔楼与 2010 年代初的楼盘之间取舍。较新的开发通常配有门房服务、健身中心、住户休息室、园艺屋顶平台与共享办公空间。Court Square 与 Hunters Point 是最密集的地段；Vernon Boulevard 则保留了较低楼层的主街气息，咖啡馆、面包房与餐厅就开在街边。\n\n## 买家该看什么\n\n看房或出价前，几条实在的提醒：\n\n- **朝向与视线。** 今天的天际线视野，明天可能被新楼挡住。先问清相邻地块的规划与在建情况。\n- **地税减免。** 不少新公寓带有限期的税务优惠；确认其类型、剩余年限，以及优惠退场后的月供变化。\n- **完整持有成本。** 配套丰富的楼盘，管理费累积起来不容小觑。读透销售计划书，按真实月供做预算，而非只看房价。\n- **楼盘记录。** 对较新的项目，了解开发商、质保条款与储备金报告。\n- **时机。** 新开发常分期放盘，二手供应也随季节起伏。一位有耐心、已获贷款预批的买家，谈判空间更大。\n\n长岛市这样的社区，最好的理解方式，是一次清醒的实地走访，加一份对数字的仔细推敲。若你想要一份针对具体地址的最新情况——在售房源与真实的持有成本，[联系我们](/contact)；也可以先浏览我们的[在售房源](/listings)，从这里聊起。"
    }
  },
  {
    "slug": "home-staging-secrets-sell-for-more",
    "date": "2026-06-01",
    "authorSlug": "yanxue",
    "cover": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    "readMinutes": 4,
    "category": {
      "en": "Selling",
      "zh": "卖房策略"
    },
    "title": {
      "en": "Staging a New York Home to Sell: An Associate Broker's Playbook",
      "zh": "让纽约的房子卖得快、卖得好：一位副经纪人的布置心法"
    },
    "excerpt": {
      "en": "Staging isn't decorating — it's editing a home down to the version of itself that photographs beautifully and helps a buyer picture their life inside it.",
      "zh": "布置不是装饰，而是做减法——把房子修剪成最上镜、最能让买家想象自己住进去的那一版。"
    },
    "body": {
      "en": "Buyers decide quickly. Long before they walk a hallway, they've scrolled past the first photo — and in New York, where most homes are met online first, that frame is the showing. Staging is how you control it. Done well, it isn't decorating. It's editing a home down to the version of itself that sells faster and gives a buyer fewer reasons to negotiate.\n\nHere's the playbook I use, room by room.\n\n## Start by subtracting: declutter and depersonalize\n\nThe first move is almost always removal. Clear counters, thin out closets, and pull anything that makes a room read as full. A buyer needs to see space, and a camera exaggerates clutter — a tidy counter in person can look crowded on screen.\n\nThen depersonalize. Pack away the family photos, the diplomas, the collections. The goal isn't a blank, hotel feel; it's a calm canvas where a buyer can imagine their own life, not study yours.\n\n- Aim for surfaces that are about **70% clear**.\n- Box up roughly a third of what's in each closet — full closets read as \"not enough storage.\"\n- Keep one or two warm, neutral objects per room. Bare reads cold; cluttered reads small.\n\n## Light and a neutral palette do the heavy lifting\n\nLight is the cheapest upgrade in real estate. Open every shade, swap dim or mismatched bulbs for a consistent warm white, and clean the windows — daylight makes rooms feel larger and more honest. For evening showings and video, lamps in the corners soften the hard overhead glare.\n\nColor is the other lever. A neutral palette — warm whites, soft greiges, quiet earth tones — photographs cleanly and lets the architecture, not the paint, be the story. A bold accent wall might suit your taste, but it narrows the pool of buyers who can picture themselves there. Neutral keeps the door open to everyone.\n\n## Win the three rooms that move buyers\n\nNot every room earns equal attention. Three carry the most weight:\n\n- **Kitchen.** Clear the counters down to a few considered pieces, add fresh hardware if the cabinets feel dated, and make sure the lighting flatters. Buyers price-anchor on the kitchen.\n- **Primary bedroom.** Crisp, layered bedding, symmetrical nightstands, and nothing under the bed. This room should feel like rest.\n- **Living room.** Float the furniture to show flow and define a clear seating area. In a smaller New York layout, fewer, well-scaled pieces make a space feel bigger than wall-to-wall furniture ever will.\n\n## Spend small where it returns most\n\nYou don't need a renovation. The highest-ROI fixes are usually the quiet ones: a fresh coat of neutral paint, modern cabinet pulls, updated switch plates, re-caulked tubs, and a deep professional clean. Fix the small things a buyer's eye snags on — the loose handle, the scuffed baseboard, the burnt-out bulb. Each one, left alone, quietly invites a lower offer.\n\n## Then let the media amplify the work\n\nStaging and media are partners. A beautifully prepared home shot on a phone in poor light still undersells; a professional photographer with proper lighting and lenses turns that same room into a frame people stop scrolling for. Video and a walk-through tour carry it further — showing flow, light, and scale in a way stills can't, and reaching buyers wherever they actually spend their attention.\n\nThat's the order that works: stage the home, then let great photography and video carry it to the right audience.\n\nIf you're thinking about selling and want a candid, room-by-room read on what's worth doing — and what isn't — [reach out](/contact). We'll walk your home with a staging eye and build the media plan around it. You can also browse current [listings](/listings) to see the approach in practice.",
      "zh": "买家的决定很快。远在他们踏进走廊之前，已经划过了第一张照片——而在纽约，大多数房子都是先在线上被看见的，那一帧画面其实就是一场看房。布置，就是你掌控这一帧的方式。做得好，它不是装饰，而是把房子修剪成最上镜、最能让买家少找理由压价的那一版。\n\n下面是我常用的心法，一间一间地说。\n\n## 从「减法」开始：清杂与去个人化\n\n第一步几乎总是「拿走」。清空台面，精简衣橱，拿掉一切让房间显得「满」的东西。买家需要看到空间，而镜头会放大杂乱——现场看整洁的台面，上了镜头可能就显得拥挤。\n\n接着是去个人化。把全家福、毕业证书、收藏品都收起来。目标不是把家弄得像酒店那样冷冰冰，而是留下一块平静的画布——让买家能想象自己的生活，而不是研究你的生活。\n\n- 台面尽量留出约 **70% 的空白**。\n- 每个衣橱大致收走三分之一的东西——塞满的衣橱会让人觉得「收纳不够」。\n- 每个房间留一两件色调温暖、中性的物件。空荡显得冷，杂乱显得小。\n\n## 光线与中性色调，才是真正的主力\n\n光线是房地产里最便宜的升级。拉开所有窗帘，把昔暗或色温不一的灯泡换成统一的暖白光，再把窗玻璃擦干净——自然光会让房间显得更大、也更真实。遇到傍晚看房或拍视频，在角落里摆上台灯，可以柔化顶灯生硬的光。\n\n颜色是另一个杠杆。中性色调——暖白、柔和的灰调、安静的大地色——上镜干净，让唬主的是空间本身，而不是墙面的油漆。一面高调的彩色背景墙也许合你的口味，但它会缩小能把自己“看进去”的买家范围。中性，才能把门留给所有人。\n\n## 拿下最能打动买家的三个房间\n\n不是每个房间都值得同等用心。有三个房间分量最重：\n\n- **厨房。**只在台面上留几件精选的物件；柜体显旧的话，换一批新把手；再确保灯光是加分的。买家会把厨房当作报价的锢。\n- **主卧。**平整、有层次的床品，对称的床头柜，床底下不堆东西。这个房间要让人感觉到「休息」。\n- **客厅。**让家具适度脱离墙面，理出动线，划定一个清晰的会客区。在纽约较小的户型里，几件尺寸合宜的家具，反而比塞满一屋更显宽敞。\n\n## 把小钱花在回报最高的地方\n\n你不需要大改。回报最高的，往往是那些不起眼的小修缮：重刷一遍中性色的墙面、换上现代感的柜门把手、更新开关面板、重新打一道浴缸玻璃胶，再做一次专业深度清洁。把买家眼睛会「卡住」的小毛病修好——松动的把手、碰花的踢脚线、坏掉的灯泡。这些小问题一旦留着，都在静静地招来一份更低的报价。\n\n## 最后，让媒体把这份用心放大\n\n布置与媒体是一对搭档。一个精心准备过的家，若用手机在弱光下随手一拍，依然卖不出应有的价；而一位带着专业灯光与镜头的摄影师，能把同一个房间变成让人停下手指的那一帧。视频与漫游式看房走得更远——它们能展现出动线、光线与尺度，这是静态照片做不到的，也能把房子送到买家真正花时间的地方。\n\n这才是奥有成效的顺序：先把家布置好，再让出色的摄影与视频把它送到对的人面前。\n\n如果你正在考虑卖房，想听一份坦诚、逐间逐房的建议——哪些值得做、哪些不必做——欢迎[联系我们](/contact)。我们会带着布置的眼光走一遍你的家，并围绕它做出媒体方案。你也可以看看当前的[房源](/listings)，感受这套做法的实际效果。"
    }
  },
  {
    "slug": "coop-vs-condo-nyc",
    "date": "2026-05-28",
    "authorSlug": "heidi",
    "cover": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    "readMinutes": 5,
    "category": {
      "en": "Buyer Guide",
      "zh": "购房指南"
    },
    "title": {
      "en": "Co-op vs. Condo in New York: A Practical Buyer's Guide",
      "zh": "纽约合作公寓与共管公寓：一份实用购房指南"
    },
    "excerpt": {
      "en": "Two New York apartments at the same price can mean very different ownership, approvals, and monthly costs — here's how co-ops and condos actually differ.",
      "zh": "同样价格的两套纽约公寓，背后的产权、审批与月供可能截然不同——这篇带你看清合作公寓与共管公寓的真实差别。"
    },
    "body": {
      "en": "In New York, two apartments listed at the same price can be entirely different purchases. One might be a co-op, where you buy shares in a corporation. The other a condo, where you own real property outright. The distinction shapes how you finance, who approves you, what you pay each month, and how freely you can rent it out later. Here is a practical walk-through. (This is general information, not legal or financial advice.)\n\n## Two ways to own\n\nA **co-op** (cooperative) doesn't sell you the apartment itself. You buy shares in a corporation that owns the building, and those shares come with a proprietary lease for your unit. Larger apartments and higher floors typically carry more shares.\n\nA **condo** (condominium) is real property. You receive a deed to your specific unit and a fractional interest in shared spaces like the lobby and roof. It behaves much like owning a house, just stacked vertically.\n\nHistorically, co-ops make up a large share of New York's housing, especially in older buildings, while newer construction skews toward condos. Both can be excellent homes — the right fit depends on your timeline, financing, and plans.\n\n## Board approval and the interview\n\nThis is where the paths diverge most.\n\n- **Co-ops** require board approval. You submit a detailed package — finances, references, tax returns — and sit for an interview. The board can decline an applicant, and post-closing liquidity and debt-to-income expectations are often strict.\n- **Condos** rarely interview. Most have only a right of first refusal, meaning the building can match your offer and buy the unit itself, which is uncommon in practice. Approval is lighter and usually faster.\n\nBoards must follow fair housing law throughout. The process is about financial qualifications and building rules, full stop.\n\n## Financing and down payment\n\nFinancing differs in kind, not just degree.\n\n- **Co-ops** often set minimum down payments — frequently 20% or more, sometimes far higher in pricier buildings. Your loan is a share loan secured by the shares, not a traditional mortgage.\n- **Condos** typically allow more flexible financing and lower down payments, which can widen the buyer pool. The loan is a standard mortgage secured by real property.\n\nBecause condos are more flexible to finance and resell, they can carry a price premium over comparable co-ops.\n\n## Monthly costs and subletting\n\nEvery month a co-op owner pays **maintenance**, a single charge that bundles the building's operating costs *and* your share of the building's underlying mortgage and property taxes. A condo owner pays **common charges** for operations, then property taxes separately.\n\nOn subletting:\n\n- **Co-ops** commonly restrict renting — caps on how many years, board sign-off, sometimes a near-total ban. Better suited to owner-occupants than investors.\n- **Condos** are generally far more rental-friendly, which appeals to buyers who may relocate or want an income property.\n\n## Which fits you\n\nCo-ops can offer more home for the price and tight-knit, owner-occupied buildings. Condos offer flexibility — easier financing, lighter approval, freer renting. Neither is better in the abstract; the right answer follows your finances and your plans.\n\nIf you'd like help weighing real buildings against your goals, [start a conversation](/contact) — or [browse current listings](/listings) to see how these trade-offs look in practice.",
      "zh": "在纽约，两套挂牌价相同的公寓，可能是两笔完全不同的交易。一套或许是合作公寓（co-op），你买的是一家公司的股份；另一套则是共管公寓（condo），你直接拥有不动产。这一区别，决定了你如何贷款、由谁来审批、每月付多少，以及日后能多自由地出租。下面我们来实打实地走一遍。（本文为一般性信息，并非法律或财务建议。）\n\n## 两种持有方式\n\n**合作公寓**（co-op）卖给你的并不是房子本身。你买的是拥有这栋楼的公司的股份，这些股份附带一份针对你单元的专有租约。面积更大、楼层更高的单元，通常对应更多股份。\n\n**共管公寓**（condo）则是不动产。你拿到的是属于你那套单元的房契，外加对大堂、屋顶等公共空间的一份共有权益。它更接近拥有一栋独立屋，只是纵向叠了起来。\n\n从历史上看，合作公寓在纽约住房中占比很高，老楼尤其多；而新建项目更偏向共管公寓。两者都可以是很好的家——合不合适，取决于你的时间线、贷款方式与未来打算。\n\n## 董事会审批与面试\n\n两条路在这里分得最开。\n\n- **合作公寓**需要董事会审批。你要提交一份详尽的材料包——财务状况、推荐信、报税表——并接受面试。董事会有权拒绝申请人，对成交后的流动资金和负债收入比往往要求很严。\n- **共管公寓**很少面试。多数只保留优先购买权，即大楼可以按你的报价把单元买下，但实际中很少发生。审批更轻，通常也更快。\n\n整个过程，董事会都必须遵守公平住房法。审批针对的是财务资质与楼规，仅此而已。\n\n## 贷款与首付\n\n两者的融资方式是本质不同，而不只是程度之差。\n\n- **合作公寓**常设有最低首付门槛——往往 20% 起，高端楼盘有时远不止于此。你拿到的是以股份作抵押的「股份贷款」，而非传统房贷。\n- **共管公寓**通常允许更灵活的融资和更低的首付，这会扩大潜在买家群。贷款是以不动产作抵押的标准房贷。\n\n正因为共管公寓在融资和转售上更灵活，相比条件相近的合作公寓，它的价格往往会高一些。\n\n## 月度开销与转租\n\n合作公寓业主每月支付的是 **maintenance（维护费）**，这是一笔合并费用，既含大楼的运营成本，*也*含你应分摊的大楼底层贷款与房产税。共管公寓业主则支付用于运营的 **common charges（公共费）**，房产税另算。\n\n关于转租：\n\n- **合作公寓**普遍限制出租——限定年限、需董事会批准，有时几乎全面禁止。更适合自住者，而非投资者。\n- **共管公寓**总体上对出租友好得多，这对可能搬迁、或想要一套收租房产的买家很有吸引力。\n\n## 哪一种更适合你\n\n同样的预算，合作公寓常能换来更大的空间，以及邻里紧密、以自住为主的楼。共管公寓胜在灵活——贷款更易、审批更轻、出租更自由。脱离具体情况，没有谁一定更好；答案要跟着你的财务与计划走。\n\n如果你希望有人帮你把真实的楼盘和你的目标放在一起权衡，欢迎[聊一聊](/contact)——或[浏览在售房源](/listings)，看看这些取舍在现实中是什么样子。"
    }
  },
  {
    "slug": "great-neck-north-shore-guide",
    "date": "2026-05-15",
    "authorSlug": "jingjingfeng",
    "cover": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
    "readMinutes": 5,
    "category": {
      "en": "Neighborhood",
      "zh": "社区"
    },
    "title": {
      "en": "Great Neck & the North Shore: A Buyer's Guide to Long Island Living",
      "zh": "Great Neck 与北岸：长岛安居买家指南"
    },
    "excerpt": {
      "en": "From the villages and the LIRR run to Penn Station to Steppingstone's waterfront and a housing stock that spans classic colonials to modern builds — here's what buyers should know about Great Neck and Long Island's North Shore.",
      "zh": "从各个村镇、直达宾州车站的 LIRR，到 Steppingstone 的水岸，再到从经典殖民风格到现代新建的多样房源——关于 Great Neck 与长岛北岸，买家该知道的都在这里。"
    },
    "body": {
      "en": "## The villages that make up Great Neck\n\nGreat Neck is less a single place than a constellation. The peninsula reaching into Long Island's North Shore holds a cluster of incorporated villages — among them Great Neck Estates, Kings Point, Russell Gardens, Saddle Rock, and Thomaston — each with its own character, alongside the busier commercial spine around Middle Neck Road. Tree-lined streets, mature plantings, and a mix of village halls and small storefronts give the area a settled, residential rhythm.\n\nThat patchwork is part of the appeal. One block reads as quiet and leafy; a few minutes away, a walkable stretch offers grocers, bakeries, and cafes. For buyers, it means the name \"Great Neck\" covers a real range of streetscapes and home styles — worth touring in person before narrowing in.\n\n## The commute: LIRR to Penn Station\n\nThe single feature that shapes daily life here is the **Long Island Rail Road**. The Great Neck station sits on the Port Washington Branch, with frequent trains running west to Penn Station in Midtown Manhattan. Peak express runs are commonly in the range of roughly 30 to 40 minutes, putting much of Manhattan's commercial core within a reasonable door-to-desk window.\n\nWith the completion of Grand Central Madison, many Port Washington Branch riders now have a one-seat or simpler transfer option toward the East Side as well. For households balancing city work and suburban space, that rail access is often the deciding factor.\n\n## Parks, water, and everyday amenities\n\nGreat Neck's geography is defined by water — Manhasset Bay and Little Neck Bay frame the peninsula. **Steppingstone Park**, on the Kings Point shoreline, offers waterfront paths, a small beach area, seasonal concerts, and long views across the bay; it's a defining gathering place in warmer months. The Great Neck Park District maintains additional pools, fields, courts, and green space across the area.\n\nDay to day, you'll find:\n\n- A walkable commercial corridor with restaurants, groceries, and services\n- Local parks, marinas, and waterfront access points\n- Quick reach to wider North Shore destinations — Port Washington, Manhasset's shopping, and the Gold Coast preserves\n\n## Strong public schools and a range of homes\n\nGreat Neck is widely recognized for its **public school district**, a frequent draw for families evaluating the North Shore. As with any district, attendance zones and program specifics vary by address — confirm the particulars for any home you're considering, since boundaries and offerings can change.\n\nThe housing stock is genuinely varied. Stately center-hall **colonials** and Tudors from earlier eras sit near mid-century homes, split-levels, and a growing number of **modern new builds** and gut renovations. You'll also find condominiums and co-ops closer to the station and commercial center. Lot sizes range from compact village parcels to broader, more private settings near the water. Price points span widely with home size, condition, and location, so it helps to anchor expectations early.\n\nA few things buyers should know going in: property taxes on Long Island are a meaningful line item and vary by village and assessment, so budget for them deliberately. Older homes may carry charm and updates in equal measure — a thorough inspection earns its keep. And inventory in sought-after pockets can move quickly, which makes pre-approval and a clear must-have list worth preparing before you tour.\n\n## Working with Homix on the North Shore\n\nGreat Neck rewards buyers who walk it village by village and sellers who present a home with genuine craft. If you're weighing the North Shore — comparing commutes, school zones, or colonial-versus-modern — our bilingual team can map the tradeoffs to your timeline and budget. [Reach out](/contact) to start the conversation, or [browse current listings](/listings) to see what's on the market today.",
      "zh": "## 构成 Great Neck 的村镇\n\nGreat Neck 与其说是一个地方，不如说是一片村镇的集合。这片伸入长岛北岸（North Shore）的半岛上，聚集着若干自治村庄——包括 Great Neck Estates、Kings Point、Russell Gardens、Saddle Rock 与 Thomaston 等——各有气质，再加上 Middle Neck Road 一带较为热闹的商业主轴。林荫街道、成熟的绿化，以及村政厅与小型商铺交织，赋予这里安定而宜居的生活节奏。\n\n这种拼图式的格局正是它的魅力所在。一个街区静谧而葱郁；几分钟外，可步行的街段就有食品店、面包房与咖啡馆。对买家来说，这意味着「Great Neck」这个名字涵盖了相当多样的街景与房屋风格——值得亲自走一走，再缩小范围。\n\n## 通勤：LIRR 直达宾州车站\n\n真正塑造这里日常生活的，是 **长岛铁路（LIRR）**。Great Neck 站位于 Port Washington 支线上，列车频繁西行直达曼哈顿中城的宾州车站（Penn Station）。高峰快车通常在约 30 至 40 分钟区间，将曼哈顿大部分商业核心纳入合理的「门到工位」范围。\n\n随着 Grand Central Madison 的启用，许多 Port Washington 支线的乘客如今也多了通往东城更直接的换乘选择。对于既要在城里工作、又想要郊区空间的家庭而言，这条铁路往往是决定性因素。\n\n## 公园、水岸与日常配套\n\nGreat Neck 的地理由水定义——Manhasset 湾与 Little Neck 湾环抱着这片半岛。位于 Kings Point 岸线的 **Steppingstone 公园**，拥有滨水步道、小型沙滩区、季节性露天音乐会，以及横跨海湾的开阔视野；暖季里，它是这一带标志性的聚会场所。Great Neck 公园区还在区域内维护着多处泳池、球场、运动场与绿地。\n\n日常生活中，你会发现：\n\n- 可步行的商业街，餐厅、食杂店与各类服务齐备\n- 本地公园、码头与多处水岸通道\n- 便捷通往更广阔的北岸目的地——Port Washington、Manhasset 的购物区，以及黄金海岸（Gold Coast）的自然保护地\n\n## 优质公立学校与多样房型\n\nGreat Neck 以其 **公立学区** 广受认可，这常是评估北岸的家庭看重的一点。与任何学区一样，入学分区与具体项目会因地址而异——由于边界与课程设置可能调整，请就你考虑的每一处房产核实细节。\n\n这里的房源类型十分多样。早期年代庄重的中厅式 **殖民风格（colonial）** 住宅与都铎式建筑，与世纪中期住宅、错层式房屋，以及越来越多的 **现代新建房** 和彻底翻新的住宅比邻而立。临近车站与商业中心，还能找到共有公寓（condo）与合作公寓（co-op）。地块面积从紧凑的村内地块，到近水处更宽敞私密的环境不等。价格随面积、状况与位置差异很大，因此早些确立预期会很有帮助。\n\n买家入场前不妨先了解几点：长岛的房产税是一笔可观的开支，且因村镇与评估而异，需有意识地纳入预算。较老的住宅往往兼具韵味与改造空间——一次细致的验房物有所值。而在抢手地段，房源可能去化很快，因此在看房前办好预批、列清必备清单，都值得提前准备。\n\n## 与 Homix 一起走进北岸\n\nGreat Neck 会回报那些一村一村细看的买家，也会回报用心呈现房屋的卖家。如果你正在权衡北岸——比较通勤、学区，或在殖民风格与现代新建之间取舍——我们的双语团队可以把各种取舍对应到你的时间表与预算上。[联系我们](/contact) 开启对话，或 [浏览在售房源](/listings)，看看当前市场上有什么。"
    }
  },
  {
    "slug": "nyc-closing-costs-explained",
    "date": "2026-04-28",
    "authorSlug": "emmaniu",
    "cover": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    "readMinutes": 6,
    "category": {
      "en": "Guide",
      "zh": "指南"
    },
    "title": {
      "en": "Closing Costs in New York, Explained: A Buyer's Plain-English Guide",
      "zh": "纽约购房交易成本全解析：买家的明白账"
    },
    "excerpt": {
      "en": "Beyond the purchase price lies a second number every New York buyer should know — here is a calm, line-by-line look at what closing actually costs.",
      "zh": "在成交价之外，还有一个每位纽约买家都该心里有数的数字——这里逐项拆解，让交易成本一目了然。"
    },
    "body": {
      "en": "When people talk about the price of a New York home, they usually mean one number. But the figure that matters at the closing table is larger — the purchase price plus a stack of one-time costs that close the deal and transfer the keys. None of it is hidden, exactly. It is just rarely explained in one place, in plain language. So here it is.\n\nA note before we begin: every figure below is illustrative and general. Tax rates, lender fees, and the line items that apply to your specific home change with price, property type, and location. Treat this as a map, not a quote — and confirm the exact numbers with your real estate attorney and your lender before you budget around them.\n\n## What buyers typically pay\n\nMost of a buyer's closing costs fall into a handful of recurring categories. For a financed purchase, the common ones are:\n\n- **Mortgage recording tax** — a state-and-city tax tied to the loan amount, paid only when you take out a mortgage. It is one of the larger line items for financed buyers.\n- **Mansion tax** — a tax on residential purchases at or above $1,000,000. It begins at a modest percentage and steps up in tiers as the price climbs, so higher-priced homes carry a proportionally larger bite.\n- **Title insurance** — a one-time policy protecting you (and your lender) against defects in the property's ownership history. Lenders generally require their own policy; an owner's policy is yours to keep.\n- **Attorney fees** — New York closings are run by attorneys on both sides. Your lawyer reviews the contract, runs due diligence, and represents you at closing for a flat fee.\n- **Bank and loan fees** — origination, processing, and related lender charges, plus an **appraisal** so the bank can confirm the home's value.\n\nCondos, co-ops, and townhouses each layer on their own extras — building application fees, move-in deposits, or a co-op's financing requirements. Your attorney will flag which apply to the specific home you are buying.\n\n## What sellers typically pay\n\nSellers carry their own set of costs, and they are usually heavier. The headline item is the **transfer taxes** owed to the state and, for city properties, to New York City — calculated as a percentage of the sale price. Sellers also pay their own attorney, any outstanding building or payoff fees, and the brokerage commission that compensates the agents on the transaction. For higher-value sales, an additional state transfer tax may apply on top of the base rate.\n\nKnowing the seller's side matters even as a buyer: it shapes how a deal is negotiated and where there may be room to move.\n\n## A rough way to budget\n\nUntil you have real quotes, a simple planning rule helps. As a **general ballpark, buyers often set aside somewhere in the range of 2% to 5% of the purchase price** for closing costs — leaning toward the higher end when a mortgage and mansion tax are both in play, and lower for an all-cash purchase that skips the recording tax. A few patterns to keep in mind:\n\n- Financing adds cost. The mortgage recording tax and bank fees only apply when you borrow.\n- Crossing $1,000,000 triggers the mansion tax — worth knowing if your target price sits near that line.\n- Property type matters. A co-op and a condo at the same price can close very differently.\n\nThese percentages are illustrative, not a promise. Your attorney and lender can turn them into a real estimate once you have a specific home and loan in view.\n\n## The quiet value of knowing early\n\nClosing costs rarely change whether a home is right for you — but knowing them early changes how confidently you move. The buyers who feel calm at the closing table are usually the ones who saw the full number months before, not the week of.\n\nIf you would like a clear, personalized walkthrough of what a purchase might actually cost — before you fall for a particular home — [reach out to our team](/contact). We are happy to map the numbers with you, and to point you toward [homes worth seeing](/listings) when you are ready.",
      "zh": "人们谈起一套纽约住宅时，通常只说一个数字。但真正在交割桌上算清的那个数字要更大——成交价之外，还有一叠一次性费用，用来完成交易、交付钥匙。这些费用其实都不隐蔽，只是很少被人用平实的语言、在一处讲清楚。那就从这里讲起。\n\n开始之前先说明一句：下文所有数字都仅为示意和概览。税率、贷款机构收费，以及适用于你这套房的具体项目，都会随价格、房产类型和地段而变化。请把它当作一张地图，而非一份报价——在据此做预算之前，务必向你的房地产律师和贷款机构核实确切金额。\n\n## 买家通常要付哪些钱\n\n买家的交易成本大多落在几类固定项目里。对于需要贷款的购房，常见的有：\n\n- **房贷登记税（Mortgage Recording Tax）**——一项与贷款金额挂钩的州与市税，只有在办理房贷时才需缴纳，是贷款买家较大的一笔支出。\n- **豪宅税（Mansion Tax）**——针对成交价达到或超过 100 万美元住宅的税。它从一个不高的比例起步，随价格上升按档累进，因此价位越高，占比也越重。\n- **产权保险（Title Insurance）**——一次性保单，保护你（以及贷款方）免受房产权属历史中潜在瑕疵的影响。贷款方通常要求购买其专属保单；业主保单则归你自己所有。\n- **律师费**——纽约的交割由买卖双方各自的律师主持。你的律师负责审阅合同、做尽职调查，并在交割时代表你，多按固定费用收取。\n- **银行与贷款费用**——包括贷款发放、审批等相关收费，以及一笔**房屋估价（Appraisal）**费用，供银行确认房产价值。\n\nCondo（产权公寓）、Co-op（合作公寓）和联排别墅还各有附加项——楼宇申请费、入住押金，或 Co-op 对贷款比例的要求。具体哪些适用于你看中的这套房，你的律师会逐一指出。\n\n## 卖家通常要付哪些钱\n\n卖家也有自己的一套成本，且往往更重。最显眼的一项是应缴州、以及（针对市内房产）应缴纽约市的**产权转让税（Transfer Tax）**，按成交价的一定比例计算。卖家还需支付自己的律师费、任何未结清的楼宇或还贷费用，以及支付给本次交易经纪人的佣金。对于价位较高的成交，在基础税率之外，还可能加征一项额外的州转让税。\n\n即便身为买家，了解卖方这一侧也有意义：它影响着一笔交易如何谈、哪里可能还有回旋的空间。\n\n## 一个粗略的预算方法\n\n在拿到真实报价之前，一条简单的规划经验会有帮助。**一般而言，买家常会按成交价的 2% 到 5% 预留交易成本**——同时涉及房贷和豪宅税时偏向上限，全款购房省去登记税时则偏向下限。几个值得记住的规律：\n\n- 贷款会增加成本。房贷登记税和银行费用只有在你借款时才产生。\n- 跨过 100 万美元会触发豪宅税——如果你的目标价位就在这条线附近，尤其值得留意。\n- 房产类型有讲究。同样价格的 Co-op 和 Condo，交割流程可能大不相同。\n\n这些比例仅为示意，并非承诺。一旦你锁定了具体的房子和贷款方案，律师和贷款机构便能把它们换算成一份真实的估算。\n\n## 早知道，自有一份从容\n\n交易成本很少会改变一套房是否适合你——但早早知道它，会改变你出手时的底气。在交割桌上最从容的买家，往往是那些早在几个月前、而非交割当周才看清这个完整数字的人。\n\n如果你希望在真正爱上某套房之前，先清楚、量身地了解一次购房可能的实际花费，欢迎[联系我们的团队](/contact)。我们乐意陪你把这笔账一项项理清，也会在你准备好时，为你指向[值得一看的房源](/listings)。"
    }
  },
  {
    "slug": "why-video-sells-homes-faster",
    "date": "2026-04-15",
    "authorSlug": "kevinnli",
    "cover": "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80",
    "readMinutes": 4,
    "category": {
      "en": "Media",
      "zh": "媒体"
    },
    "title": {
      "en": "Why Short-Form Video Sells Homes Faster Than Photos Alone",
      "zh": "为什么短视频比照片更快卖掉一套房子"
    },
    "excerpt": {
      "en": "Photos freeze a moment; short-form video walks a buyer through a home — and reaches the feeds where the next one is already scrolling.",
      "zh": "照片定格一个瞬间，短视频却能带买家走进一套房子——并抵达下一位买家正在滑动的信息流。"
    },
    "body": {
      "en": "Buyers don't go house-hunting the way they did ten years ago. They scroll. A bright kitchen, a window with morning light, a staircase that turns just so — it catches the eye between two other videos, and a search begins. Photos still matter, but a still frame can't walk someone through a home. Short-form video can.\n\n## Why video moves faster than photos\n\nA photograph is a moment. A video is a path. When a buyer watches a thirty-second walk-through, they feel the flow from entry to kitchen to light-filled back room — the things a gallery of stills only hints at. They understand scale, sequence, and mood in a way that captions can't fake.\n\nThat understanding does two things. It pulls the right buyers closer, faster, because they arrive already knowing the home. And it gently filters out mismatches before a single showing is booked, which keeps the calendar focused and the home shown to people genuinely interested in it.\n\n## Where buyers actually discover homes now\n\nThe MLS is essential, but it's the floor, not the ceiling. It reaches people already searching. Video reaches people who weren't — until a feed put a home in front of them.\n\nThat's where a brokerage with reach changes the math. Homix grew as a media company first, and our work carries to a **1,000,000+ audience** already following New York real estate. A home placed there isn't waiting to be found. It's introduced.\n\n## How our media studio tells a home's story\n\nAt our studio, we don't \"shoot a listing.\" We tell the story of a place. Before anyone picks up a camera, we ask what makes this home itself — the light at a certain hour, the proportion of a room, the way a street feels on a quiet morning.\n\nA video that earns attention is built, not captured. The strongest ones tend to share a few things:\n\n- **A hook in the first second** — the one frame that stops a thumb mid-scroll.\n- **Motion with intent** — steady, deliberate movement that mirrors how you'd actually walk through, never frantic.\n- **Real light** — natural daylight and an honest, warm grade, so the home looks like itself on the day you visit.\n- **A sense of place** — the block, the trees, the walk to the corner, so the home sits in a neighborhood, not a vacuum.\n- **Sound and pacing** — a rhythm that lets a room breathe instead of rushing past it.\n- **One honest story** — what's genuinely special, shown rather than oversold.\n\nWe pair that craft with AI-assisted tools — for editing, captioning across Mandarin and English, and reading which moments hold attention — so each home reaches further without ever feeling manufactured.\n\n## What this means for a seller\n\nMore of the right people see the home, sooner. Interest tends to arrive earlier, and early interest is leverage. None of it replaces a beautiful set of photographs or a thoughtful listing — it extends them, carrying a home past the portals and into the feeds where the next buyer is already looking.\n\nIf you're preparing to sell and want to see how a home's story could be told, [start a conversation](/contact) — or browse our current [listings](/listings) to watch the approach in motion.",
      "zh": "如今的买家，已经不像十年前那样找房了。他们在刷。一间明亮的厨房、一扇洒进晨光的窗、一段恰到好处的转角楼梯——在两条视频之间一闪而过，一次看房，就这样开始了。照片依然重要，但一张静态画面，没法带人走进一套房子。短视频可以。\n\n## 为什么视频比照片成交更快\n\n照片是一个瞬间，视频是一条路径。当买家看完一段三十秒的视频带看，他会感受到从玄关到厨房、再到采光极好的后厅的那种流动感——这些，一组静态照片只能勉强暗示。空间的尺度、动线、氛围，视频说得清楚，文字配图骗不来。\n\n这份「看懂」带来两件事。它让对的买家更快走近，因为他们到场时，已经认识了这套房；它也在第一次约看之前，就悄悄筛掉了不合适的人，让看房日程更聚焦，也让房子只展示给真正有意的人。\n\n## 买家如今究竟在哪里发现房子\n\nMLS 不可或缺，但它是地板，不是天花板。它触达的是「已经在找」的人。而视频触达的，是那些「本来没在找」的人——直到一条信息流，把一套房子推到了他们眼前。\n\n这正是「有触达力的经纪公司」改写算式的地方。Homix 生来就是一家媒体公司，我们的内容能抵达一个本就关注纽约地产的 **100 万+ 受众**。放在那里的房子，不是在等人发现，而是被主动介绍出去。\n\n## 我们的媒体工作室，如何讲述一套房子\n\n在我们的工作室，我们不「拍房源」，我们讲述一个地方的故事。在有人拿起相机之前，我们先问：是什么让这套房子成为它自己——某个时辰的光、一个房间的比例、一条街在安静清晨里的气息。\n\n一支能赢得注意力的视频，是构建出来的，而非随手拍来的。最出色的那些，往往有几个共同点：\n\n- **第一秒就有钩子**——那一帧，让滑动的手指停下来。\n- **有意图的运动**——平稳、克制的镜头移动，贴近你真正走过去的方式，绝不慌乱。\n- **真实的光**——自然日光与诚实、温暖的调色，让房子在你到访那天，看起来就是它本来的样子。\n- **在地感**——这个街区、这些树、走到街角的那段路，让房子坐落在一个社区里，而不是凭空悬着。\n- **声音与节奏**——一种让房间得以呼吸、而非匆匆掠过的韵律。\n- **一个诚实的故事**——真正特别之处，用展示，而非吹嘘。\n\n我们让这份手艺，与 AI 辅助工具并肩——用于剪辑、中英双语字幕，以及判断哪些瞬间真正留住了注意力——让每一套房子走得更远，却始终不显刻意。\n\n## 这对卖家意味着什么\n\n更多「对的人」，更早看到这套房。意向往往来得更早，而早到的意向，就是筹码。这一切都不取代一组漂亮的照片、一份用心的房源说明——它是延伸，把房子带出门户网站，送进下一位买家正在浏览的信息流里。\n\n如果你正准备出售，想看看一套房子的故事可以怎样被讲述，[聊一聊](/contact)——或浏览我们当前的[房源](/listings)，看看这套打法如何运转。"
    }
  },
  {
    "slug": "first-investment-property-nyc",
    "date": "2026-04-02",
    "authorSlug": "linafeng",
    "cover": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80",
    "readMinutes": 6,
    "category": {
      "en": "Investing",
      "zh": "投资"
    },
    "title": {
      "en": "A First Investment Property in the New York Area: A Practical Primer",
      "zh": "在纽约置下第一套投资房：一份实用入门指南"
    },
    "excerpt": {
      "en": "Before you fall for a building, decide what you want it to do for you — cash flow today or appreciation over time — and let that one choice shape every number that follows.",
      "zh": "在爱上一栋房子之前，先想清楚你要它替你做什么——是今天的现金流，还是时间换来的增值——这一个选择，会决定之后的每一个数字。"
    },
    "body": {
      "en": "A first investment property is a different exercise from buying a home to live in. The home you live in answers to your life; the property you invest in answers to a spreadsheet. With roughly two decades in real estate — including investment and asset management — what we've learned is that the people who do well aren't the ones who find a secret deal. They're the ones who decide, before they look, what the property is supposed to do for them.\n\nThis is a primer, not financial advice. Every number below is illustrative. Your own situation deserves real numbers from your own lender, accountant, and attorney.\n\n## First, pick your scoreboard: cash flow or appreciation\n\nMost properties lean one way. A building that throws off income every month — rent comfortably above the mortgage, taxes, and upkeep — is a **cash flow** play. A building that barely breaks even but sits in a path of growth, where you're betting the value climbs over the years you hold it, is an **appreciation** play.\n\nNeither is better. They're different jobs. In and around New York, the more established, higher-priced neighborhoods often lean toward appreciation with thin monthly margins, while outer pockets and multi-family stock can pencil closer to real cash flow. What matters is that you know which scoreboard you're playing on — because it changes what you'll tolerate and what you'll walk away from.\n\n## Financing as an investor, not a homeowner\n\nThe rules change once a property isn't your primary residence. Expect a larger down payment — commonly in the range of 20–25% or more — and a slightly higher rate than an owner-occupant would see.\n\nMany investors think the way income-property lenders do: does the property's own rent cover its own debt? That's the idea behind a debt-service style ratio — rental income measured against the mortgage payment. When rent comfortably clears the payment, the deal stands on its own feet rather than leaning on your paycheck. Run that test early, on conservative rent assumptions, before you fall in love.\n\n## Estimate rent and expenses honestly\n\nThe fastest way to lose money is an optimistic spreadsheet. Build yours from what's actually true, not what you hope.\n\n- **Rent:** anchor to what comparable units nearby are actually leasing for today, not the top of the range.\n- **Vacancy:** assume the unit sits empty part of the year — it will, eventually.\n- **Taxes and insurance:** New York property taxes vary widely; get the real figures for the specific address.\n- **Maintenance and reserves:** old buildings are charming and expensive. Set money aside before something breaks, not after.\n- **Management:** whether you pay a manager or do it yourself, your time has a cost.\n\nWhat's left after all of it is your return. If a deal only works when everything goes perfectly, it doesn't work.\n\n## Why multi-family earns a closer look\n\nA two-to-four-unit building is often where new investors find their footing. Several income streams cushion a single vacancy, the cost per unit can be friendlier than buying separately, and in some cases one financing package covers the whole building. Older multi-family stock also carries its own questions — rent regulation, deferred maintenance, certificate of occupancy — which is exactly why the next step matters so much.\n\n## Do the due diligence\n\nThis is where good investors earn their margin. Read the leases. Confirm what tenants actually pay and what's actually owed. Inspect the roof, the heating, the foundation, the wiring. Check the certificate of occupancy against how the building is really used. Understand any rent regulation attached to the units. The goal isn't to talk yourself into the property — it's to find every reason it might not work, while you can still walk away cleanly.\n\nIf you're weighing your first investment in the New York area and want a clear-eyed read on the numbers, [reach out](/contact) — we're happy to walk through it with you, or you can start by browsing current [listings](/listings).",
      "zh": "买第一套投资房，和买一套自住房是两件事。自住房，要对你的生活负责；投资房，要对一张报表负责。我们在房地产行业做了近二十年——包括投资与资产管理——一路看下来，做得好的人，往往不是找到了什么秘密笋盘，而是在看房之前就想清楚了：这套房子，到底要替我做什么。\n\n这是一份入门指南，不是投资建议。下文所有数字仅作示意。你自己的情况，值得由你自己的贷款机构、会计师与律师，给出真实的数字。\n\n## 先选好你的记分牌：现金流，还是增值\n\n多数房子都有自己的偏向。每个月都能产生收入的房子——租金稳稳高过月供、地税与维护——做的是**现金流**这门生意。月月勉强打平、却踩在成长路径上、赌的是你持有这些年里价值往上走的房子，做的是**增值**这门生意。\n\n两者没有高下，只是工作不同。在纽约及周边，越成熟、越高价的区域往往偏向增值，月度利润很薄；而外围地段与多户型房源，则更可能算得出真正的现金流。重要的是，你得知道自己玩的是哪一块记分牌——因为它会决定你能忍受什么，又会为什么掉头就走。\n\n## 用投资者的方式融资，而不是自住者\n\n一旦房子不是你的主要居所，规则就变了。首付通常更高——常见在 20%–25% 甚至更多——利率也会比自住贷款略高一些。\n\n很多投资者会像收益型物业的贷款机构那样思考：这套房子自己的租金，能不能覆盖它自己的债务？这正是「偿债比」这类思路的核心——拿租金收入去对照月供。当租金能从容覆盖月供，这笔交易就站得住自己的脚，而不是靠你的工资单撑着。在动心之前，就用保守的租金假设，早早把这一关跑一遍。\n\n## 老老实实估算租金与开支\n\n亏钱最快的方式，是一张过分乐观的报表。你的报表，要建在事实上，而不是建在愿望上。\n\n- **租金：** 锚定附近同类房源今天真正租出去的价格，而不是区间的顶端。\n- **空置：** 假设一年里它会空一段时间——迟早会的。\n- **地税与保险：** 纽约地税差别很大，按具体地址拿到真实数字。\n- **维护与储备金：** 老房子有味道，也烧钱。在东西坏掉之前就备好钱，而不是之后。\n- **管理：** 无论你请人打理还是亲力亲为，你的时间都有成本。\n\n把这一切都减掉，剩下的才是你的回报。一笔只有在一切都完美时才成立的交易，其实并不成立。\n\n## 为什么多户型值得多看一眼\n\n两到四个单元的房子，常常是新手投资者站稳脚跟的地方。多条收入线能缓冲单个空置，每个单元的成本可能比分开购买更友好，有些情况下一份贷款方案还能覆盖整栋楼。较老的多户型房源也自带功课——租金管制、积压的维修、入住许可证——而这恰恰是为什么下一步如此关键。\n\n## 做足尽职调查\n\n好的投资者，利润就赚在这一步。把租约读一遍。核实租客实际付多少、实际欠多少。检查屋顶、供暖、地基与线路。把入住许可证和这栋楼真实的使用方式对一对。弄清楚单元上是否附着任何租金管制。这一步的目的，不是说服自己买下它——而是趁还能干净利落地走开时，找出它可能行不通的每一个理由。\n\n如果你正在掂量在纽约地区的第一套投资房，想要一份冷静、清醒的数字解读，[联系我们](/contact)——我们很乐意陪你把它走一遍；或者，你也可以先从当前的[房源](/listings)看起。"
    }
  },
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
