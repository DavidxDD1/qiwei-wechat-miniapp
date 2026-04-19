const { formatPrice } = require('../../utils/format')

function buildEntryGroupPreviewItems(activeCard) {
  if (!activeCard || activeCard.cardType !== 'entry-group') {
    return []
  }

  return (activeCard.entries || [])
    .map((entry) => {
      const label = String(entry && entry.rawLabel ? entry.rawLabel : '').trim()
      const priceText = String(entry && entry.displayPrice ? entry.displayPrice : '').trim()

      if (label && priceText) {
        return `${label} · ${priceText}`
      }

      return label || priceText
    })
    .filter(Boolean)
}

function buildSelectionState(activeCard, selectedDisplay, selectedPrice) {
  if (selectedDisplay && selectedPrice) {
    return {
      selectionEyebrow: '已锁定方案',
      selectionTitle: selectedDisplay,
      selectionDescription: '当前价格已锁定，可直接加入购物车或继续提交预约意向。',
      selectionPriceText: formatPrice(selectedPrice),
      previewItems: []
    }
  }

  return {
    selectionEyebrow: '等待选择',
    selectionTitle: activeCard ? activeCard.title : '请选择一个价格目录',
    selectionDescription: activeCard ? activeCard.subtitle : '当前目录暂无可展示的价格内容。',
    selectionPriceText: '待选择',
    previewItems: buildEntryGroupPreviewItems(activeCard)
  }
}

module.exports = {
  buildSelectionState
}
