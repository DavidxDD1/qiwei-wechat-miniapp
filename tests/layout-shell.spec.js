const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

function readFile(relativePath) {
  return fs.readFileSync(path.join(__dirname, '..', relativePath), 'utf8')
}

test('page shell reserves space using the shared bottom bar offset token', () => {
  const appStyles = readFile('miniprogram/app.wxss')

  assert.match(appStyles, /--page-bottom-offset:\s*188px;/)
  assert.match(
    appStyles,
    /\.page-shell\s*\{[\s\S]*padding:\s*24px var\(--page-padding\) calc\(var\(--page-bottom-offset\) \+ env\(safe-area-inset-bottom\)\);/
  )
})

test('price bar uses a stacked layout that fits narrow screens without squeezing content vertically', () => {
  const priceBarStyles = readFile('miniprogram/components/price-bar/index.wxss')

  assert.match(priceBarStyles, /\.price-bar\s*\{[\s\S]*min-height:\s*var\(--page-bottom-offset\);/)
  assert.match(priceBarStyles, /\.price-bar\s*\{[\s\S]*flex-direction:\s*column;/)
  assert.match(priceBarStyles, /\.price-bar__actions\s*\{[\s\S]*width:\s*100%;/)
  assert.match(priceBarStyles, /\.price-bar__button\s*\{[\s\S]*flex:\s*1;/)
  assert.match(priceBarStyles, /\.price-bar__label\s*\{[\s\S]*text-overflow:\s*ellipsis;/)
})
