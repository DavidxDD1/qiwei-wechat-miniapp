const assert = require('node:assert/strict')
const test = require('node:test')

const { pricingFull } = require('../miniprogram/data/pricingFull')
const { buildServiceView } = require('../miniprogram/pages/service/serviceView')

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
