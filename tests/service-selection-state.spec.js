const assert = require('node:assert/strict')
const test = require('node:test')

const { buildSelectionState } = require('../miniprogram/pages/service/selectionState')

test('buildSelectionState exposes entry-group preview items when no concrete selection is locked', () => {
  const state = buildSelectionState(
    {
      cardType: 'entry-group',
      title: '体验单',
      subtitle: '点击任一体验单档位后，可加入购物车或直接下单',
      entries: [
        { rawLabel: '128保888', displayPrice: '￥128' },
        { rawLabel: '258保1588', displayPrice: '￥258' }
      ]
    },
    '',
    0
  )

  assert.deepEqual(state.previewItems, [
    '128保888 · ￥128',
    '258保1588 · ￥258'
  ])
})

test('buildSelectionState does not expose preview items after a concrete price is selected', () => {
  const state = buildSelectionState(
    {
      cardType: 'entry-group',
      title: '体验单',
      subtitle: '点击任一体验单档位后，可加入购物车或直接下单',
      entries: [
        { rawLabel: '128保888', displayPrice: '￥128' },
        { rawLabel: '258保1588', displayPrice: '￥258' }
      ]
    },
    '护航单 / 体验单 / 128保888',
    128
  )

  assert.deepEqual(state.previewItems, [])
})

test('buildSelectionState keeps preview items empty for raw-table cards', () => {
  const state = buildSelectionState(
    {
      cardType: 'raw-table',
      title: '顶尖单价',
      subtitle: '点击表格单元格即可锁定原表价格'
    },
    '',
    0
  )

  assert.deepEqual(state.previewItems, [])
})
