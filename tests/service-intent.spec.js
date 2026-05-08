const assert = require('node:assert/strict')
const test = require('node:test')

const {
  consumePendingServiceIntent,
  normalizeServiceIntent,
  setPendingServiceIntent
} = require('../miniprogram/utils/serviceIntent')

test('service intent stores a valid service id and clears it after consumption', () => {
  const app = { globalData: {} }

  const stored = setPendingServiceIntent(app, 'female')
  const consumed = consumePendingServiceIntent(app)

  assert.equal(stored, 'female')
  assert.equal(consumed, 'female')
  assert.equal(app.globalData.pendingServiceId, '')
})

test('service intent rejects unknown service ids without mutating global state', () => {
  const app = { globalData: { pendingServiceId: 'escort' } }

  const stored = setPendingServiceIntent(app, 'unknown')

  assert.equal(stored, '')
  assert.equal(app.globalData.pendingServiceId, 'escort')
})

test('normalizeServiceIntent accepts only supported homepage service targets', () => {
  assert.equal(normalizeServiceIntent('escort'), 'escort')
  assert.equal(normalizeServiceIntent('male'), 'male')
  assert.equal(normalizeServiceIntent('female'), 'female')
  assert.equal(normalizeServiceIntent(''), '')
  assert.equal(normalizeServiceIntent(null), '')
})
