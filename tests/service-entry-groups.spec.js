const assert = require('node:assert/strict')
const test = require('node:test')

const { buildEntryGroupSubtitle } = require('../miniprogram/pages/service/entryGroups')

test('buildEntryGroupSubtitle uses the current section title for experience entries', () => {
  assert.equal(
    buildEntryGroupSubtitle('体验单'),
    '点击任一体验单档位后，可加入购物车或直接下单'
  )
})

test('buildEntryGroupSubtitle preserves single-game escort wording instead of forcing a generic label', () => {
  assert.equal(
    buildEntryGroupSubtitle('单局保底单'),
    '点击任一单局保底单档位后，可加入购物车或直接下单'
  )
})

test('buildEntryGroupSubtitle falls back to a generic label when the section title is empty', () => {
  assert.equal(
    buildEntryGroupSubtitle(''),
    '点击任一档位后，可加入购物车或直接下单'
  )
})
