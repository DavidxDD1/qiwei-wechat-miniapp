module.exports = {
  hero: {
    title: '启卫电竞',
    subtitle: '原表价格严格还原，快速选择服务并提交预约意向',
    slogan: '专业三角洲行动陪练平台'
  },
  entryCards: [
    {
      id: 'escort',
      title: '护航单',
      desc: '体验单、正常单、单局保底单完整展示'
    },
    {
      id: 'male',
      title: '男陪价格表',
      desc: '顶尖、战神、魔王、甜蜜陪原表结构'
    },
    {
      id: 'female',
      title: '女陪价格表',
      desc: '娱乐、娱乐技术、顶尖、战神、魔王、甜蜜陪'
    }
  ],
  serviceEntrypoints: [
    {
      id: 'fast_escort',
      serviceId: 'escort',
      badge: '最快下单',
      intent: '想直接找人带局',
      title: '护航单',
      desc: '体验单、正常单、单局保底单集中展示，适合已经明确要快速下单的用户。',
      actionText: '进入护航目录'
    },
    {
      id: 'rank_compare',
      serviceId: 'male',
      badge: '价格对比',
      intent: '想按档位和时长比价',
      title: '男陪价格表',
      desc: '保留原表矩阵结构，方便横向比较档位、时长、保底要求和预算区间。',
      actionText: '查看男陪矩阵'
    },
    {
      id: 'style_match',
      serviceId: 'female',
      badge: '风格筛选',
      intent: '想按陪玩类型挑选',
      title: '女陪价格表',
      desc: '按娱乐、技术、顶尖、战神等路线浏览，适合先看风格再确定方案。',
      actionText: '查看女陪矩阵'
    }
  ],
  trustSignals: [
    {
      id: 'source',
      title: '原表价格',
      desc: '服务价格来自本地原始价目数据，不做模糊合并。'
    },
    {
      id: 'confirm',
      title: '人工确认',
      desc: '提交后进入客服确认流程，降低错选和信息遗漏。'
    },
    {
      id: 'local',
      title: '本地闭环',
      desc: '购物车、意向订单和支付说明链路当前均可本地跑通。'
    }
  ],
  journeySteps: [
    {
      id: 'browse',
      title: '浏览原表',
      desc: '按服务矩阵、档位与时长快速定位到目标价格区间。'
    },
    {
      id: 'lock',
      title: '锁定方案',
      desc: '点击价格单元格后即可加入购物车，或直接发起预约意向。'
    },
    {
      id: 'confirm',
      title: '人工确认',
      desc: '提交联系方式后进入客服确认流程，便于继续沟通安排。'
    }
  ],
  faq: [
    {
      q: '本期支持在线支付吗？',
      a: '当前仅支持人工确认订单，在线支付默认关闭。'
    },
    {
      q: '价格来源是什么？',
      a: '所有价格均严格来自启卫电竞原始价格表，不做抽象合并。'
    },
    {
      q: '现在能直接联系客服吗？',
      a: '本期保留客服入口占位，默认展示人工确认说明。'
    }
  ],
  serviceSummary: [
    '原表价格逐条还原',
    '购物车与订单意向本地可跑通',
    '后续可平滑升级到云端'
  ]
}
