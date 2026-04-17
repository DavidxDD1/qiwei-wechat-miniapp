# 启卫电竞微信小程序

微信原生小程序 MVP，提供本地预约流程演示：

- 首页进入预约
- 服务、模式、套餐三级选择
- 本地价格展示
- 订单信息填写与校验
- 订单号生成
- 成功页展示预约结果

## 项目结构

```text
miniprogram/
├── app.js
├── app.json
├── app.wxss
├── data/
├── pages/
└── utils/
```

## 本地运行

1. 打开微信开发者工具
2. 导入目录 `D:\Code\wechat_app\miniprogram`
3. 使用你自己的小程序 AppID，或先使用测试号
4. 编译后从首页开始测试完整流程

## 测试链路

```text
index -> service -> order -> success
```

## 核心说明

- 所有数据均为本地静态数据
- 未接入服务端
- 未使用云开发
- 未使用第三方依赖
- 未接入支付能力