const pricingFull = {
  version: '2026-04-17-a-raw',
  strategy: 'A_ORIGINAL_TABLE_RESTORE',
  source: '启卫电竞价格表原表结构还原',
  currency: 'CNY',
  services: [
    {
      id: 'escort',
      title: '护航单',
      type: 'entry-groups',
      sections: [
        {
          id: 'escort_trial',
          title: '体验单',
          entries: [
            { id: 'trial_128_888', rawLabel: '128保888', price: 128, guarantee: '888', displayPrice: '￥128', extra: '保888' },
            { id: 'trial_258_1588', rawLabel: '258保1588', price: 258, guarantee: '1588', displayPrice: '￥258', extra: '保1588' }
          ]
        },
        {
          id: 'escort_normal_juemi',
          title: '正常单（绝密）',
          entries: [
            { id: 'normal_188_888_juemi', rawLabel: '188保888', price: 188, guarantee: '888', displayPrice: '￥188', extra: '绝密' },
            { id: 'normal_288_1288_juemi', rawLabel: '288保1288', price: 288, guarantee: '1288', displayPrice: '￥288', extra: '绝密' },
            { id: 'normal_388_1588_juemi', rawLabel: '388保1588', price: 388, guarantee: '1588', displayPrice: '￥388', extra: '绝密' },
            { id: 'normal_588_2588_juemi', rawLabel: '588保2588', price: 588, guarantee: '2588', displayPrice: '￥588', extra: '绝密' },
            { id: 'normal_888_3888_juemi', rawLabel: '888保3888', price: 888, guarantee: '3888', displayPrice: '￥888', extra: '绝密' }
          ]
        },
        {
          id: 'escort_normal_jimi',
          title: '正常单（机密）',
          entries: [
            { id: 'normal_188_1000_jimi', rawLabel: '188保1000', price: 188, guarantee: '1000', displayPrice: '￥188', extra: '机密' },
            { id: 'normal_288_1500_jimi', rawLabel: '288保1500', price: 288, guarantee: '1500', displayPrice: '￥288', extra: '机密' },
            { id: 'normal_388_2000_jimi', rawLabel: '388保2000', price: 388, guarantee: '2000', displayPrice: '￥388', extra: '机密' },
            { id: 'normal_588_3000_jimi', rawLabel: '588保3000', price: 588, guarantee: '3000', displayPrice: '￥588', extra: '机密' },
            { id: 'normal_888_5000_jimi', rawLabel: '888保5000', price: 888, guarantee: '5000', displayPrice: '￥888', extra: '机密' }
          ]
        },
        {
          id: 'escort_single_game',
          title: '单局保底单',
          entries: [
            { id: 'single_288_888', rawLabel: '288保单局888', price: 288, guarantee: '单局888', displayPrice: '￥288', extra: '单局保底' },
            { id: 'single_588_1088', rawLabel: '588保单局1088', price: 588, guarantee: '单局1088', displayPrice: '￥588', extra: '单局保底' },
            { id: 'single_1314_1314', rawLabel: '1314保单局1314', price: 1314, guarantee: '单局1314', displayPrice: '￥1314', extra: '单局保底' }
          ]
        }
      ]
    },
    {
      id: 'male',
      title: '男陪价格表',
      type: 'raw-tables',
      tables: [
        {
          id: 'male_top',
          title: '顶尖单价',
          columns: [
            { key: 'hour_1', label: '1小时' },
            { key: 'day_5', label: '包天5小时' },
            { key: 'day_10', label: '包天10小时' },
            { key: 'week_5', label: '包周5小时' },
            { key: 'week_10', label: '包周10小时' },
            { key: 'month_10_per_day', label: '包月10小时/天' }
          ],
          rows: [
            {
              id: 'jimi',
              label: '机密',
              values: {
                hour_1: { raw: '100', value: 100 },
                day_5: { raw: '469', value: 469 },
                day_10: { raw: '899', value: 899 },
                week_5: { raw: '3039', value: 3039 },
                week_10: { raw: '5879', value: 5879 },
                month_10_per_day: { raw: '23999', value: 23999 }
              }
            },
            {
              id: 'juemi',
              label: '绝密',
              values: {
                hour_1: { raw: '120', value: 120 },
                day_5: { raw: '559', value: 559 },
                day_10: { raw: '1079', value: 1079 },
                week_5: { raw: '3659', value: 3659 },
                week_10: { raw: '7059', value: 7059 },
                month_10_per_day: { raw: '28799', value: 28799 }
              }
            }
          ],
          notes: [
            '将军要求机密绝密均是5套5弹进图，包全卡，不得低于5个人头/h，或者绝密每小时至少撤离一局，机密每小时撤离两把，满足其一不算炸单。',
            '单陪不要求撤离率，只计算人头，如果人头不够，撤离也不算炸单，只在本俱乐部点一个打手便算单陪。',
            '单陪老板返装+10/h，老板卡战备一护二+20/h，监狱+10/h。'
          ]
        },
        {
          id: 'male_wargod',
          title: '战神单价',
          columns: [
            { key: 'hour_1', label: '1小时' },
            { key: 'day_5', label: '包天5小时' },
            { key: 'day_10', label: '包天10小时' },
            { key: 'week_5', label: '包周5小时' },
            { key: 'week_10', label: '包周10小时' },
            { key: 'month_10_per_day', label: '包月10小时/天' }
          ],
          rows: [
            {
              id: 'jimi',
              label: '机密',
              values: {
                hour_1: { raw: '130', value: 130 },
                day_5: { raw: '599', value: 599 },
                day_10: { raw: '1159', value: 1159 },
                week_5: { raw: '3769', value: 3769 },
                week_10: { raw: '7639', value: 7639 },
                month_10_per_day: { raw: '31200', value: 31200 }
              }
            },
            {
              id: 'juemi',
              label: '绝密',
              values: {
                hour_1: { raw: '150', value: 150 },
                day_5: { raw: '689', value: 689 },
                day_10: { raw: '1339', value: 1339 },
                week_5: { raw: '4559', value: 4559 },
                week_10: { raw: '8819', value: 8819 },
                month_10_per_day: { raw: '35999', value: 35999 }
              }
            }
          ],
          notes: [
            '战神要求机密绝密均是全装满改双枪进图，双陪至少有一把aw，包全卡，不得低于7个人头/h，或者绝密每小时至少撤离一把，机密每小时撤离2把，满足其一不算炸单。',
            '单陪不要求撤离率，只计算人头，如果人头不够，撤离也不算炸单，只在本俱乐部点一个打手便算单陪。',
            '单陪老板返装+10/h，老板卡战备一护二+20/h，监狱+10/h。'
          ]
        },
        {
          id: 'male_devil',
          title: '魔王单价',
          columns: [
            { key: 'hour_1', label: '1小时' },
            { key: 'hour_5', label: '5小时' },
            { key: 'hour_10', label: '10小时' },
            { key: 'double_devil_1h', label: '双魔王1小时' },
            { key: 'double_devil_5h', label: '双魔王5小时' }
          ],
          rows: [
            {
              id: 'juemi',
              label: '绝密',
              values: {
                hour_1: { raw: '200', value: 200 },
                hour_5: { raw: '910', value: 910 },
                hour_10: { raw: '1888', value: 1888 },
                double_devil_1h: { raw: '388', value: 388 },
                double_devil_5h: { raw: '1888', value: 1888 }
              }
            }
          ],
          notes: [
            '魔王要求全装双枪满改进图，包全卡，不得低于10个人/h，或每小时撤离2把，满足其一不算炸单。',
            '单陪：单陪每小时不得低于10个人头，或每小时撤离1把，满足其一不算炸单，只在本俱乐部点一个打手便算单陪。',
            '单陪老板起装+10/h，老板卡战备一护二+20/h，监狱+10/h。'
          ]
        },
        {
          id: 'male_sweet',
          title: '甜蜜陪单价',
          columns: [
            { key: 'single', label: '单陪' },
            { key: 'double', label: '双陪' }
          ],
          rows: [
            {
              id: 'jimi',
              label: '机密',
              values: {
                single: { raw: '100R/h', value: 100 },
                double: { raw: '180/h', value: 180 }
              }
            }
          ],
          notes: ['甜蜜陪无起装要求无赔付，仅娱乐。']
        }
      ]
    },
    {
      id: 'female',
      title: '女陪价格表',
      type: 'raw-tables',
      tables: [
        {
          id: 'female_entertain',
          title: '娱乐单价',
          columns: [
            { key: 'hour_1', label: '1小时' },
            { key: 'day_5', label: '包天5小时' },
            { key: 'day_10', label: '包天10小时' },
            { key: 'week_5', label: '包周5小时' },
            { key: 'week_10', label: '包周10小时' },
            { key: 'month_10_per_day', label: '包月10小时/天' }
          ],
          rows: [
            {
              id: 'common',
              label: '常规',
              values: {
                hour_1: { raw: '60', value: 60 },
                day_5: { raw: '279', value: 279 },
                day_10: { raw: '529', value: 529 },
                week_5: { raw: '1829', value: 1829 },
                week_10: { raw: '3528', value: 3528 },
                month_10_per_day: { raw: '14399', value: 14399 }
              }
            },
            {
              id: 'jimi',
              label: '机密',
              values: {
                hour_1: { raw: '70', value: 70 },
                day_5: { raw: '329', value: 329 },
                day_10: { raw: '619', value: 619 },
                week_5: { raw: '2139', value: 2139 },
                week_10: { raw: '4119', value: 4119 },
                month_10_per_day: { raw: '16799', value: 16799 }
              }
            },
            {
              id: 'juemi',
              label: '绝密',
              values: {
                hour_1: { raw: '80', value: 80 },
                day_5: { raw: '379', value: 379 },
                day_10: { raw: '729', value: 729 },
                week_5: { raw: '2439', value: 2439 },
                week_10: { raw: '4709', value: 4709 },
                month_10_per_day: { raw: '19199', value: 19199 }
              }
            }
          ],
          notes: [
            '娱乐陪需要熟悉三角洲所有地图，知道所有的物资点位，自带试点卡，物资卡有什么用什么，不强制。',
            '最主要一点要提供情绪价值，娱乐陪每局战备不强制要求，禁止卡战备和凯式营进图。',
            '娱乐陪没有杀人要求，但是要熟悉三角洲的各个干员技能，能补位，陪着老板玩。'
          ]
        },
        {
          id: 'female_entertain_skill',
          title: '娱乐技术单价',
          columns: [
            { key: 'hour_1', label: '1小时' },
            { key: 'day_5', label: '包天5小时' },
            { key: 'day_10', label: '包天10小时' },
            { key: 'week_10', label: '包周10小时' },
            { key: 'month_10', label: '包月10小时' }
          ],
          rows: [
            {
              id: 'jimi',
              label: '机密',
              values: {
                hour_1: { raw: '100', value: 100 },
                day_5: { raw: '469', value: 469 },
                day_10: { raw: '899', value: 899 },
                week_10: { raw: '5879', value: 5879 },
                month_10: { raw: '23999', value: 23999 }
              }
            },
            {
              id: 'juemi',
              label: '绝密',
              values: {
                hour_1: { raw: '120', value: 120 },
                day_5: { raw: '559', value: 559 },
                day_10: { raw: '1079', value: 1079 },
                week_10: { raw: '7059', value: 7059 },
                month_10: { raw: '28799', value: 28799 }
              }
            }
          ],
          notes: ['娱乐技术要求：不能卡战备进图，无赔付。']
        },
        {
          id: 'female_top',
          title: '顶尖单价',
          columns: [
            { key: 'hour_1', label: '1小时' },
            { key: 'day_5', label: '包天5小时' },
            { key: 'day_10', label: '包天10小时' },
            { key: 'week_10', label: '包周10小时' },
            { key: 'month_10', label: '包月10小时' }
          ],
          rows: [
            {
              id: 'jimi',
              label: '机密',
              values: {
                hour_1: { raw: '120', value: 120 },
                day_5: { raw: '580', value: 580 },
                day_10: { raw: '1150', value: 1150 },
                week_10: { raw: '7999', value: 7999 },
                month_10: { raw: '34188', value: 34188 }
              }
            },
            {
              id: 'juemi',
              label: '绝密',
              values: {
                hour_1: { raw: '140', value: 140 },
                day_5: { raw: '680', value: 680 },
                day_10: { raw: '1350', value: 1350 },
                week_10: { raw: '9388', value: 9388 },
                month_10: { raw: '39888', value: 39888 }
              }
            }
          ],
          notes: [
            '将军要求机密绝密均是5套5弹进图，包全卡，不低于4个人头/h或绝密每小时跑赢一把（机密每小时必须跑赢1把）满足其一不算炸单。',
            '单陪不要求撤离率，只计算人头，如果人头不够，撤离也不算炸单，只在本俱乐部点一个打手便算单陪。',
            '单陪老板起装+10，老板卡战备一护二+20/h。'
          ]
        },
        {
          id: 'female_wargod',
          title: '战神单价',
          columns: [
            { key: 'hour_1', label: '1小时' },
            { key: 'day_5', label: '包天5小时' },
            { key: 'day_10', label: '包天10小时' },
            { key: 'week_10', label: '包周10小时' },
            { key: 'month_10', label: '包月10小时' }
          ],
          rows: [
            {
              id: 'jimi',
              label: '机密',
              values: {
                hour_1: { raw: '150', value: 150 },
                day_5: { raw: '735', value: 735 },
                day_10: { raw: '1455', value: 1455 },
                week_10: { raw: '10080', value: 10080 },
                month_10: { raw: '42750', value: 42750 }
              }
            },
            {
              id: 'juemi',
              label: '绝密',
              values: {
                hour_1: { raw: '170', value: 170 },
                day_5: { raw: '830', value: 830 },
                day_10: { raw: '1469', value: 1469 },
                week_10: { raw: '11420', value: 11420 },
                month_10: { raw: '48450', value: 48450 }
              }
            }
          ],
          notes: [
            '战神要求机密绝密均是5套5弹满改进图，至少有一把aw，包全卡，不低于6个人头/h或绝密每小时撤离1把（机密每小时撤离2把），满足其一不算炸单。',
            '单陪不要求撤离率，只计算人头，如果人头不够，撤离也不算炸单，只在本俱乐部点一个打手便算单陪。',
            '单陪老板起装+10，老板卡战备一护二+20/h。'
          ]
        },
        {
          id: 'female_devil',
          title: '魔王单价',
          columns: [
            { key: 'hour_1', label: '1小时' },
            { key: 'day_5', label: '包天5小时' },
            { key: 'day_10', label: '包天10小时' },
            { key: 'week_10', label: '包周10小时' },
            { key: 'month_10', label: '包月10小时' }
          ],
          rows: [
            {
              id: 'juemi',
              label: '绝密',
              values: {
                hour_1: { raw: '220', value: 220 },
                day_5: { raw: '1089', value: 1089 },
                day_10: { raw: '2130', value: 2130 },
                week_10: { raw: '14780', value: 14780 },
                month_10: { raw: '62700', value: 62700 }
              }
            }
          ],
          notes: [
            '魔王要求5套5弹进图，双枪满改，包全卡，平均每小时不得低于9个人头，或每小时撤离2把，满足其一不算炸单。',
            '单陪两小时不得低于8个人头，或每小时撤离1把，满足其一不算炸单，只在本俱乐部点一个打手便算单陪。',
            '单陪老板起装+10，老板卡战备一护二+20/h。'
          ]
        },
        {
          id: 'female_sweet',
          title: '甜蜜陪单价',
          columns: [
            { key: 'single', label: '单陪' },
            { key: 'double', label: '双陪' }
          ],
          rows: [
            {
              id: 'jimi',
              label: '机密',
              values: {
                single: { raw: '100R/h', value: 100 },
                double: { raw: '180/h', value: 180 }
              }
            }
          ],
          notes: ['甜蜜陪无起装要求无赔付，仅娱乐。']
        }
      ]
    }
  ],
  placeholders: {
    memberPlans: {
      status: '未指定',
      reason: '当前完整 DOCX 与补充完整截图未包含预存卡表，禁止前端自行编造具体价格。',
      options: [
        '隐藏会员入口',
        '仅显示“会员体系敬请期待”',
        '若后续确认旧海报可用，再单独新增 memberPlans 数据文件'
      ]
    },
    notifications: {
      status: '未指定',
      reason: '本期仅保留消息/通知占位，不接入真实订阅消息'
    },
    reviews: {
      status: '未指定',
      reason: '本期仅保留评价入口占位，不接入真实评价写入'
    }
  }
}

module.exports = {
  pricingFull
}
