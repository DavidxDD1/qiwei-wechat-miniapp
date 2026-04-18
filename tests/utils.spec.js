const assert = require('node:assert/strict')
const test = require('node:test')

const { pricingFull } = require('../miniprogram/data/pricingFull')
const { pickFeaturedOffers } = require('../miniprogram/utils/featured')
const { getPrice } = require('../miniprogram/utils/getPrice')
const { generateOrderId } = require('../miniprogram/utils/generateOrderId')
const { validateOrderForm } = require('../miniprogram/utils/validateOrderForm')

test('getPrice resolves escort entry-group prices', () => {
  const price = getPrice(pricingFull, {
    serviceId: 'escort',
    sectionId: 'escort_trial',
    entryId: 'trial_128_888'
  })

  assert.equal(price, 128)
})

test('getPrice resolves raw-table prices', () => {
  const price = getPrice(pricingFull, {
    serviceId: 'female',
    tableId: 'female_entertain',
    rowId: 'juemi',
    columnKey: 'month_10_per_day'
  })

  assert.equal(price, 19199)
})

test('generateOrderId returns QW prefixed id with timestamp and random suffix', () => {
  const orderId = generateOrderId()

  assert.match(orderId, /^QW\d{16}$/)
})

test('pickFeaturedOffers returns unique hot sale items with prices', () => {
  const offers = pickFeaturedOffers(pricingFull, 4, () => 0.23)

  assert.equal(offers.length, 4)
  assert.equal(new Set(offers.map((item) => item.id)).size, 4)
  assert.ok(offers.every((item) => item.price > 0))
  assert.ok(offers.every((item) => item.title))
  assert.ok(offers.every((item) => item.priceText))
})

test('pickFeaturedOffers respects available data size', () => {
  const offers = pickFeaturedOffers(
    {
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
                { id: 'trial_1', rawLabel: '128保888', price: 128, displayPrice: '￥128' }
              ]
            }
          ]
        }
      ]
    },
    4,
    () => 0.5
  )

  assert.equal(offers.length, 1)
  assert.equal(offers[0].price, 128)
})

test('validateOrderForm rejects missing items', () => {
  const result = validateOrderForm({
    items: [],
    contactName: '\u5f20\u4e09',
    contactPhone: '13800138000',
    agreeRules: true
  })

  assert.equal(result.valid, false)
  assert.equal(result.message, '\u8bf7\u9009\u62e9\u81f3\u5c11\u4e00\u4e2a\u670d\u52a1\u9879')
})

test('validateOrderForm rejects invalid phone', () => {
  const result = validateOrderForm({
    items: [{ id: 'x' }],
    contactName: '\u5f20\u4e09',
    contactPhone: '123',
    agreeRules: true
  })

  assert.equal(result.valid, false)
  assert.equal(result.message, '\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7')
})

test('validateOrderForm accepts valid payload', () => {
  const result = validateOrderForm({
    items: [{ id: 'x' }],
    contactName: '\u5f20\u4e09',
    contactPhone: '13800138000',
    agreeRules: true
  })

  assert.equal(result.valid, true)
})
