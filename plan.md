# Homix 官网与 Agent Portal 招聘申请联动计划

## 目标

将 Homix 官网 `/join` 从通用询盘导流页升级为正式入职申请入口，形成以下唯一主流程：

```text
Homix Website /join
  -> Homix Agent Portal /join
  -> Google 登录或识别现有账户
  -> /pending 入职申请
  -> 资料、方案、协议、付款与后台审核
```

官网继续负责品牌介绍、佣金方案说明和申请前咨询；Agent Portal 负责身份识别、正式申请、协议、付款和审批。

## 已确认现状

- 官网 `/join` 的“申请加入 Homix”目前只是跳转到页面底部的通用 `InquiryForm`。
- 通用询盘表单只收集姓名、电话、邮箱和留言，不是正式入职申请。
- Agent Portal 当前没有可直接访问的公开 `/join` 页面。
- Portal 现有 `/join/[token]` 是个人或团队邀请入口，必须携带有效邀请令牌。
- Portal 已有完整的 `/pending` 入职流程，包括执照、所属公司、OneKey 状态、业务方向、佣金方案、团队、Sponsor、合同、付款和管理员审批。
- 新用户通过 Google 登录后，Portal 已能创建 pending 经纪人账户。

## 核心决策

1. 新建 Portal 公共申请入口 `/join`，不复用 `/join/[token]`。
2. 官网主 CTA 直接进入 Portal 的公共申请入口。
3. 官网底部表单保留，但重新定义为“申请前咨询”，不再充当正式申请。
4. 个人邀请令牌优先于官网自然申请来源，不能使用一个公开的通用邀请令牌。
5. URL 只传递白名单内的来源、语言和营销参数，不传递个人信息。
6. 佣金方案只能作为预选提示，最终选择仍由申请人在 Portal 中确认。

## 用户流程

### 官网自然申请

1. 用户浏览官网 `/join` 或 `/commission-plan`。
2. 点击“申请加入 Homix”或 “Apply to Join Homix”。
3. 官网跳转至：

   ```text
   https://agents.homixny.com/join?source=homix-web&lang=zh
   ```

4. Portal `/join` 展示申请说明、所需资料和“使用 Google 继续”按钮。
5. 用户完成 Google 登录。
6. Portal 根据账户状态跳转：
   - 新申请人：创建 pending 账户并进入 `/pending`。
   - 未完成申请人：进入 `/pending` 并恢复进度。
   - 已激活经纪人：进入 Portal 首页。
   - 停用或异常账户：显示联系管理员的正式状态页。
7. 申请人完成资料提交、协议签署、付款和后台审核。

### 个人或团队邀请

1. 用户访问原有 `/join/[token]`。
2. Portal 验证邀请令牌并记录 Sponsor、团队、方案等邀请信息。
3. 即使 URL 同时包含官网来源参数，邀请令牌的归属关系仍然优先。
4. 后续继续使用现有 `/pending` 入职流程。

### 申请前咨询

1. 官网 Hero 提供较弱的“先与招聘团队沟通”入口。
2. 该入口滚动到页面底部咨询区域。
3. 底部表单文案改为“申请前有问题？”或 “Questions before applying?”。
4. 表单继续进入现有官网询盘数据库和邮件通知链路，但不创建 Portal 申请账户。

## Agent Portal 改造

仓库：`/Users/weizhengle/Downloads/vibecoding/homixliving`

### 1. 公共 `/join` 页面

- 新建公开、免登录的 `/join` 页面。
- 支持中英文，不依赖用户已有语言 Cookie。
- 页面说明申请步骤和建议提前准备的资料。
- 提供明确的 Google 登录按钮。
- 对微信内置浏览器保留现有提示，引导用户使用系统浏览器完成 Google 登录。
- 页面视觉延续 Homix 官网与 Portal 的现有设计系统，不制作独立营销落地页风格。

### 2. 申请来源承接

- 增加安全的公共申请入口处理逻辑。
- 白名单参数：
  - `source=homix-web`
  - `lang=en|zh`
  - 可选 UTM/campaign 标识
  - 可选 `plan=solo|solo_pro|team_member`
- 服务端校验参数后，写入短期、Secure、HttpOnly、SameSite=Lax Cookie。
- 不把姓名、邮箱、电话、执照号等个人信息写入 URL 或来源 Cookie。
- `onboardingSource` 增加 `website` 或 `homix_web` 类型，并统一使用一个数据库值。

### 3. 登录与账户状态路由

- 申请模式下的登录文案改为“开始或继续您的 Homix 入职申请”。
- Google 登录回调应明确进入 `/pending`，而不是依赖通用首页再次重定向。
- 账户状态路由规则：
  - 无账户：创建 pending 账户。
  - pending：恢复申请进度。
  - active：进入 Portal 首页。
  - inactive/suspended：显示不可继续申请的状态和联系渠道。
- 保持重复 Google 登录和重复邮箱请求的幂等性。

### 4. 邀请优先级

- 有效 `/join/[token]` 邀请必须优先于公共官网来源。
- 邀请中锁定的 Sponsor、团队或方案继续按现有规则执行。
- 公共官网来源不能覆盖已绑定的邀请关系。
- 禁止在官网源码中保存可重复使用的邀请令牌。

### 5. 后台可见性与事件

- 管理员申请列表展示来源，例如“Homix 官网”。
- 建议记录以下入职事件：
  - `join_page_viewed`
  - `application_login_started`
  - `application_account_created`
  - `application_profile_submitted`
  - `agreement_signed`
  - `payment_completed`
  - `agent_activated`
