const assert = require('node:assert/strict')
const test = require('node:test')

const { startDirectOrder } = require('../miniprogram/pages/service/directOrder')

test('startDirectOrder stores the current selection and navigates to order intent', () => {
  const app = {
    globalData: {}
  }
  const navigateCalls = []

  const started = startDirectOrder(
    app,
    {
      locator: {
        serviceId: 'escort',
        sectionId: 'escort_trial',
        entryId: 'trial_128_888'
      },
      price: 128,
      displayName: '护航单 / 体验单 / 128保888'
    },
    (url, params) => {
      navigateCalls.push({ url, params })
    }
  )

  assert.equal(started, true)
  assert.equal(app.globalData.currentSelection.price, 128)
  assert.equal(app.globalData.currentSelection.displayName, '护航单 / 体验单 / 128保888')
  assert.deepEqual(navigateCalls, [
    {
      url: '/pages/order-intent/index',
      params: {
        mode: 'direct'
      }
    }
  ])
})

test('startDirectOrder rejects incomplete selections without navigating', () => {
  const app = {
    globalData: {}
  }
  const navigateCalls = []

  const started = startDirectOrder(
    app,
    {
      locator: null,
      price: 0,
      displayName: ''
    },
    (url, params) => {
      navigateCalls.push({ url, params })
    }
  )

  assert.equal(started, false)
  assert.equal(app.globalData.currentSelection, undefined)
  assert.deepEqual(navigateCalls, [])
})
