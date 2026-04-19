# 启卫电竞微信小程序 V1.5

基于微信原生小程序实现的价格展示与预约意向工具。当前版本默认运行在本地 Mock 模式，用于在微信开发者工具中完成页面联调、交互验证和本地订单流转，不接入云开发、真实支付和正式后端服务。

## 当前状态

- 7 个页面可直接运行：
  - `pages/home`
  - `pages/service`
  - `pages/cart`
  - `pages/order-intent`
  - `pages/pay-info`
  - `pages/orders`
  - `pages/profile`
- 所有价格统一来自 `miniprogram/data/pricingFull.js`
- 首页包含品牌主视觉、服务摘要、热门推荐和常见问题
- 服务页区分两种浏览模式：
  - `escort` 使用服务卡片和直购入口
  - `male` / `female` 保留原表矩阵浏览
- 默认 `USE_MOCK=true`
- 默认 `ENABLE_ONLINE_PAY=false`
- 默认 `ENABLE_CONTACT_BUTTON=false`

## 项目结构

```text
.
├── .gitattributes
├── .gitignore
├── LICENSE
├── README.md
├── miniprogram
│   ├── app.js
│   ├── app.json
│   ├── app.wxss
│   ├── project.config.json
│   ├── project.private.config.json
│   ├── sitemap.json
│   ├── assets
│   ├── components
│   │   ├── chip-tabs
│   │   ├── entry-offer-list
│   │   ├── page-hero
│   │   └── ...
│   ├── config
│   ├── data
│   ├── mock
│   ├── pages
│   │   ├── home
│   │   ├── service
│   │   └── ...
│   ├── services
│   ├── store
│   └── utils
└── tests
    ├── layout-shell.spec.js
    ├── manual-cases.md
    ├── service-direct-order.spec.js
    ├── service-entry-groups.spec.js
    ├── service-selection-state.spec.js
    ├── service-view.spec.js
    └── utils.spec.js
```

## 页面说明

### 首页 `pages/home`

- 展示品牌主视觉、服务摘要、流程步骤、FAQ
- 根据价格数据生成热门推荐卡片
- 可直接切到服务页或个人中心

### 服务页 `pages/service`

- 使用 Hero 区块展示当前服务模式和统计信息
- 护航单通过服务卡片展示，支持直接锁定方案并下单
- 男陪、女陪保留原表矩阵结构，支持按大类与子表切换
- 支持加入购物车或直接下单

### 购物车 `pages/cart`

- 查看已选服务项
- 勾选、删除、补充备注
- 结算进入下单页

### 下单页 `pages/order-intent`

- 展示待下单服务项
- 填写联系人姓名、手机号、微信号和备注
- 提交意向订单

### 支付说明页 `pages/pay-info`

- 展示订单号、应付金额、订单状态
- 默认只显示人工确认说明
- 可按配置决定是否展示客服按钮

### 订单页 `pages/orders`

- 查看本地订单列表
- 按状态筛选
- 查看订单摘要、联系人与备注

### 个人中心 `pages/profile`

- 游客态资料展示
- 会员、消息、评价占位
- 快捷前往服务页、订单页、客服说明

## 关键配置

- 运行开关：`miniprogram/config/env.js`
  - `USE_MOCK` 控制是否使用本地 mock 适配层
  - `ENABLE_ONLINE_PAY` 控制支付说明页是否进入在线支付模式
  - `ENABLE_CONTACT_BUTTON` 控制支付说明页是否显示客服按钮
- 开发者工具配置：`miniprogram/project.config.json`
  - `appid` 当前为 `touristappid`
  - `compileType` 为 `miniprogram`
  - 已开启 ES6、热重载、WXSS/WXML 压缩
- 本地私有配置：`miniprogram/project.private.config.json`
  - 仅供本机微信开发者工具使用
  - 已加入 `.gitignore`

## 关键模块

- 价格数据：`miniprogram/data/pricingFull.js`
- 首页热门推荐：`miniprogram/utils/featured.js`
- 服务页入口：`miniprogram/pages/service/index.js`
- 服务页视图组装：`miniprogram/pages/service/serviceView.js`
- 护航分组文案：`miniprogram/pages/service/entryGroups.js`
- 直购逻辑：`miniprogram/pages/service/directOrder.js`
- 订单创建：`miniprogram/services/order.js`
- 购物车存储：`miniprogram/store/cartStore.js`

## 本地运行

1. 打开微信开发者工具
2. 导入目录：`D:\code\qiwei-wechat-miniapp\miniprogram`
3. `AppID` 可先使用测试号或游客模式
4. 点击“编译”开始联调

## 测试

### 自动测试

在仓库根目录执行：

```powershell
$tests = Get-ChildItem .\tests\*.spec.js | ForEach-Object { $_.FullName }
node --test $tests
```

当前自动测试覆盖：

- 服务页布局和底部安全区
- 护航分组文案与服务视图构建
- 服务选择状态和直购逻辑
- 价格解析、订单号生成、表单校验

### 手工测试

手工验收用例见 [tests/manual-cases.md](tests/manual-cases.md)。

## Git 约定

- `miniprogram/project.config.json` 已提交，方便直接导入微信开发者工具
- `miniprogram/project.private.config.json`、`project.user.json` 等本地文件已忽略
- `.codex/`、`.agents/` 和 `AGENTS.md` 属于本地 AI 工作流配置，默认不再提交
- 文本文件通过 `.gitattributes` 统一换行处理

## License

MIT
