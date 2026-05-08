const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

function readFile(relativePath) {
  return fs.readFileSync(path.join(__dirname, '..', relativePath), 'utf8')
}

test('app styles expose shared layout utilities for stacked pages and panel cards', () => {
  const appStyles = readFile('miniprogram/app.wxss')

  assert.match(appStyles, /--space-section:\s*18px;/)
  assert.match(appStyles, /--space-card:\s*18px;/)
  assert.match(appStyles, /--font-size-heading:\s*16px;/)
  assert.match(appStyles, /--font-size-body:\s*14px;/)
  assert.match(
    appStyles,
    /\.page-stack\s*\{[\s\S]*display:\s*flex;[\s\S]*flex-direction:\s*column;[\s\S]*gap:\s*var\(--space-section\);/
  )
  assert.match(
    appStyles,
    /\.panel-card\s*\{[\s\S]*padding:\s*var\(--space-card\);[\s\S]*display:\s*flex;[\s\S]*flex-direction:\s*column;/
  )
  assert.match(
    appStyles,
    /\.action-stack\s*\{[\s\S]*display:\s*flex;[\s\S]*flex-direction:\s*column;[\s\S]*gap:\s*12px;/
  )
})

test('phase one pages adopt shared page and panel utility classes', () => {
  const files = [
    'miniprogram/pages/order-intent/index.wxml',
    'miniprogram/pages/orders/index.wxml',
    'miniprogram/pages/pay-info/index.wxml',
    'miniprogram/pages/profile/index.wxml'
  ]

  files.forEach((file) => {
    const source = readFile(file)
    assert.match(source, /class="[^"]*page-stack[^"]*"/, `${file} should use the shared page stack class`)
    assert.match(source, /class="[^"]*panel-card[^"]*"/, `${file} should use the shared panel card class`)
  })

  const cartItem = readFile('miniprogram/components/cart-item/index.wxml')
  assert.match(
    cartItem,
    /class="[^"]*panel-card[^"]*"/,
    'cart item cards should inherit the shared panel card layout'
  )
})

test('phase one styles use shared palette tokens instead of legacy hardcoded colors', () => {
  const files = [
    'miniprogram/components/cart-item/index.wxss',
    'miniprogram/pages/order-intent/index.wxss',
    'miniprogram/pages/orders/index.wxss',
    'miniprogram/pages/pay-info/index.wxss',
    'miniprogram/pages/profile/index.wxss'
  ]

  files.forEach((file) => {
    const source = readFile(file)

    assert.doesNotMatch(
      source,
      /#(?:FFFFFF|A0A6B1|00F5A0|FF4D4F)\b/i,
      `${file} should rely on shared color tokens`
    )
    assert.match(source, /var\(--text-primary\)/, `${file} should use the primary text token`)
    assert.match(
      source,
      /var\(--text-secondary\)|var\(--text-tertiary\)/,
      `${file} should use the secondary text palette`
    )
  })
})

test('foundational card components inherit the shared panel-card shell', () => {
  const files = [
    'miniprogram/components/empty-state/index.wxml',
    'miniprogram/components/entry-offer-list/index.wxml',
    'miniprogram/components/page-hero/index.wxml',
    'miniprogram/components/raw-table-card/index.wxml'
  ]

  files.forEach((file) => {
    const source = readFile(file)
    assert.match(source, /class="[^"]*panel-card[^"]*"/, `${file} should compose the shared panel-card class`)
  })
})

test('foundational component typography is sourced from shared design tokens', () => {
  const appStyles = readFile('miniprogram/app.wxss')
  assert.match(appStyles, /--font-size-label:\s*11px;/)
  assert.match(appStyles, /--font-size-title:\s*18px;/)
  assert.match(appStyles, /--font-size-display:\s*24px;/)
  assert.match(appStyles, /--font-size-hero:\s*28px;/)
  assert.match(appStyles, /--font-size-meta:\s*13px;/)
  assert.match(appStyles, /--line-height-relaxed:\s*1\.75;/)

  const sectionTitle = readFile('miniprogram/components/section-title/index.wxss')
  assert.match(sectionTitle, /\.section-title__eyebrow\s*\{[\s\S]*font-size:\s*var\(--font-size-label\);/)
  assert.match(sectionTitle, /\.section-title__headline\s*\{[\s\S]*font-size:\s*var\(--font-size-display\);/)
  assert.match(sectionTitle, /\.section-title__desc\s*\{[\s\S]*line-height:\s*var\(--line-height-relaxed\);/)

  const emptyState = readFile('miniprogram/components/empty-state/index.wxss')
  assert.match(emptyState, /\.empty-state__title\s*\{[\s\S]*font-size:\s*var\(--font-size-title\);/)
  assert.match(emptyState, /\.empty-state__desc\s*\{[\s\S]*font-size:\s*var\(--font-size-body\);/)

  const statusBadge = readFile('miniprogram/components/status-badge/index.wxss')
  assert.match(statusBadge, /\.status-badge\s*\{[\s\S]*font-size:\s*var\(--font-size-caption\);/)

  const pageHero = readFile('miniprogram/components/page-hero/index.wxss')
  assert.match(pageHero, /\.page-hero__title\s*\{[\s\S]*font-size:\s*var\(--font-size-hero\);/)
  assert.match(pageHero, /\.page-hero__metric-value\s*\{[\s\S]*font-size:\s*var\(--font-size-title\);/)

  const entryOfferList = readFile('miniprogram/components/entry-offer-list/index.wxss')
  assert.match(entryOfferList, /\.entry-offer-list__title\s*\{[\s\S]*font-size:\s*var\(--font-size-title\);/)
  assert.match(entryOfferList, /\.entry-offer-list__subtitle\s*\{[\s\S]*font-size:\s*var\(--font-size-meta\);/)

  const rawTableCard = readFile('miniprogram/components/raw-table-card/index.wxss')
  assert.match(rawTableCard, /\.raw-table-card__title\s*\{[\s\S]*font-size:\s*var\(--font-size-title\);/)
  assert.match(rawTableCard, /\.raw-table-card__subtitle\s*\{[\s\S]*font-size:\s*var\(--font-size-meta\);/)
})
