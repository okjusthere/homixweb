-- One-time bilingual advisor biography backfill.
-- Generated from the public agents table on 2026-08-02. The update is keyed by
-- exact profile id and fails closed if the source roster no longer matches.

BEGIN;

CREATE TEMP TABLE agent_bio_backfill ON COMMIT DROP AS
SELECT *
FROM jsonb_to_recordset($agent_bios$[
  {
    "id": "sunny",
    "bio": "Si Zhang (Sunny) began his real estate career in 2013 and spent six years with major property developers in China before moving to the United States in 2019. His earlier record includes ranking third nationwide in sales performance at Sunac China Holdings in 2016 and being recognized as Sales Champion for One Sino Park in 2017, with reported personal transactions of RMB 700 million (approximately US$99 million) that year.\n\nIn New York, Sunny combined brokerage work with digital media. He built an independent media company and a social audience of more than 400,000 followers, using content and distribution to expand exposure for property owners. In 2025, he founded Homix Realty to bring professional brokerage, digital branding, and modern real estate marketing together under one platform.",
    "bio_zh": "Si Zhang（Sunny）于2013年进入房地产行业，赴美前曾在中国大型房地产开发企业工作六年。其早期经历包括2016年在融创中国销售业绩全国排名第三，以及在2017年壹号院项目开盘后获得销售冠军；当年公开记录的个人成交额为人民币7亿元，约合9,900万美元。\n\n2019年来到美国后，Sunny 将纽约地产经纪业务与数字媒体结合。他创办独立媒体公司，在多个社交平台建立了超过40万名粉丝的内容社群，并通过内容传播帮助业主扩大房源曝光。2025年，他创立 Homix Realty，将专业经纪服务、数字品牌与现代地产营销整合到同一平台。"
  },
  {
    "id": "heidi",
    "bio": "Heidi Liu is a Co-Founder, Broker, and Branch Manager at Homix Realty with more than 13 years of full-time real estate experience. Her work spans buying, selling, renting, and investment, supported by a sales background and detailed knowledge of the New York market. She also advises property owners on staging, photography, and marketing, bringing the practical perspective of both a homeowner and an investor.\n\nBefore co-founding Homix, Heidi managed and mentored an agent team in Great Neck. Her professional record includes Top Producer recognition from 2014 through 2024, Platinum Awards in 2022, 2023, and 2025, Gold Awards in 2018, 2021, and 2024, RealTrends verification, and recognition among the Real Producers Top 500 Agents on Long Island.",
    "bio_zh": "Heidi Liu 是 Homix Realty 联合创始人、地产经纪人及分行经理，拥有超过13年的全职房地产经验。她的服务覆盖买房、卖房、租赁与投资，并结合销售背景和对纽约市场的深入理解，为客户提供清晰、客观的交易建议。她也协助业主完成房屋布置、摄影与营销，并以业主和投资者的实际经验理解不同客户的决策需求。\n\n创立 Homix 之前，Heidi 曾在大颈管理并培养经纪人团队。她的专业记录包括2014至2024年 Top Producer、2022、2023及2025年 Platinum Award、2018、2021及2024年 Gold Award，并入选 RealTrends Verified 及长岛 Real Producers Top 500 Agents。"
  },
  {
    "id": "queenie",
    "bio": "Yaoling Zhuang (Queenie) is a Co-Founder and Licensed Real Estate Agent at Homix Realty. Her cross-industry background includes international luxury hospitality, public service, cross-border real estate, and digital media. That experience informs her approach to customer experience, service design, brand presentation, and detail-focused operations.\n\nAt Homix, Queenie works at the intersection of premium client service and new-media strategy. She helps shape content and personal-brand systems for professionals in premium industries, with an emphasis on building clear positioning, sustained visibility, and long-term trust rather than one-off promotion.",
    "bio_zh": "Yaoling Zhuang（Queenie）是 Homix Realty 联合创始人及持牌地产经纪人。她拥有跨行业经历，覆盖国际高端酒店品牌、公共服务、跨境房地产与数字媒体，并将这些经验用于客户体验管理、服务流程设计、品牌表达与精细化运营。\n\n在 Homix，Queenie 负责连接高端客户服务与新媒体策略。她参与为高端行业专业人士搭建内容与个人品牌体系，重点不是一次性的宣传，而是清晰定位、持续曝光和长期信任的积累。"
  },
  {
    "id": "ericwei",
    "bio": "Zhengle Wei (Eric) is a Commercial Real Estate Advisor and Licensed Real Estate Salesperson at Homix Realty, serving the New York metropolitan market. He works with business owners, investors, and developers on leasing, acquisitions, dispositions, and investment-related real estate decisions.\n\nEric's experience covers office, retail, industrial, warehouse, and investment properties. His work emphasizes market analysis, site selection, lease negotiation, and transaction strategy aligned with each client's operating requirements and investment objectives.",
    "bio_zh": "Zhengle Wei（Eric）是 Homix Realty 商业地产顾问及纽约州持牌房地产销售员，服务纽约都会区的企业主、投资者与开发商，业务涵盖商业租赁、收购、出售及投资咨询。\n\nEric 的工作范围包括办公、零售、工业、仓储和投资型物业。他注重市场分析、选址、租约谈判与交易策略，并根据客户的经营需求和投资目标整理判断依据与执行路径。"
  },
  {
    "id": "michelleli",
    "bio": "Meixuan Li (Michelle) moved to the United States at age 18 and has lived in New York for more than a decade. Before entering real estate, she worked as an East Coast tour guide and in luxury retail, experiences that strengthened her communication skills and her ability to understand clients from different backgrounds.\n\nMichelle has worked in real estate since 2019, focusing on Queens, Manhattan, Long Island City, and Long Island. Her record includes multi-million-dollar annual sales. She supports buyers and sellers through market review, negotiation, and closing coordination, and provides service in English and Chinese.",
    "bio_zh": "Meixuan Li（Michelle）18岁来到美国留学，并已在纽约生活十余年。进入房地产行业前，她曾担任美国东部导游并从事奢侈品销售，这些经历帮助她建立了良好的沟通能力，也更善于理解不同背景客户的实际需求。\n\nMichelle 自2019年开始从事房地产工作，主要服务皇后区、曼哈顿、长岛市和长岛，年度销售额达到数百万美元。她为买卖双方提供市场分析、谈判及交割协调，并可使用中文和英文沟通。"
  },
  {
    "id": "yanxue",
    "bio": "Yan Xue Zheng (Christina) is a Licensed Associate Real Estate Broker whose real estate career spans nearly a decade. Her work ethic was formed early: she began working at age 13 while attending school and later built a foundation in sales and marketing before entering real estate.\n\nChristina works with families, buyers, sellers, and investors, combining negotiation and transaction guidance with a strong interest in staging, design, marketing, and photography. She has been recognized among the Top 10 agents in her company year after year. As both a homeowner and an investor, she brings practical experience to decisions involving presentation, value, and long-term ownership.",
    "bio_zh": "Yan Xue Zheng（Christina）是纽约州持牌房地产副经纪人，拥有近十年的地产从业经历。她13岁起便在求学期间开始工作，之后在进入房地产行业前积累了销售与市场营销经验，这些经历塑造了她重视责任、执行与持续跟进的工作方式。\n\nChristina 服务家庭、买家、卖家与投资者，并将谈判和交易管理与房屋布置、设计、营销及摄影结合。她连续多年进入所在公司的经纪人前十名。作为业主和投资者，她也能从实际持有与使用角度协助客户评估房屋展示、价值和长期规划。"
  },
  {
    "id": "linafeng",
    "bio": "Lina Feng began her real estate career in 2009 with a publicly listed property developer in China, where she advanced to project leader and worked across residential, luxury-villa, commercial, and asset-management projects. After moving to the United States, she brought that development-side experience into the New York market.\n\nLina supports clients with buying, selling, leasing, investment, and asset planning. Her approach combines transaction experience and market analysis with digital marketing and social-media distribution, helping owners present properties effectively while giving buyers and investors a structured basis for evaluating opportunities.",
    "bio_zh": "Lina Feng 于2009年进入房地产行业，曾在中国上市地产集团任职并晋升为项目负责人，参与住宅、别墅、商业地产及资产管理项目。移居美国后，她将开发商端的项目经验带入纽约房地产市场。\n\nLina 为客户提供买房、卖房、租赁、投资与资产规划服务。她把交易经验和市场分析与数字营销、社交媒体传播结合，帮助业主更有效地展示房产，也为买家和投资者提供结构清晰的机会评估依据。"
  },
  {
    "id": "jingjingfeng",
    "bio": "Jingjing Feng has lived on Long Island since moving to the United States in 2008, giving her long-term familiarity with its communities, school districts, waterfront areas, amenities, and investment environment. Before entering real estate, she spent more than a decade in the luxury-brand sector, where she was recognized as a North America Sales Champion and later served as a Senior Client Manager.\n\nJingjing focuses on luxury home sales, boutique rentals, cross-border real estate, Long Island school-district properties, and waterfront estates. She brings the service standards of luxury retail to property selection, presentation, privacy, and client communication, with particular attention to the expectations of high-net-worth and international clients.",
    "bio_zh": "Jingjing Feng 于2008年来到美国并长期居住在纽约长岛，对当地社区、学区、水岸环境、生活配套与投资市场拥有长期观察。进入房地产行业前，她曾在高端奢侈品牌领域工作十余年，获得过北美销售冠军，并担任国际品牌高级客户经理。\n\nJingjing 专注于长岛豪宅买卖、精品物业租赁、跨境置业、学区房与水岸住宅。她将奢侈品行业的服务标准带入房产筛选、展示、隐私保护和客户沟通，尤其重视高净值及国际客户对品质与定制化服务的要求。"
  },
  {
    "id": "kevinnli",
    "bio": "Kevinn Li is a Licensed Real Estate Salesperson serving New York and Long Island, as well as Creative Director and Lead Camera at Sona Media, a digital-media company partnered with Homix Realty. He holds a degree in Film and has participated in behind-the-scenes production for U.S. television and film projects.\n\nKevinn applies that production background to real estate marketing through professional photography, video walk-throughs, drone imagery, floor plans, and virtual staging. Working with the Homix and Sona teams, he connects visual presentation, social distribution, and on-the-ground showings to help sellers broaden exposure and buyers review homes more efficiently.",
    "bio_zh": "Kevinn Li 是服务纽约及长岛的持牌房地产销售员，同时担任与 Homix Realty 合作的 Sona Media 创意总监及主摄像。他拥有影视专业学位，并参与过美国电视剧和电影项目的幕后制作。\n\nKevinn 将影视制作经验用于地产营销，服务包括专业摄影、视频看房、无人机影像、户型图与虚拟布置。他与 Homix 及 Sona 团队协作，把视觉呈现、社交媒体传播和线下带看连接起来，帮助卖家扩大房源曝光，也让买家更高效地了解房产。"
  },
  {
    "id": "emmaniu",
    "bio": "Qian Niu (Emma) is a Licensed Real Estate Salesperson at Homix Realty with a background in administration and client service. She holds a Master of Health Administration, and her training emphasizes organization, communication, scheduling, and careful management of complex details.\n\nEmma brings those skills to real estate transactions, where timely follow-up and coordinated next steps are essential. She has a particular interest in supporting first-time buyers and works within the Homix team to help clients understand the process, organize information, and move from early planning toward closing with greater clarity.",
    "bio_zh": "Qian Niu（Emma）是 Homix Realty 纽约州持牌房地产销售员，拥有行政管理与客户服务背景，并取得医疗管理硕士学位。她的专业训练强调组织、沟通、时间安排以及对复杂细节的准确管理。\n\nEmma 将这些能力用于房地产交易中的资料整理、进度跟进和环节协调，并特别关注首次购房者的需求。她依托 Homix 团队帮助客户理解交易流程、梳理信息，并从前期规划到交割建立更清晰的执行路径。"
  },
  {
    "id": "gracexia",
    "bio": "Jiaer Xia (Grace) is a Licensed Real Estate Salesperson with Homix Realty. As part of a brokerage serving New York City and Long Island, Grace assists clients with the planning and coordination involved in residential real estate, whether they are exploring a purchase, preparing a property for market, or arranging a rental.\n\nGrace works within Homix's shared service platform, drawing on the team's market research, media capabilities, and transaction resources. Clients can use this profile to begin a focused conversation about timing, requirements, and the next practical step in their real estate plans.",
    "bio_zh": "Jiaer Xia (Grace) 是 Homix Realty 的纽约州持牌房地产销售员。作为服务纽约市及长岛的经纪团队成员，Grace 协助客户规划和协调住宅房地产事项，包括前期购房了解、房产上市准备和租赁安排。\n\nGrace 在 Homix 的共享服务平台中开展工作，可调用团队的市场研究、媒体传播与交易资源。客户可以通过该主页就时间安排、具体需求和置业计划中的下一项实际步骤展开沟通。"
  },
  {
    "id": "davidwang",
    "bio": "Wei Wang (David) is a Licensed Real Estate Salesperson at Homix Realty in New York. David provides a professional contact for clients who are considering a purchase, sale, or rental and want help defining their requirements, reviewing information, and keeping the transaction process organized.\n\nBacked by the Homix team, David has access to brokerage, marketing, and transaction-coordination resources designed for New York real estate clients. The aim is to give each client a clear starting point, a manageable sequence of next steps, and consistent support as plans develop.",
    "bio_zh": "Wei Wang (David) 是 Homix Realty 的纽约州持牌房地产销售员。对于正在考虑买房、卖房或租房的客户，David 可以协助明确需求、整理信息，并让交易过程保持有序。\n\n在 Homix 团队支持下，David 可以调用面向纽约房地产客户的经纪、营销与交易协调资源。服务目标是为每位客户建立清晰的起点、可执行的下一步顺序，并随着计划推进提供持续支持。"
  },
  {
    "id": "shellylin",
    "bio": "Shelly Lin is a Licensed Real Estate Salesperson with an entrepreneurial background in restaurants and wineries. Originally from Changle, Fuzhou, she has also guided her own child through the process of entering an Ivy League university, giving her a personal understanding of how education planning can shape a family's housing decisions.\n\nShelly focuses on New York and Long Island school-district homes for both primary residence and investment. She works with Chinese families who want to consider education choices and real estate allocation together, helping them organize priorities and evaluate suitable paths within the Homix platform.",
    "bio_zh": "Shelly Lin 是纽约州持牌房地产销售员，来自福州长乐，并拥有餐饮与酒庄创业经历。她曾陪伴自己的孩子完成藤校升学过程，因此能够从家庭实际经历理解教育规划如何影响居住与置业选择。\n\nShelly 关注纽约及长岛学区房、自住与投资需求，主要协助华人家庭把教育选择和房地产配置放在同一框架下考虑，梳理家庭优先级，并依托 Homix 平台评估适合的置业路径。"
  },
  {
    "id": "charlottezhang",
    "bio": "Charlotte Zhang is a Licensed Real Estate Salesperson at Homix Realty, serving clients through the firm's New York real estate platform. Charlotte works with buyers, sellers, and renters who need an organized way to understand available options, prepare transaction materials, and coordinate the professionals involved in a move.\n\nThrough Homix, Charlotte can connect clients with property search, listing presentation, market information, and transaction support. The focus is on turning a complex process into a sequence of understandable decisions while keeping the client's priorities visible at each stage.",
    "bio_zh": "Charlotte Zhang 是 Homix Realty 的纽约州持牌房地产销售员，通过公司的纽约房地产服务平台协助客户。Charlotte 面向买家、卖家和租客，帮助他们比较可选方案、准备交易资料，并协调置业过程中涉及的各方专业人士。\n\n依托 Homix，Charlotte 可以为客户连接房产搜索、房源展示、市场信息与交易支持。服务重点是把复杂流程拆解为可以理解和执行的决策步骤，并在每个阶段保持对客户优先事项的关注。"
  },
  {
    "id": "dannyhan",
    "bio": "Danny Han is a Licensed Real Estate Salesperson with Homix Realty. As part of a brokerage serving New York City and Long Island, Danny assists clients with the planning and coordination involved in residential real estate, whether they are exploring a purchase, preparing a property for market, or arranging a rental.\n\nDanny works within Homix's shared service platform, drawing on the team's market research, media capabilities, and transaction resources. Clients can use this profile to begin a focused conversation about timing, requirements, and the next practical step in their real estate plans.",
    "bio_zh": "Danny Han 是 Homix Realty 的纽约州持牌房地产销售员。作为服务纽约市及长岛的经纪团队成员，Danny 协助客户规划和协调住宅房地产事项，包括前期购房了解、房产上市准备和租赁安排。\n\nDanny 在 Homix 的共享服务平台中开展工作，可调用团队的市场研究、媒体传播与交易资源。客户可以通过该主页就时间安排、具体需求和置业计划中的下一项实际步骤展开沟通。"
  },
  {
    "id": "zoeyzhao",
    "bio": "Kai Zhao (Zoey) is a Licensed Real Estate Salesperson at Homix Realty in New York. Zoey provides a professional contact for clients who are considering a purchase, sale, or rental and want help defining their requirements, reviewing information, and keeping the transaction process organized.\n\nBacked by the Homix team, Zoey has access to brokerage, marketing, and transaction-coordination resources designed for New York real estate clients. The aim is to give each client a clear starting point, a manageable sequence of next steps, and consistent support as plans develop.",
    "bio_zh": "Kai Zhao (Zoey) 是 Homix Realty 的纽约州持牌房地产销售员。对于正在考虑买房、卖房或租房的客户，Zoey 可以协助明确需求、整理信息，并让交易过程保持有序。\n\n在 Homix 团队支持下，Zoey 可以调用面向纽约房地产客户的经纪、营销与交易协调资源。服务目标是为每位客户建立清晰的起点、可执行的下一步顺序，并随着计划推进提供持续支持。"
  },
  {
    "id": "tiffanywang",
    "bio": "Tiffany Wang is a Licensed Real Estate Salesperson serving New York City and Long Island. Her work covers residential purchases and sales, rentals, investment properties, first-time-buyer guidance, market analysis, and property valuation.\n\nTiffany uses local community, school-district, and market information to help clients structure buying or selling decisions. She works with buyers, sellers, renters, and investors on planning, pricing, property review, and transaction coordination, with an emphasis on keeping each stage clear, transparent, and aligned with the client's objectives.",
    "bio_zh": "Tiffany Wang 是服务纽约市及长岛的纽约州持牌房地产销售员，业务涵盖住宅买卖、租赁、投资型物业、首次购房指导、市场分析与房产估价。\n\nTiffany 结合社区、学区与市场信息，帮助客户梳理买房或卖房策略。她为买家、卖家、租客和投资者提供前期规划、定价、房产评估及交易协调，并注重让每个环节保持清晰、透明且符合客户的实际目标。"
  },
  {
    "id": "ryanhe",
    "bio": "Dongjian He (Ryan) is a Licensed Real Estate Salesperson at Homix Realty, serving clients through the firm's New York real estate platform. Ryan works with buyers, sellers, and renters who need an organized way to understand available options, prepare transaction materials, and coordinate the professionals involved in a move.\n\nThrough Homix, Ryan can connect clients with property search, listing presentation, market information, and transaction support. The focus is on turning a complex process into a sequence of understandable decisions while keeping the client's priorities visible at each stage.",
    "bio_zh": "Dongjian He (Ryan) 是 Homix Realty 的纽约州持牌房地产销售员，通过公司的纽约房地产服务平台协助客户。Ryan 面向买家、卖家和租客，帮助他们比较可选方案、准备交易资料，并协调置业过程中涉及的各方专业人士。\n\n依托 Homix，Ryan 可以为客户连接房产搜索、房源展示、市场信息与交易支持。服务重点是把复杂流程拆解为可以理解和执行的决策步骤，并在每个阶段保持对客户优先事项的关注。"
  },
  {
    "id": "waynelu",
    "bio": "Wen Quan Lu (Wayne) is a Licensed Real Estate Salesperson at Homix Realty. He approaches real estate as more than a transfer of property: each transaction is connected to a client's plans for home, stability, and belonging.\n\nWayne works with the Homix team to support buyers and sellers through the practical stages of a transaction, from understanding needs and reviewing options to coordinating the steps that lead toward closing. His profile reflects a service philosophy centered on trust, steady communication, and continued support beyond a single deal.",
    "bio_zh": "Wen Quan Lu（Wayne）是 Homix Realty 纽约州持牌房地产销售员。他把房地产交易理解为不止是房屋买卖，更关系到客户对家庭、稳定与归属感的长期规划。\n\nWayne 依托 Homix 团队协助买卖双方完成交易中的实际环节，从理解需求、比较选择到协调交割前的各项步骤。他重视信任、持续沟通与长期服务，希望客户得到的不只是一把钥匙，也是一条更清晰的安家路径。"
  },
  {
    "id": "sandyguan",
    "bio": "Shanshan Guan (Sandy) is a Licensed Real Estate Salesperson at Homix Realty in New York. Sandy provides a professional contact for clients who are considering a purchase, sale, or rental and want help defining their requirements, reviewing information, and keeping the transaction process organized.\n\nBacked by the Homix team, Sandy has access to brokerage, marketing, and transaction-coordination resources designed for New York real estate clients. The aim is to give each client a clear starting point, a manageable sequence of next steps, and consistent support as plans develop.",
    "bio_zh": "Shanshan Guan (Sandy) 是 Homix Realty 的纽约州持牌房地产销售员。对于正在考虑买房、卖房或租房的客户，Sandy 可以协助明确需求、整理信息，并让交易过程保持有序。\n\n在 Homix 团队支持下，Sandy 可以调用面向纽约房地产客户的经纪、营销与交易协调资源。服务目标是为每位客户建立清晰的起点、可执行的下一步顺序，并随着计划推进提供持续支持。"
  },
  {
    "id": "lilyliang",
    "bio": "Yi Yang Liang (Lily) is a Licensed Real Estate Salesperson with more than five years of experience. She serves clients across New York City's five boroughs and Long Island, with experience involving investment houses, condominiums, and co-ops.\n\nLily works with sellers on pricing, marketing, and negotiation, and helps buyers evaluate properties in the context of both practical needs and long-term goals. Her approach emphasizes integrity, professional preparation, and consistent attention throughout the transaction, recognizing that a home purchase or sale is a major personal and financial decision.",
    "bio_zh": "Yi Yang Liang（Lily）是拥有五年以上经验的纽约州持牌房地产销售员，服务范围覆盖纽约市五大区及长岛，涉及投资型住宅、公寓和合作公寓等房产类型。\n\nLily 为卖家提供定价、营销与谈判支持，也帮助买家结合实际居住需求和长期目标评估房产。她重视诚信、专业准备和交易过程中的持续跟进，并理解每一次买房或卖房都是重要的个人与财务决定。"
  },
  {
    "id": "dizhang",
    "bio": "Di Zhang is a Licensed Real Estate Salesperson at Homix Realty, serving clients through the firm's New York real estate platform. Di works with buyers, sellers, and renters who need an organized way to understand available options, prepare transaction materials, and coordinate the professionals involved in a move.\n\nThrough Homix, Di can connect clients with property search, listing presentation, market information, and transaction support. The focus is on turning a complex process into a sequence of understandable decisions while keeping the client's priorities visible at each stage.",
    "bio_zh": "Di Zhang 是 Homix Realty 的纽约州持牌房地产销售员，通过公司的纽约房地产服务平台协助客户。Di 面向买家、卖家和租客，帮助他们比较可选方案、准备交易资料，并协调置业过程中涉及的各方专业人士。\n\n依托 Homix，Di 可以为客户连接房产搜索、房源展示、市场信息与交易支持。服务重点是把复杂流程拆解为可以理解和执行的决策步骤，并在每个阶段保持对客户优先事项的关注。"
  },
  {
    "id": "rachelma",
    "bio": "Xiaoqian Ma (Rachel) is a Licensed Real Estate Salesperson with Homix Realty. As part of a brokerage serving New York City and Long Island, Rachel assists clients with the planning and coordination involved in residential real estate, whether they are exploring a purchase, preparing a property for market, or arranging a rental.\n\nRachel works within Homix's shared service platform, drawing on the team's market research, media capabilities, and transaction resources. Clients can use this profile to begin a focused conversation about timing, requirements, and the next practical step in their real estate plans.",
    "bio_zh": "Xiaoqian Ma (Rachel) 是 Homix Realty 的纽约州持牌房地产销售员。作为服务纽约市及长岛的经纪团队成员，Rachel 协助客户规划和协调住宅房地产事项，包括前期购房了解、房产上市准备和租赁安排。\n\nRachel 在 Homix 的共享服务平台中开展工作，可调用团队的市场研究、媒体传播与交易资源。客户可以通过该主页就时间安排、具体需求和置业计划中的下一项实际步骤展开沟通。"
  },
  {
    "id": "queeniecheung",
    "bio": "Queenie C is a Licensed Real Estate Salesperson at Homix Realty in New York. Queenie provides a professional contact for clients who are considering a purchase, sale, or rental and want help defining their requirements, reviewing information, and keeping the transaction process organized.\n\nBacked by the Homix team, Queenie has access to brokerage, marketing, and transaction-coordination resources designed for New York real estate clients. The aim is to give each client a clear starting point, a manageable sequence of next steps, and consistent support as plans develop.",
    "bio_zh": "Queenie C 是 Homix Realty 的纽约州持牌房地产销售员。对于正在考虑买房、卖房或租房的客户，Queenie 可以协助明确需求、整理信息，并让交易过程保持有序。\n\n在 Homix 团队支持下，Queenie 可以调用面向纽约房地产客户的经纪、营销与交易协调资源。服务目标是为每位客户建立清晰的起点、可执行的下一步顺序，并随着计划推进提供持续支持。"
  },
  {
    "id": "yukizhang",
    "bio": "Yan Zhang (Yuki) is a Licensed Real Estate Salesperson with Homix Realty in New York. Working within the Homix brokerage team, Yuki supports clients as they prepare to buy, sell, or rent a home and helps organize the practical steps from early planning and property review through offer preparation and closing coordination.\n\nYuki's public profile serves as a direct point of contact for clients seeking access to Homix's local market, marketing, and transaction resources. The service process is structured around clear information, timely next steps, and decisions aligned with each client's stated goals.",
    "bio_zh": "Yan Zhang (Yuki) 是 Homix Realty 的纽约州持牌房地产销售员。Yuki 依托 Homix 经纪团队，为准备买房、卖房或租房的客户提供支持，并协助梳理从前期规划、房产评估、报价准备到交割协调的实际步骤。\n\n该个人主页为客户提供直接联系Yuki 的入口，并连接 Homix 的本地市场、房产营销和交易执行资源。服务过程强调信息清晰、下一步明确，并围绕客户已经确认的目标推进决策。"
  },
  {
    "id": "angelalin",
    "bio": "Jianxiu Lin (Angela) is a Licensed Real Estate Salesperson at Homix Realty, serving clients through the firm's New York real estate platform. Angela works with buyers, sellers, and renters who need an organized way to understand available options, prepare transaction materials, and coordinate the professionals involved in a move.\n\nThrough Homix, Angela can connect clients with property search, listing presentation, market information, and transaction support. The focus is on turning a complex process into a sequence of understandable decisions while keeping the client's priorities visible at each stage.",
    "bio_zh": "Jianxiu Lin (Angela) 是 Homix Realty 的纽约州持牌房地产销售员，通过公司的纽约房地产服务平台协助客户。Angela 面向买家、卖家和租客，帮助他们比较可选方案、准备交易资料，并协调置业过程中涉及的各方专业人士。\n\n依托 Homix，Angela 可以为客户连接房产搜索、房源展示、市场信息与交易支持。服务重点是把复杂流程拆解为可以理解和执行的决策步骤，并在每个阶段保持对客户优先事项的关注。"
  },
  {
    "id": "davidhu",
    "bio": "David Hu is a Licensed Real Estate Salesperson with Homix Realty. As part of a brokerage serving New York City and Long Island, David assists clients with the planning and coordination involved in residential real estate, whether they are exploring a purchase, preparing a property for market, or arranging a rental.\n\nDavid works within Homix's shared service platform, drawing on the team's market research, media capabilities, and transaction resources. Clients can use this profile to begin a focused conversation about timing, requirements, and the next practical step in their real estate plans.",
    "bio_zh": "David Hu 是 Homix Realty 的纽约州持牌房地产销售员。作为服务纽约市及长岛的经纪团队成员，David 协助客户规划和协调住宅房地产事项，包括前期购房了解、房产上市准备和租赁安排。\n\nDavid 在 Homix 的共享服务平台中开展工作，可调用团队的市场研究、媒体传播与交易资源。客户可以通过该主页就时间安排、具体需求和置业计划中的下一项实际步骤展开沟通。"
  },
  {
    "id": "kylehuang",
    "bio": "Huizhong Huang (Kyle) is a Licensed Real Estate Salesperson at Homix Realty in New York. Kyle provides a professional contact for clients who are considering a purchase, sale, or rental and want help defining their requirements, reviewing information, and keeping the transaction process organized.\n\nBacked by the Homix team, Kyle has access to brokerage, marketing, and transaction-coordination resources designed for New York real estate clients. The aim is to give each client a clear starting point, a manageable sequence of next steps, and consistent support as plans develop.",
    "bio_zh": "Huizhong Huang (Kyle) 是 Homix Realty 的纽约州持牌房地产销售员。对于正在考虑买房、卖房或租房的客户，Kyle 可以协助明确需求、整理信息，并让交易过程保持有序。\n\n在 Homix 团队支持下，Kyle 可以调用面向纽约房地产客户的经纪、营销与交易协调资源。服务目标是为每位客户建立清晰的起点、可执行的下一步顺序，并随着计划推进提供持续支持。"
  },
  {
    "id": "xueyaozou",
    "bio": "Austin Zou is a Licensed Real Estate Salesperson focused on Long Island, including the Gold Coast, as well as Queens and the broader New York market. He uses a data-informed approach to help families, business owners, buyers, and sellers evaluate real estate decisions in the context of equity and long-term ownership.\n\nAustin's work includes local market analysis, negotiation, identifying off-market opportunities, and positioning homes for sale. He treats real estate as part of a client's wider financial and family planning, bringing a direct, investment-conscious perspective to both property searches and listing strategy.",
    "bio_zh": "Austin Zou 是纽约州持牌房地产销售员，主要关注长岛金海岸、皇后区及大纽约市场。他采用数据导向的方法，协助家庭、企业主、买家和卖家从房产权益与长期持有角度评估置业决策。\n\nAustin 的工作包括本地市场分析、谈判、寻找非公开市场机会以及卖房定位。他将房地产视为客户整体家庭与财务规划的一部分，为找房和房源营销提供直接、重视投资逻辑的判断。"
  },
  {
    "id": "shawnzhang",
    "bio": "Xiaoyi Zhang (Shawn) is a Licensed Real Estate Salesperson at Homix Realty, serving clients through the firm's New York real estate platform. Shawn works with buyers, sellers, and renters who need an organized way to understand available options, prepare transaction materials, and coordinate the professionals involved in a move.\n\nThrough Homix, Shawn can connect clients with property search, listing presentation, market information, and transaction support. The focus is on turning a complex process into a sequence of understandable decisions while keeping the client's priorities visible at each stage.",
    "bio_zh": "Xiaoyi Zhang (Shawn) 是 Homix Realty 的纽约州持牌房地产销售员，通过公司的纽约房地产服务平台协助客户。Shawn 面向买家、卖家和租客，帮助他们比较可选方案、准备交易资料，并协调置业过程中涉及的各方专业人士。\n\n依托 Homix，Shawn 可以为客户连接房产搜索、房源展示、市场信息与交易支持。服务重点是把复杂流程拆解为可以理解和执行的决策步骤，并在每个阶段保持对客户优先事项的关注。"
  },
  {
    "id": "bingwu",
    "bio": "Bing Wu is a Licensed Salesperson (NY) · Broker (CA) with Homix Realty. As part of a brokerage serving New York City and Long Island, Bing assists clients with the planning and coordination involved in residential real estate, whether they are exploring a purchase, preparing a property for market, or arranging a rental.\n\nBing works within Homix's shared service platform, drawing on the team's market research, media capabilities, and transaction resources. Clients can use this profile to begin a focused conversation about timing, requirements, and the next practical step in their real estate plans.",
    "bio_zh": "Bing Wu 是 Homix Realty 的纽约州持牌房地产销售员及加州地产经纪人。作为服务纽约市及长岛的经纪团队成员，Bing 协助客户规划和协调住宅房地产事项，包括前期购房了解、房产上市准备和租赁安排。\n\nBing 在 Homix 的共享服务平台中开展工作，可调用团队的市场研究、媒体传播与交易资源。客户可以通过该主页就时间安排、具体需求和置业计划中的下一项实际步骤展开沟通。"
  },
  {
    "id": "jaydoncai",
    "bio": "Congyuan Cai (Jaydon) is a Licensed Real Estate Salesperson at Homix Realty in New York. Jaydon provides a professional contact for clients who are considering a purchase, sale, or rental and want help defining their requirements, reviewing information, and keeping the transaction process organized.\n\nBacked by the Homix team, Jaydon has access to brokerage, marketing, and transaction-coordination resources designed for New York real estate clients. The aim is to give each client a clear starting point, a manageable sequence of next steps, and consistent support as plans develop.",
    "bio_zh": "Congyuan Cai (Jaydon) 是 Homix Realty 的纽约州持牌房地产销售员。对于正在考虑买房、卖房或租房的客户，Jaydon 可以协助明确需求、整理信息，并让交易过程保持有序。\n\n在 Homix 团队支持下，Jaydon 可以调用面向纽约房地产客户的经纪、营销与交易协调资源。服务目标是为每位客户建立清晰的起点、可执行的下一步顺序，并随着计划推进提供持续支持。"
  },
  {
    "id": "stevenchang",
    "bio": "Yong Sheng Zhang (Steven) is a Licensed Real Estate Salesperson with Homix Realty in New York. Working within the Homix brokerage team, Steven supports clients as they prepare to buy, sell, or rent a home and helps organize the practical steps from early planning and property review through offer preparation and closing coordination.\n\nSteven's public profile serves as a direct point of contact for clients seeking access to Homix's local market, marketing, and transaction resources. The service process is structured around clear information, timely next steps, and decisions aligned with each client's stated goals.",
    "bio_zh": "Yong Sheng Zhang (Steven) 是 Homix Realty 的纽约州持牌房地产销售员。Steven 依托 Homix 经纪团队，为准备买房、卖房或租房的客户提供支持，并协助梳理从前期规划、房产评估、报价准备到交割协调的实际步骤。\n\n该个人主页为客户提供直接联系Steven 的入口，并连接 Homix 的本地市场、房产营销和交易执行资源。服务过程强调信息清晰、下一步明确，并围绕客户已经确认的目标推进决策。"
  },
  {
    "id": "junlincao",
    "bio": "Chelsea Cao is a Licensed Real Estate Salesperson specializing in Long Island and the greater New York area, with a focus on luxury and investment properties across Nassau and Suffolk counties. She works with buyers, sellers, and investors on residential real estate decisions.\n\nChelsea provides service in English and Mandarin, supporting local, Chinese-speaking, and international clients through property review, transaction planning, and communication across each stage of buying or selling. Her approach emphasizes professional guidance, clear information, and a plan tailored to the client's priorities.",
    "bio_zh": "Chelsea Cao 是纽约州持牌房地产销售员，主要服务长岛及大纽约地区，并关注 Nassau、Suffolk 两县的豪宅与投资型物业。她为买家、卖家和投资者提供住宅房地产服务。\n\nChelsea 可使用中文和英文沟通，协助本地、华语及国际客户完成房产评估、交易规划和买卖过程中的各项协调。她重视专业建议、清晰信息，以及根据客户优先事项制定个性化方案。"
  },
  {
    "id": "reannechen",
    "bio": "Reanne Chen is a Licensed Real Estate Salesperson with Homix Realty. As part of a brokerage serving New York City and Long Island, Reanne assists clients with the planning and coordination involved in residential real estate, whether they are exploring a purchase, preparing a property for market, or arranging a rental.\n\nReanne works within Homix's shared service platform, drawing on the team's market research, media capabilities, and transaction resources. Clients can use this profile to begin a focused conversation about timing, requirements, and the next practical step in their real estate plans.",
    "bio_zh": "Reanne Chen 是 Homix Realty 的纽约州持牌房地产销售员。作为服务纽约市及长岛的经纪团队成员，Reanne 协助客户规划和协调住宅房地产事项，包括前期购房了解、房产上市准备和租赁安排。\n\nReanne 在 Homix 的共享服务平台中开展工作，可调用团队的市场研究、媒体传播与交易资源。客户可以通过该主页就时间安排、具体需求和置业计划中的下一项实际步骤展开沟通。"
  },
  {
    "id": "pengxuhu",
    "bio": "Pengxu Hu is a Licensed Real Estate Salesperson at Homix Realty in New York. Pengxu provides a professional contact for clients who are considering a purchase, sale, or rental and want help defining their requirements, reviewing information, and keeping the transaction process organized.\n\nBacked by the Homix team, Pengxu has access to brokerage, marketing, and transaction-coordination resources designed for New York real estate clients. The aim is to give each client a clear starting point, a manageable sequence of next steps, and consistent support as plans develop.",
    "bio_zh": "Pengxu Hu 是 Homix Realty 的纽约州持牌房地产销售员。对于正在考虑买房、卖房或租房的客户，Pengxu 可以协助明确需求、整理信息，并让交易过程保持有序。\n\n在 Homix 团队支持下，Pengxu 可以调用面向纽约房地产客户的经纪、营销与交易协调资源。服务目标是为每位客户建立清晰的起点、可执行的下一步顺序，并随着计划推进提供持续支持。"
  },
  {
    "id": "chunchinyang",
    "bio": "Chun Chin Yang is a Licensed Real Estate Salesperson with Homix Realty in New York. Working within the Homix brokerage team, Chun supports clients as they prepare to buy, sell, or rent a home and helps organize the practical steps from early planning and property review through offer preparation and closing coordination.\n\nChun's public profile serves as a direct point of contact for clients seeking access to Homix's local market, marketing, and transaction resources. The service process is structured around clear information, timely next steps, and decisions aligned with each client's stated goals.",
    "bio_zh": "Chun Chin Yang 是 Homix Realty 的纽约州持牌房地产销售员。Chun 依托 Homix 经纪团队，为准备买房、卖房或租房的客户提供支持，并协助梳理从前期规划、房产评估、报价准备到交割协调的实际步骤。\n\n该个人主页为客户提供直接联系Chun 的入口，并连接 Homix 的本地市场、房产营销和交易执行资源。服务过程强调信息清晰、下一步明确，并围绕客户已经确认的目标推进决策。"
  },
  {
    "id": "yukeyhoo",
    "bio": "Yukey Hoo is a Licensed Real Estate Salesperson at Homix Realty, serving clients through the firm's New York real estate platform. Yukey works with buyers, sellers, and renters who need an organized way to understand available options, prepare transaction materials, and coordinate the professionals involved in a move.\n\nThrough Homix, Yukey can connect clients with property search, listing presentation, market information, and transaction support. The focus is on turning a complex process into a sequence of understandable decisions while keeping the client's priorities visible at each stage.",
    "bio_zh": "Yukey Hoo 是 Homix Realty 的纽约州持牌房地产销售员，通过公司的纽约房地产服务平台协助客户。Yukey 面向买家、卖家和租客，帮助他们比较可选方案、准备交易资料，并协调置业过程中涉及的各方专业人士。\n\n依托 Homix，Yukey 可以为客户连接房产搜索、房源展示、市场信息与交易支持。服务重点是把复杂流程拆解为可以理解和执行的决策步骤，并在每个阶段保持对客户优先事项的关注。"
  },
  {
    "id": "winarkotanumiharjo",
    "bio": "Winarko Tanumiharjo is a Licensed Real Estate Salesperson with Homix Realty. As part of a brokerage serving New York City and Long Island, Winarko assists clients with the planning and coordination involved in residential real estate, whether they are exploring a purchase, preparing a property for market, or arranging a rental.\n\nWinarko works within Homix's shared service platform, drawing on the team's market research, media capabilities, and transaction resources. Clients can use this profile to begin a focused conversation about timing, requirements, and the next practical step in their real estate plans.",
    "bio_zh": "Winarko Tanumiharjo 是 Homix Realty 的纽约州持牌房地产销售员。作为服务纽约市及长岛的经纪团队成员，Winarko 协助客户规划和协调住宅房地产事项，包括前期购房了解、房产上市准备和租赁安排。\n\nWinarko 在 Homix 的共享服务平台中开展工作，可调用团队的市场研究、媒体传播与交易资源。客户可以通过该主页就时间安排、具体需求和置业计划中的下一项实际步骤展开沟通。"
  },
  {
    "id": "yufeiwang",
    "bio": "Yufei Wang is a Licensed Real Estate Salesperson at Homix Realty in New York. Yufei provides a professional contact for clients who are considering a purchase, sale, or rental and want help defining their requirements, reviewing information, and keeping the transaction process organized.\n\nBacked by the Homix team, Yufei has access to brokerage, marketing, and transaction-coordination resources designed for New York real estate clients. The aim is to give each client a clear starting point, a manageable sequence of next steps, and consistent support as plans develop.",
    "bio_zh": "Yufei Wang 是 Homix Realty 的纽约州持牌房地产销售员。对于正在考虑买房、卖房或租房的客户，Yufei 可以协助明确需求、整理信息，并让交易过程保持有序。\n\n在 Homix 团队支持下，Yufei 可以调用面向纽约房地产客户的经纪、营销与交易协调资源。服务目标是为每位客户建立清晰的起点、可执行的下一步顺序，并随着计划推进提供持续支持。"
  },
  {
    "id": "yilinwang",
    "bio": "Yilin Wang is a Licensed Real Estate Salesperson with Homix Realty in New York. Working within the Homix brokerage team, Yilin supports clients as they prepare to buy, sell, or rent a home and helps organize the practical steps from early planning and property review through offer preparation and closing coordination.\n\nYilin's public profile serves as a direct point of contact for clients seeking access to Homix's local market, marketing, and transaction resources. The service process is structured around clear information, timely next steps, and decisions aligned with each client's stated goals.",
    "bio_zh": "Yilin Wang 是 Homix Realty 的纽约州持牌房地产销售员。Yilin 依托 Homix 经纪团队，为准备买房、卖房或租房的客户提供支持，并协助梳理从前期规划、房产评估、报价准备到交割协调的实际步骤。\n\n该个人主页为客户提供直接联系Yilin 的入口，并连接 Homix 的本地市场、房产营销和交易执行资源。服务过程强调信息清晰、下一步明确，并围绕客户已经确认的目标推进决策。"
  },
  {
    "id": "evama",
    "bio": "Eva Y. Ma is a Licensed Real Estate Salesperson at Homix Realty, serving clients through the firm's New York real estate platform. Eva works with buyers, sellers, and renters who need an organized way to understand available options, prepare transaction materials, and coordinate the professionals involved in a move.\n\nThrough Homix, Eva can connect clients with property search, listing presentation, market information, and transaction support. The focus is on turning a complex process into a sequence of understandable decisions while keeping the client's priorities visible at each stage.",
    "bio_zh": "Eva Y. Ma 是 Homix Realty 的纽约州持牌房地产销售员，通过公司的纽约房地产服务平台协助客户。Eva 面向买家、卖家和租客，帮助他们比较可选方案、准备交易资料，并协调置业过程中涉及的各方专业人士。\n\n依托 Homix，Eva 可以为客户连接房产搜索、房源展示、市场信息与交易支持。服务重点是把复杂流程拆解为可以理解和执行的决策步骤，并在每个阶段保持对客户优先事项的关注。"
  },
  {
    "id": "qinghe",
    "bio": "Qing He is a Licensed Real Estate Salesperson with Homix Realty. As part of a brokerage serving New York City and Long Island, Qing assists clients with the planning and coordination involved in residential real estate, whether they are exploring a purchase, preparing a property for market, or arranging a rental.\n\nQing works within Homix's shared service platform, drawing on the team's market research, media capabilities, and transaction resources. Clients can use this profile to begin a focused conversation about timing, requirements, and the next practical step in their real estate plans.",
    "bio_zh": "Qing He 是 Homix Realty 的纽约州持牌房地产销售员。作为服务纽约市及长岛的经纪团队成员，Qing 协助客户规划和协调住宅房地产事项，包括前期购房了解、房产上市准备和租赁安排。\n\nQing 在 Homix 的共享服务平台中开展工作，可调用团队的市场研究、媒体传播与交易资源。客户可以通过该主页就时间安排、具体需求和置业计划中的下一项实际步骤展开沟通。"
  },
  {
    "id": "defenghuang",
    "bio": "Defeng (Michelle) Huang is a Licensed Real Estate Salesperson focused on residential real estate in New York. She takes a strategy-led approach to buying and selling, helping clients organize the information and decision points that matter before they enter a transaction.\n\nFor buyers, Michelle works to create a clear path for comparing options and understanding tradeoffs. For sellers, she focuses on pricing and market positioning so that a property enters the market with a considered presentation and a plan aligned with the owner's goals.",
    "bio_zh": "Defeng（Michelle）Huang 是专注纽约住宅房地产的持牌房地产销售员。她以策略驱动买卖决策，帮助客户在进入交易前梳理关键信息、判断节点与执行顺序。\n\n服务买家时，Michelle 注重建立清晰的选房路径，并帮助客户理解不同选择之间的取舍；服务卖家时，她关注定价与市场定位，让房产以经过规划的方式进入市场，并与业主的目标保持一致。"
  },
  {
    "id": "yixianli",
    "bio": "Jennifer Yixian Li has more than 12 years of New York real estate experience. Her work covers Long Island luxury homes, school-district properties, investment assets, commercial real estate, leasing, and business sales across Nassau County, Suffolk County, Queens, and New York City.\n\nJennifer uses data analysis, pricing, and marketing strategy to help sellers prepare for the market and buyers identify opportunities in complex conditions. She provides service in English and Chinese and works with residential, commercial, and investment clients, with the goal of remaining a long-term real estate resource beyond a single transaction.",
    "bio_zh": "Jennifer Yixian Li 拥有12年以上纽约地产经验，业务涵盖长岛豪宅、学区房、投资物业、商业地产买卖租赁及生意买卖，服务区域包括 Nassau County、Suffolk County、Queens 和纽约市。\n\nJennifer 通过数据分析、定价与营销策略协助卖家做好上市准备，也帮助买家在复杂市场中识别机会。她可提供中英文服务，覆盖住宅、商业和投资客户，并希望在单次交易之外成为客户长期可信赖的房地产顾问。"
  },
  {
    "id": "yinchunwu",
    "bio": "Elaine Wu is a Licensed Real Estate Salesperson at Homix Realty, serving clients through the firm's New York real estate platform. Elaine works with buyers, sellers, and renters who need an organized way to understand available options, prepare transaction materials, and coordinate the professionals involved in a move.\n\nThrough Homix, Elaine can connect clients with property search, listing presentation, market information, and transaction support. The focus is on turning a complex process into a sequence of understandable decisions while keeping the client's priorities visible at each stage.",
    "bio_zh": "Elaine Wu 是 Homix Realty 的纽约州持牌房地产销售员，通过公司的纽约房地产服务平台协助客户。Elaine 面向买家、卖家和租客，帮助他们比较可选方案、准备交易资料，并协调置业过程中涉及的各方专业人士。\n\n依托 Homix，Elaine 可以为客户连接房产搜索、房源展示、市场信息与交易支持。服务重点是把复杂流程拆解为可以理解和执行的决策步骤，并在每个阶段保持对客户优先事项的关注。"
  },
  {
    "id": "jinxiuyang",
    "bio": "Jinxiu Yang is a Licensed Real Estate Salesperson with Homix Realty. As part of a brokerage serving New York City and Long Island, Jinxiu assists clients with the planning and coordination involved in residential real estate, whether they are exploring a purchase, preparing a property for market, or arranging a rental.\n\nJinxiu works within Homix's shared service platform, drawing on the team's market research, media capabilities, and transaction resources. Clients can use this profile to begin a focused conversation about timing, requirements, and the next practical step in their real estate plans.",
    "bio_zh": "Jinxiu Yang 是 Homix Realty 的纽约州持牌房地产销售员。作为服务纽约市及长岛的经纪团队成员，Jinxiu 协助客户规划和协调住宅房地产事项，包括前期购房了解、房产上市准备和租赁安排。\n\nJinxiu 在 Homix 的共享服务平台中开展工作，可调用团队的市场研究、媒体传播与交易资源。客户可以通过该主页就时间安排、具体需求和置业计划中的下一项实际步骤展开沟通。"
  },
  {
    "id": "honglongchen",
    "bio": "Honglong Chen is a Licensed Real Estate Salesperson at Homix Realty in New York. Honglong provides a professional contact for clients who are considering a purchase, sale, or rental and want help defining their requirements, reviewing information, and keeping the transaction process organized.\n\nBacked by the Homix team, Honglong has access to brokerage, marketing, and transaction-coordination resources designed for New York real estate clients. The aim is to give each client a clear starting point, a manageable sequence of next steps, and consistent support as plans develop.",
    "bio_zh": "Honglong Chen 是 Homix Realty 的纽约州持牌房地产销售员。对于正在考虑买房、卖房或租房的客户，Honglong 可以协助明确需求、整理信息，并让交易过程保持有序。\n\n在 Homix 团队支持下，Honglong 可以调用面向纽约房地产客户的经纪、营销与交易协调资源。服务目标是为每位客户建立清晰的起点、可执行的下一步顺序，并随着计划推进提供持续支持。"
  },
  {
    "id": "vicky-wang",
    "bio": "Vicky Wang is a Licensed Real Estate Salesperson with Homix Realty in New York. Working within the Homix brokerage team, Vicky supports clients as they prepare to buy, sell, or rent a home and helps organize the practical steps from early planning and property review through offer preparation and closing coordination.\n\nVicky's public profile serves as a direct point of contact for clients seeking access to Homix's local market, marketing, and transaction resources. The service process is structured around clear information, timely next steps, and decisions aligned with each client's stated goals.",
    "bio_zh": "Vicky Wang 是 Homix Realty 的纽约州持牌房地产销售员。Vicky 依托 Homix 经纪团队，为准备买房、卖房或租房的客户提供支持，并协助梳理从前期规划、房产评估、报价准备到交割协调的实际步骤。\n\n该个人主页为客户提供直接联系Vicky 的入口，并连接 Homix 的本地市场、房产营销和交易执行资源。服务过程强调信息清晰、下一步明确，并围绕客户已经确认的目标推进决策。"
  },
  {
    "id": "sunnychen",
    "bio": "Sunny Chen is a Licensed Real Estate Salesperson who has lived in her local Queens community for 17 years. That long-term connection gives her particular familiarity with College Point and Whitestone and with the everyday housing questions that matter to residents considering a move within the area.\n\nAt Homix Realty, Sunny supports buyers and sellers who want current local context and an organized path through the transaction. She combines neighborhood familiarity with the Homix team's market, marketing, and transaction resources to help clients review options and plan their next steps.",
    "bio_zh": "Sunny Chen 是纽约州持牌房地产销售员，已在所在的皇后区社区生活17年，对大学点、白石镇以及当地居民在置业和换房时关注的实际问题较为熟悉。\n\n在 Homix Realty，Sunny 为希望了解最新社区市场的买家和卖家提供服务，并依托 Homix 团队的市场、营销和交易资源，帮助客户比较不同选择、梳理流程并规划下一步。"
  },
  {
    "id": "evaliu",
    "bio": "EvaLiu is a Licensed Real Estate Salesperson with Homix Realty. As part of a brokerage serving New York City and Long Island, EvaLiu assists clients with the planning and coordination involved in residential real estate, whether they are exploring a purchase, preparing a property for market, or arranging a rental.\n\nEvaLiu works within Homix's shared service platform, drawing on the team's market research, media capabilities, and transaction resources. Clients can use this profile to begin a focused conversation about timing, requirements, and the next practical step in their real estate plans.",
    "bio_zh": "EvaLiu 是 Homix Realty 的纽约州持牌房地产销售员。作为服务纽约市及长岛的经纪团队成员，EvaLiu 协助客户规划和协调住宅房地产事项，包括前期购房了解、房产上市准备和租赁安排。\n\nEvaLiu 在 Homix 的共享服务平台中开展工作，可调用团队的市场研究、媒体传播与交易资源。客户可以通过该主页就时间安排、具体需求和置业计划中的下一项实际步骤展开沟通。"
  },
  {
    "id": "devinchen",
    "bio": "devinchen is a Licensed Real Estate Salesperson at Homix Realty in New York. devinchen provides a professional contact for clients who are considering a purchase, sale, or rental and want help defining their requirements, reviewing information, and keeping the transaction process organized.\n\nBacked by the Homix team, devinchen has access to brokerage, marketing, and transaction-coordination resources designed for New York real estate clients. The aim is to give each client a clear starting point, a manageable sequence of next steps, and consistent support as plans develop.",
    "bio_zh": "devinchen 是 Homix Realty 的纽约州持牌房地产销售员。对于正在考虑买房、卖房或租房的客户，devinchen 可以协助明确需求、整理信息，并让交易过程保持有序。\n\n在 Homix 团队支持下，devinchen 可以调用面向纽约房地产客户的经纪、营销与交易协调资源。服务目标是为每位客户建立清晰的起点、可执行的下一步顺序，并随着计划推进提供持续支持。"
  },
  {
    "id": "zhengle-wei-eric",
    "bio": "ZHENGLE WEI (Eric) is a Licensed Real Estate Salesperson with Homix Realty in New York. Working within the Homix brokerage team, Eric supports clients as they prepare to buy, sell, or rent a home and helps organize the practical steps from early planning and property review through offer preparation and closing coordination.\n\nEric's public profile serves as a direct point of contact for clients seeking access to Homix's local market, marketing, and transaction resources. The service process is structured around clear information, timely next steps, and decisions aligned with each client's stated goals.",
    "bio_zh": "ZHENGLE WEI (Eric) 是 Homix Realty 的纽约州持牌房地产销售员。Eric 依托 Homix 经纪团队，为准备买房、卖房或租房的客户提供支持，并协助梳理从前期规划、房产评估、报价准备到交割协调的实际步骤。\n\n该个人主页为客户提供直接联系Eric 的入口，并连接 Homix 的本地市场、房产营销和交易执行资源。服务过程强调信息清晰、下一步明确，并围绕客户已经确认的目标推进决策。"
  },
  {
    "id": "jueyao-lu",
    "bio": "Jueyao Lu is a Licensed Real Estate Salesperson at Homix Realty, serving clients through the firm's New York real estate platform. Jueyao works with buyers, sellers, and renters who need an organized way to understand available options, prepare transaction materials, and coordinate the professionals involved in a move.\n\nThrough Homix, Jueyao can connect clients with property search, listing presentation, market information, and transaction support. The focus is on turning a complex process into a sequence of understandable decisions while keeping the client's priorities visible at each stage.",
    "bio_zh": "Jueyao Lu 是 Homix Realty 的纽约州持牌房地产销售员，通过公司的纽约房地产服务平台协助客户。Jueyao 面向买家、卖家和租客，帮助他们比较可选方案、准备交易资料，并协调置业过程中涉及的各方专业人士。\n\n依托 Homix，Jueyao 可以为客户连接房产搜索、房源展示、市场信息与交易支持。服务重点是把复杂流程拆解为可以理解和执行的决策步骤，并在每个阶段保持对客户优先事项的关注。"
  },
  {
    "id": "jinzhao-li",
    "bio": "Jinzhao Li is a Licensed Real Estate Salesperson with Homix Realty. As part of a brokerage serving New York City and Long Island, Jinzhao assists clients with the planning and coordination involved in residential real estate, whether they are exploring a purchase, preparing a property for market, or arranging a rental.\n\nJinzhao works within Homix's shared service platform, drawing on the team's market research, media capabilities, and transaction resources. Clients can use this profile to begin a focused conversation about timing, requirements, and the next practical step in their real estate plans.",
    "bio_zh": "Jinzhao Li 是 Homix Realty 的纽约州持牌房地产销售员。作为服务纽约市及长岛的经纪团队成员，Jinzhao 协助客户规划和协调住宅房地产事项，包括前期购房了解、房产上市准备和租赁安排。\n\nJinzhao 在 Homix 的共享服务平台中开展工作，可调用团队的市场研究、媒体传播与交易资源。客户可以通过该主页就时间安排、具体需求和置业计划中的下一项实际步骤展开沟通。"
  },
  {
    "id": "yini-cui",
    "bio": "Yini Cui is a Licensed Real Estate Salesperson at Homix Realty in New York. Yini provides a professional contact for clients who are considering a purchase, sale, or rental and want help defining their requirements, reviewing information, and keeping the transaction process organized.\n\nBacked by the Homix team, Yini has access to brokerage, marketing, and transaction-coordination resources designed for New York real estate clients. The aim is to give each client a clear starting point, a manageable sequence of next steps, and consistent support as plans develop.",
    "bio_zh": "Yini Cui 是 Homix Realty 的纽约州持牌房地产销售员。对于正在考虑买房、卖房或租房的客户，Yini 可以协助明确需求、整理信息，并让交易过程保持有序。\n\n在 Homix 团队支持下，Yini 可以调用面向纽约房地产客户的经纪、营销与交易协调资源。服务目标是为每位客户建立清晰的起点、可执行的下一步顺序，并随着计划推进提供持续支持。"
  },
  {
    "id": "s-stella",
    "bio": "S Stella is a Licensed Real Estate Salesperson with Homix Realty in New York. Working within the Homix brokerage team, S supports clients as they prepare to buy, sell, or rent a home and helps organize the practical steps from early planning and property review through offer preparation and closing coordination.\n\nS's public profile serves as a direct point of contact for clients seeking access to Homix's local market, marketing, and transaction resources. The service process is structured around clear information, timely next steps, and decisions aligned with each client's stated goals.",
    "bio_zh": "S Stella 是 Homix Realty 的纽约州持牌房地产销售员。S 依托 Homix 经纪团队，为准备买房、卖房或租房的客户提供支持，并协助梳理从前期规划、房产评估、报价准备到交割协调的实际步骤。\n\n该个人主页为客户提供直接联系S 的入口，并连接 Homix 的本地市场、房产营销和交易执行资源。服务过程强调信息清晰、下一步明确，并围绕客户已经确认的目标推进决策。"
  },
  {
    "id": "zhijun-zhang-zoey",
    "bio": "Zhijun Zhang (Zoey) is a Licensed Real Estate Salesperson at Homix Realty, serving clients through the firm's New York real estate platform. Zoey works with buyers, sellers, and renters who need an organized way to understand available options, prepare transaction materials, and coordinate the professionals involved in a move.\n\nThrough Homix, Zoey can connect clients with property search, listing presentation, market information, and transaction support. The focus is on turning a complex process into a sequence of understandable decisions while keeping the client's priorities visible at each stage.",
    "bio_zh": "Zhijun Zhang (Zoey) 是 Homix Realty 的纽约州持牌房地产销售员，通过公司的纽约房地产服务平台协助客户。Zoey 面向买家、卖家和租客，帮助他们比较可选方案、准备交易资料，并协调置业过程中涉及的各方专业人士。\n\n依托 Homix，Zoey 可以为客户连接房产搜索、房源展示、市场信息与交易支持。服务重点是把复杂流程拆解为可以理解和执行的决策步骤，并在每个阶段保持对客户优先事项的关注。"
  },
  {
    "id": "weller-kert",
    "bio": "Weller Kert is a Licensed Real Estate Salesperson with Homix Realty. As part of a brokerage serving New York City and Long Island, Weller assists clients with the planning and coordination involved in residential real estate, whether they are exploring a purchase, preparing a property for market, or arranging a rental.\n\nWeller works within Homix's shared service platform, drawing on the team's market research, media capabilities, and transaction resources. Clients can use this profile to begin a focused conversation about timing, requirements, and the next practical step in their real estate plans.",
    "bio_zh": "Weller Kert 是 Homix Realty 的纽约州持牌房地产销售员。作为服务纽约市及长岛的经纪团队成员，Weller 协助客户规划和协调住宅房地产事项，包括前期购房了解、房产上市准备和租赁安排。\n\nWeller 在 Homix 的共享服务平台中开展工作，可调用团队的市场研究、媒体传播与交易资源。客户可以通过该主页就时间安排、具体需求和置业计划中的下一项实际步骤展开沟通。"
  },
  {
    "id": "mr-waylon",
    "bio": "MR Waylon is a Licensed Real Estate Salesperson at Homix Realty in New York. MR provides a professional contact for clients who are considering a purchase, sale, or rental and want help defining their requirements, reviewing information, and keeping the transaction process organized.\n\nBacked by the Homix team, MR has access to brokerage, marketing, and transaction-coordination resources designed for New York real estate clients. The aim is to give each client a clear starting point, a manageable sequence of next steps, and consistent support as plans develop.",
    "bio_zh": "MR Waylon 是 Homix Realty 的纽约州持牌房地产销售员。对于正在考虑买房、卖房或租房的客户，MR 可以协助明确需求、整理信息，并让交易过程保持有序。\n\n在 Homix 团队支持下，MR 可以调用面向纽约房地产客户的经纪、营销与交易协调资源。服务目标是为每位客户建立清晰的起点、可执行的下一步顺序，并随着计划推进提供持续支持。"
  },
  {
    "id": "yick-zl",
    "bio": "Yick ZL is a Licensed Real Estate Salesperson with Homix Realty in New York. Working within the Homix brokerage team, Yick supports clients as they prepare to buy, sell, or rent a home and helps organize the practical steps from early planning and property review through offer preparation and closing coordination.\n\nYick's public profile serves as a direct point of contact for clients seeking access to Homix's local market, marketing, and transaction resources. The service process is structured around clear information, timely next steps, and decisions aligned with each client's stated goals.",
    "bio_zh": "Yick ZL 是 Homix Realty 的纽约州持牌房地产销售员。Yick 依托 Homix 经纪团队，为准备买房、卖房或租房的客户提供支持，并协助梳理从前期规划、房产评估、报价准备到交割协调的实际步骤。\n\n该个人主页为客户提供直接联系Yick 的入口，并连接 Homix 的本地市场、房产营销和交易执行资源。服务过程强调信息清晰、下一步明确，并围绕客户已经确认的目标推进决策。"
  },
  {
    "id": "jingtao-lu",
    "bio": "Jingtao Lu is a Licensed Real Estate Salesperson at Homix Realty, serving clients through the firm's New York real estate platform. Jingtao works with buyers, sellers, and renters who need an organized way to understand available options, prepare transaction materials, and coordinate the professionals involved in a move.\n\nThrough Homix, Jingtao can connect clients with property search, listing presentation, market information, and transaction support. The focus is on turning a complex process into a sequence of understandable decisions while keeping the client's priorities visible at each stage.",
    "bio_zh": "Jingtao Lu 是 Homix Realty 的纽约州持牌房地产销售员，通过公司的纽约房地产服务平台协助客户。Jingtao 面向买家、卖家和租客，帮助他们比较可选方案、准备交易资料，并协调置业过程中涉及的各方专业人士。\n\n依托 Homix，Jingtao 可以为客户连接房产搜索、房源展示、市场信息与交易支持。服务重点是把复杂流程拆解为可以理解和执行的决策步骤，并在每个阶段保持对客户优先事项的关注。"
  },
  {
    "id": "yeshu-tan",
    "bio": "Yeshu Tan is a Licensed Real Estate Salesperson with Homix Realty. As part of a brokerage serving New York City and Long Island, Yeshu assists clients with the planning and coordination involved in residential real estate, whether they are exploring a purchase, preparing a property for market, or arranging a rental.\n\nYeshu works within Homix's shared service platform, drawing on the team's market research, media capabilities, and transaction resources. Clients can use this profile to begin a focused conversation about timing, requirements, and the next practical step in their real estate plans.",
    "bio_zh": "Yeshu Tan 是 Homix Realty 的纽约州持牌房地产销售员。作为服务纽约市及长岛的经纪团队成员，Yeshu 协助客户规划和协调住宅房地产事项，包括前期购房了解、房产上市准备和租赁安排。\n\nYeshu 在 Homix 的共享服务平台中开展工作，可调用团队的市场研究、媒体传播与交易资源。客户可以通过该主页就时间安排、具体需求和置业计划中的下一项实际步骤展开沟通。"
  },
  {
    "id": "robert-bos",
    "bio": "Robert Bos is a Licensed Real Estate Salesperson at Homix Realty in New York. Robert provides a professional contact for clients who are considering a purchase, sale, or rental and want help defining their requirements, reviewing information, and keeping the transaction process organized.\n\nBacked by the Homix team, Robert has access to brokerage, marketing, and transaction-coordination resources designed for New York real estate clients. The aim is to give each client a clear starting point, a manageable sequence of next steps, and consistent support as plans develop.",
    "bio_zh": "Robert Bos 是 Homix Realty 的纽约州持牌房地产销售员。对于正在考虑买房、卖房或租房的客户，Robert 可以协助明确需求、整理信息，并让交易过程保持有序。\n\n在 Homix 团队支持下，Robert 可以调用面向纽约房地产客户的经纪、营销与交易协调资源。服务目标是为每位客户建立清晰的起点、可执行的下一步顺序，并随着计划推进提供持续支持。"
  },
  {
    "id": "ye-chen-tina",
    "bio": "Ye Chen (Tina) is a Licensed Real Estate Salesperson with Homix Realty in New York. Working within the Homix brokerage team, Tina supports clients as they prepare to buy, sell, or rent a home and helps organize the practical steps from early planning and property review through offer preparation and closing coordination.\n\nTina's public profile serves as a direct point of contact for clients seeking access to Homix's local market, marketing, and transaction resources. The service process is structured around clear information, timely next steps, and decisions aligned with each client's stated goals.",
    "bio_zh": "Ye Chen (Tina) 是 Homix Realty 的纽约州持牌房地产销售员。Tina 依托 Homix 经纪团队，为准备买房、卖房或租房的客户提供支持，并协助梳理从前期规划、房产评估、报价准备到交割协调的实际步骤。\n\n该个人主页为客户提供直接联系Tina 的入口，并连接 Homix 的本地市场、房产营销和交易执行资源。服务过程强调信息清晰、下一步明确，并围绕客户已经确认的目标推进决策。"
  },
  {
    "id": "xiruo-chen-shelly",
    "bio": "Xiruo Chen (Shelly) is a Licensed Real Estate Salesperson at Homix Realty, serving clients through the firm's New York real estate platform. Shelly works with buyers, sellers, and renters who need an organized way to understand available options, prepare transaction materials, and coordinate the professionals involved in a move.\n\nThrough Homix, Shelly can connect clients with property search, listing presentation, market information, and transaction support. The focus is on turning a complex process into a sequence of understandable decisions while keeping the client's priorities visible at each stage.",
    "bio_zh": "Xiruo Chen (Shelly) 是 Homix Realty 的纽约州持牌房地产销售员，通过公司的纽约房地产服务平台协助客户。Shelly 面向买家、卖家和租客，帮助他们比较可选方案、准备交易资料，并协调置业过程中涉及的各方专业人士。\n\n依托 Homix，Shelly 可以为客户连接房产搜索、房源展示、市场信息与交易支持。服务重点是把复杂流程拆解为可以理解和执行的决策步骤，并在每个阶段保持对客户优先事项的关注。"
  }
]$agent_bios$::jsonb)
  AS profile(id TEXT, bio TEXT, bio_zh TEXT);

DO $$
DECLARE
  backfill_count INTEGER;
  matched_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO backfill_count FROM agent_bio_backfill;
  SELECT COUNT(*) INTO matched_count
  FROM public.agents AS agent
  JOIN agent_bio_backfill AS profile ON profile.id = agent.id;

  IF backfill_count <> 66 OR matched_count <> backfill_count THEN
    RAISE EXCEPTION
      'Agent biography backfill mismatch: % prepared, % matched',
      backfill_count,
      matched_count;
  END IF;
END;
$$;

UPDATE public.agents AS agent
SET
  bio = profile.bio,
  bio_zh = profile.bio_zh,
  updated_at = NOW()
FROM agent_bio_backfill AS profile
WHERE profile.id = agent.id;

COMMIT;
