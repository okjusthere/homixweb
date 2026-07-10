-- One-time backfill: map each advisor to their OneKey MLS member id.
-- Generated 2026-07-09 by cross-matching the live MLS Member feed against
-- the website roster (email -> phone -> normalized-name, in that order;
-- zero ambiguous matches). Verified licenses come from MemberStateLicense.
-- Run AFTER the mls_id column ALTER in schema.sql. Safe to re-run.
--
-- Not matched (no OneKey member found): yilinwang — set manually when known.

update public.agents set mls_id = 'KEY207692' where slug = 'sunny'; -- Si Zhang · lic 10311210626 · via name
update public.agents set mls_id = 'KEY175332' where slug = 'heidi'; -- Heidi Liu · lic 10301216165 · via name
update public.agents set mls_id = 'KEY223667' where slug = 'queenie'; -- Yaoling Zhuang · lic 10401373372 · via phone
update public.agents set mls_id = 'KEY206026' where slug = 'michelleli'; -- Meixuan Li · lic 10401335823 · via phone
update public.agents set mls_id = 'KEY196833' where slug = 'yanxue'; -- Yan Xue Zheng · lic 10301223441 · via phone
update public.agents set mls_id = 'KEY505266' where slug = 'linafeng'; -- Lina Feng · lic 10401398701 · via email
update public.agents set mls_id = 'KEY228707' where slug = 'jingjingfeng'; -- Jingjing Feng · lic 10401384967 · via email
update public.agents set mls_id = 'KEY227017' where slug = 'kevinnli'; -- Kevinn Li · lic 10401381496 · via name
update public.agents set mls_id = 'KEY229117' where slug = 'emmaniu'; -- Qian Niu · lic 10401385930 · via email
update public.agents set mls_id = 'KEY505847' where slug = 'zoeyzhang'; -- Zhijun Zhang · lic 10401400292 · via email
update public.agents set mls_id = 'KEY211686' where slug = 'gracexia'; -- Jiaer Xia · lic 10401347048 · via phone
update public.agents set mls_id = 'KEY503357' where slug = 'davidwang'; -- Wei Wang · lic 10401393943 · via email
update public.agents set mls_id = 'KEY224257' where slug = 'shellylin'; -- Xuehui S. Lin · lic 10401374845 · via email
update public.agents set mls_id = 'KEY201249' where slug = 'charlottezhang'; -- Charlotte Zhang · lic 10401324372 · via email
update public.agents set mls_id = 'KEY505291' where slug = 'dannyhan'; -- Danny Han · lic 10401381730 · via email
update public.agents set mls_id = 'KEY216348' where slug = 'zoeyzhao'; -- Kai Zhao · lic 10401357571 · via email
update public.agents set mls_id = 'KEY227618' where slug = 'tiffanywang'; -- Tiffany Wang · lic 10401383026 · via phone
update public.agents set mls_id = 'KEY187326' where slug = 'ryanhe'; -- Dongjian He · lic 10401290295 · via email
update public.agents set mls_id = 'KEY506745' where slug = 'waynelu'; -- Wen Quan Lu · lic 10401402585 · via email
update public.agents set mls_id = 'KEY160917' where slug = 'sandyguan'; -- Shanshan Guan · lic 10401215370 · via email
update public.agents set mls_id = 'KEY218759' where slug = 'lilyliang'; -- Yi Yang Liang · lic 10401363025 · via email
update public.agents set mls_id = 'KEY218495' where slug = 'dizhang'; -- Di Zhang · lic 10401362253 · via email
update public.agents set mls_id = 'KEY505433' where slug = 'rachelma'; -- Xiaoqian Ma · lic 10401398816 · via email
update public.agents set mls_id = 'KEY228051' where slug = 'queeniecheung'; -- Queenie Cheung · lic 10401383852 · via phone
update public.agents set mls_id = 'KEY215362' where slug = 'yukizhang'; -- Yan Zhang · lic 10401354833 · via email
update public.agents set mls_id = 'KEY502994' where slug = 'angelalin'; -- Jianxiu Lin · lic 10401393067 · via name
update public.agents set mls_id = 'KEY503638' where slug = 'davidhu'; -- David Hu · lic 10401393986 · via email
update public.agents set mls_id = 'KEY202303' where slug = 'kylehuang'; -- Huizhong Huang · lic 10401327543 · via email
update public.agents set mls_id = 'KEY505259' where slug = 'xueyaozou'; -- Xueyao Zou · lic 10401396072 · via email
update public.agents set mls_id = 'KEY504530' where slug = 'shawnzhang'; -- Xiaoyi Zhang · lic 10401396688 · via email
update public.agents set mls_id = 'KEY506008' where slug = 'bingwu'; -- Bing Wu · lic 10401400167 · via email
update public.agents set mls_id = 'KEY505431' where slug = 'ericwei'; -- Zhengle Wei · lic 10401387364 · via phone
update public.agents set mls_id = 'KEY507124' where slug = 'jaydoncai'; -- Congyuan Cai · lic 10401403344 · via email
update public.agents set mls_id = 'KEY186375' where slug = 'stevenchang'; -- Yong Sheng Zhang · lic 10401288632 · via email
update public.agents set mls_id = 'KEY507065' where slug = 'junlincao'; -- Junlin Cao · lic 10401396501 · via email
update public.agents set mls_id = 'KEY506622' where slug = 'reannechen'; -- Reanne Chen · lic 10401384578 · via name
update public.agents set mls_id = 'KEY505765' where slug = 'pengxuhu'; -- Pengxu Hu · lic 10401399639 · via email
update public.agents set mls_id = 'KEY507063' where slug = 'jorcylu'; -- JueYao Lu · lic 10401400645 · via phone
update public.agents set mls_id = 'KEY506621' where slug = 'chunchinyang'; -- Chun Chin Yang · lic 10401384569 · via name
update public.agents set mls_id = 'KEY505614' where slug = 'yukeyhoo'; -- Yukey Hoo · lic 10401399302 · via phone
update public.agents set mls_id = 'KEY227586' where slug = 'winarkotanumiharjo'; -- Winarko Tanumiharjo · lic 10401344396 · via name
update public.agents set mls_id = 'KEY507190' where slug = 'yufeiwang'; -- Yufei Wang · lic 10401403670 · via name
update public.agents set mls_id = 'KEY199217' where slug = 'evama'; -- Eva Y. Ma · lic 10401320437 · via name
update public.agents set mls_id = 'KEY507136' where slug = 'qinghe'; -- Qing He · lic 10401403600 · via name
update public.agents set mls_id = 'KEY199611' where slug = 'defenghuang'; -- Defeng Huang · lic 10401321431 · via name
update public.agents set mls_id = 'KEY173246' where slug = 'yixianli'; -- Yixian Li · lic 10401252458 · via name
update public.agents set mls_id = 'KEY220056' where slug = 'yinchunwu'; -- Yinchun Wu · lic 10401365678 · via name
update public.agents set mls_id = 'KEY500593' where slug = 'jinxiuyang'; -- Jinxiu Yang · lic 10401387585 · via name
update public.agents set mls_id = 'KEY507206' where slug = 'honglongchen'; -- Honglong Chen · lic 10401403720 · via name