- 事件仅记录必要的账户 ID、来源和时间，不重复保存敏感资料。

## Homix Website 改造

仓库：`/Users/weizhengle/Downloads/vibecoding/homix-website`

### 1. `/join` Hero CTA

- 将当前 `href="#apply"` 改为 Portal 公共申请地址。
- 中文页面传递 `lang=zh`，英文页面传递 `lang=en`。
- 使用同标签页跳转，缩短申请链路。
- CTA 保持：
  - 中文：“申请加入 Homix”
  - 英文：“Apply to Join Homix”

### 2. 统一 Portal URL

- 基于现有 `siteConfig.portalUrl` 增加统一的申请地址生成方法。
- 页面组件不得分别硬编码 `agents.homixny.com`。
- 地址生成方法负责白名单化语言、来源和可选佣金方案参数。

### 3. 底部咨询区域

- 保留现有 `InquiryForm` 和邮件、Supabase 询盘记录能力。
- 将区域定位从“正式申请”改为“申请前咨询”。
- 建议文案：
  - 中文标题：“申请前有问题？”
  - 中文说明：“与招聘团队沟通执照转入、佣金方案或团队选择。”
  - 英文标题：“Questions before applying?”
  - 英文说明：“Talk with recruiting about license transfer, commission plans, or team options.”
- Hero 增加次级文字入口，滚动至该区域。

### 4. Commission Plan 联动

- `/commission-plan` 的申请按钮复用同一 Portal 地址生成方法。
- 如果用户从某个方案区域发起申请，可传递 `plan` 作为预选提示。
- Portal 中必须允许申请人修改该选择，不能由官网参数锁定合同方案。

## 数据与安全要求

- 不创建公共、长期有效的 onboarding invitation token。
- 不在 URL、Analytics 或日志中传递 PII。
- 所有来源、语言、方案和 campaign 参数必须经过白名单校验。
- 申请上下文 Cookie 必须为 Secure、HttpOnly、SameSite=Lax，并设置较短有效期。
- OAuth 登录继续使用 Auth.js 的 state、callback 和账户校验机制。
- 数据库迁移需兼容已有 `onboardingSource` 数据，不重写历史邀请来源。
- Portal API 不信任官网传入的 Sponsor、团队、佣金锁定或管理员权限信息。

## 文案原则

- 官网主按钮明确代表“开始正式申请”。
- 官网咨询表单明确代表“申请前沟通”，避免两个入口含义重叠。
- Portal `/join` 不重复官网大段品牌介绍，只解释步骤、资料和隐私用途。
- 登录页面在申请上下文中使用申请文案，普通经纪人登录保持现有文案。
- 中英文表达使用同一业务含义，不进行逐字翻译。

## 测试计划

### Portal

- `/join` 无需登录即可访问。
- `lang=zh` 和 `lang=en` 显示对应语言。
- 非法 `source`、`lang`、`plan` 参数被忽略或归一化。
- 新 Google 用户创建 pending 账户并进入 `/pending`。
- 已有 pending 用户恢复原有进度，不创建重复记录。
- active 用户进入 Portal 首页。
- 无效邀请令牌仍显示原有错误流程。
- 有效邀请令牌优先于官网来源。
- 微信内置浏览器提示正常。
- 来源 Cookie 不包含 PII，且安全属性正确。

### Website

- `/en/join` CTA 指向 Portal 英文申请入口。
- `/zh/join` CTA 指向 Portal 中文申请入口。
- 底部咨询表单仍能写入 Supabase 并发送邮件。
- 主申请按钮不再滚动到咨询表单。
- 次级咨询按钮正确滚动到咨询区域。
- `/commission-plan` 使用统一 Portal URL 生成逻辑。
- 移动端、桌面端和键盘导航正常。
- 运行 `npm run lint` 与 `npm run build`。

### 端到端

- 从官网进入 Portal，来源和语言正确保留。
- 完成 Google 登录后进入正确的账户状态页面。
- 新申请在后台显示“Homix 官网”来源。
- 个人邀请链接没有被官网来源覆盖。
- 取消登录或返回官网不会产生空白 pending 记录。

## 上线顺序

1. 在 Portal 增加数据类型或数据库迁移。
2. 实现 Portal `/join`、来源承接和状态路由。
3. 完成 Portal 单元测试、构建和预览环境验证。
4. 先部署 Portal，并验证生产 `/join` 可用。
5. 修改官网 `/join` 和 `/commission-plan` CTA。
6. 完成官网构建、预览和端到端测试。
7. 部署官网。
8. 观察申请开始率、资料提交率、协议签署率和异常登录情况。

## 回滚方案

- Portal `/join` 出现故障时，官网主 CTA 临时回退到页面底部咨询区域。
- Portal 数据迁移只增加来源类型或字段，不删除现有邀请和 onboarding 数据。
- 官网与 Portal 分开部署；必须先确认 Portal 生产入口可用，再发布官网外链。
- 不以 mock 申请或公共邀请令牌作为回滚方案。

## 完成标准

- 官网主 CTA 能稳定进入 Portal 正式申请流程。
- 用户不再误以为通用询盘表单等同于入职申请。
- 新申请人、未完成申请人、正式经纪人和异常账户都有明确去向。
- 个人邀请、团队归属和 Sponsor 信息不被官网自然流量覆盖。
- 管理员可辨识官网申请来源并查看关键转化节点。
- 两个仓库均通过 lint、类型检查、构建和关键端到端测试。
