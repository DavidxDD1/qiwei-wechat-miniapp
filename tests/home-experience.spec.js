const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const homeContent = require('../miniprogram/data/homeContent')

function readFile(relativePath) {
  return fs.readFileSync(path.join(__dirname, '..', relativePath), 'utf8')
}

test('home content defines service-specific entrypoints and trust signals', () => {
  assert.deepEqual(
    homeContent.serviceEntrypoints.map((item) => item.serviceId),
    ['escort', 'male', 'female']
  )
  assert.ok(homeContent.serviceEntrypoints.every((item) => item.intent && item.actionText))
  assert.ok(homeContent.trustSignals.length >= 3)
  assert.ok(homeContent.trustSignals.every((item) => item.title && item.desc))
})

test('home page renders service entrypoints as direct service-target buttons', () => {
  const source = readFile('miniprogram/pages/home/index.wxml')

  assert.match(source, /class="[^"]*page-stack[^"]*"/)
  assert.match(source, /wx:for="\{\{serviceEntrypoints\}\}"/)
  assert.match(source, /data-service-id="\{\{item\.serviceId\}\}"/)
  assert.match(source, /bindtap="handleServiceEntry"/)
  assert.match(source, /wx:for="\{\{trustSignals\}\}"/)
  assert.match(source, /class="[^"]*panel-card[^"]*home-service-card[^"]*"/)
})

test('home and service pages share pending service intent for tab navigation', () => {
  const homeScript = readFile('miniprogram/pages/home/index.js')
  const serviceScript = readFile('miniprogram/pages/service/index.js')

  assert.match(homeScript, /setPendingServiceIntent/)
  assert.match(homeScript, /handleServiceEntry/)
  assert.match(serviceScript, /consumePendingServiceIntent/)
  assert.match(serviceScript, /onShow\(\)/)
})

test('service page renders an advisor panel before the price table', () => {
  const source = readFile('miniprogram/pages/service/index.wxml')

  assert.match(source, /class="[^"]*page-stack[^"]*service-page[^"]*"/)
  assert.match(source, /class="[^"]*panel-card[^"]*service-advisor[^"]*"/)
  assert.match(source, /\{\{serviceAdvisor\.title\}\}/)
  assert.match(source, /wx:for="\{\{serviceAdvisor\.tags\}\}"/)
  assert.match(source, /wx:for="\{\{serviceAdvisor\.steps\}\}"/)
})
