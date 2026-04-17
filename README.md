# 启卫电竞微信小程序 V1.5

基于微信原生小程序实现的原表价格展示与预约意向工具，当前版本严格按照启卫电竞原始价格表结构还原，默认运行在本地 Mock 模式，不接入云开发、真实支付和后端服务。

## 当前版本

- 7 个页面完整可运行：
  - `pages/home`
  - `pages/service`
  - `pages/cart`
  - `pages/order-intent`
  - `pages/pay-info`
  - `pages/orders`
  - `pages/profile`
- 所有价格统一来自 `miniprogram/data/pricingFull.js`
- 支持原表价格浏览、购物车、本地订单创建、订单列表查看
- 默认 `USE_MOCK=true`
- 默认 `ENABLE_ONLINE_PAY=false`

## 项目结构

```text
.
├── .gitattributes
├── .gitignore
├── AGENTS.md
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
│   ├── config
│   ├── data
│   ├── mock
│   ├── pages
│   ├── services
│   ├── store
│   └── utils
└── tests
    ├── manual-cases.md
    └── utils.spec.js
```

## 页面说明

### 1. 首页 `pages/home`

- 展示品牌 Logo、项目定位、服务入口、FAQ
- 可直接进入服务页或个人中心

### 2. 服务页 `pages/service`

- 按原表结构展示：
  - 护航单
  - 男陪价格表
  - 女陪价格表
- 支持大类切换、子表切换、价格单元格选中
- 支持加入购物车或直接下单

### 3. 购物车 `pages/cart`

- 查看已选服务项
- 勾选、删除、补充备注
- 结算进入下单页

### 4. 下单页 `pages/order-intent`

- 展示待下单服务项
- 填写联系人姓名、手机号、微信号和备注
- 提交意向订单

### 5. 支付说明页 `pages/pay-info`

- 展示订单号、应付金额、订单状态
- 默认只显示人工确认说明
- 保留客服入口和订单页跳转

### 6. 订单页 `pages/orders`

- 查看本地订单列表
- 按状态筛选
- 查看订单摘要、联系人与备注

### 7. 个人中心 `pages/profile`

- 游客态资料展示
- 会员、消息、评价占位
- 快捷前往服务页、订单页、客服说明

## 数据与约束

- 价格数据：`miniprogram/data/pricingFull.js`
- 首页文案：`miniprogram/data/homeContent.js`
- 占位内容：`miniprogram/data/placeholders.js`
- 默认不接入：
  - 云开发
  - 微信支付
  - 后端接口
  - 第三方 UI 库

## 本地运行

1. 打开微信开发者工具
2. 导入目录：`D:\Code\wechat_app\miniprogram`
3. `AppID` 可先使用测试号或游客模式
4. 点击“编译”后开始联调

## 测试

### 自动测试

在仓库根目录执行：

```powershell
node --test tests\utils.spec.js
```

### 手工测试

手工验收用例见：

- [tests/manual-cases.md](/D:/Code/wechat_app/tests/manual-cases.md)

## 关键文件

- 原表数据：[miniprogram/data/pricingFull.js](/D:/Code/wechat_app/miniprogram/data/pricingFull.js)
- 服务页逻辑：[miniprogram/pages/service/index.js](/D:/Code/wechat_app/miniprogram/pages/service/index.js)
- 订单创建：[miniprogram/services/order.js](/D:/Code/wechat_app/miniprogram/services/order.js)
- 购物车存储：[miniprogram/store/cartStore.js](/D:/Code/wechat_app/miniprogram/store/cartStore.js)

## Git 约定

- `miniprogram/project.config.json` 已提交，方便直接导入微信开发者工具
- `miniprogram/project.private.config.json` 仅用于本地环境，已加入忽略规则
- 文本文件通过 `.gitattributes` 统一换行处理

## License

MIT
