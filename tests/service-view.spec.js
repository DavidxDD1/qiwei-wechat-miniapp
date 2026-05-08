const assert = require('node:assert/strict')
const test = require('node:test')

const { pricingFull } = require('../miniprogram/data/pricingFull')
const {
  buildServiceAdvisor,
  buildServiceView
} = require('../miniprogram/pages/service/serviceView')

test('buildServiceView exposes concrete escort offers for trial sections', () => {
  const escortService = pricingFull.services.find((service) => service.id === 'escort')
  const view = buildServiceView(escortService)
  const trialCard = view.cardsMap.escort_trial

  assert.equal(trialCard.cardType, 'entry-group')
  assert.equal(trialCard.entries.length, 2)
  assert.equal(trialCard.entries[0].title, '128保888')
  assert.equal(trialCard.entries[0].displayPrice, '￥128')
  assert.equal(trialCard.entries[0].guaranteeText, '保底 888')
  assert.deepEqual(trialCard.entries[0].metaTags, ['体验单', '保888'])
  assert.equal(trialCard.entries[0].actionText, '立即下单')
  assert.equal(trialCard.entries[0].selectionKey, 'escort|escort_trial|trial_128_888')
})

test('buildServiceView keeps raw-table services in matrix mode', () => {
  const maleService = pricingFull.services.find((service) => service.id === 'male')
  const view = buildServiceView(maleService)

  assert.equal(view.activeCard.cardType, 'raw-table')
  assert.equal(view.activeCard.rows[0].cells[0].priceText, '￥100')
  assert.equal(view.activeCard.rows[0].cells[0].displayName, '男陪价格表 / 顶尖单价 / 机密 / 1小时')
})

test('buildServiceAdvisor gives entry-group services direct-order guidance', () => {
  const escortService = pricingFull.services.find((service) => service.id === 'escort')
  const view = buildServiceView(escortService)
  const advisor = buildServiceAdvisor(escortService, view, false)

  assert.equal(advisor.title, '先按单型锁定方案')
  assert.deepEqual(
    advisor.tags.map((item) => item.label),
    ['适合', '优先看', '确认点']
  )
  assert.ok(advisor.steps.some((step) => step.includes('服务卡片')))
})

test('buildServiceAdvisor marks matrix services as comparison flows', () => {
  const femaleService = pricingFull.services.find((service) => service.id === 'female')
  const view = buildServiceView(femaleService)
  const advisor = buildServiceAdvisor(femaleService, view, true)

  assert.equal(advisor.title, '先筛路线，再比价格')
  assert.equal(advisor.statusText, '方案已锁定')
  assert.ok(advisor.steps.some((step) => step.includes('横向比较')))
})
