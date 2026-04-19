function buildDirectItem(selectedLocator, selectedPrice, selectedDisplay) {
  return {
    id: `direct_${Date.now()}`,
    locator: selectedLocator,
    quantity: 1,
    price: selectedPrice,
    displayName: selectedDisplay,
    checked: true,
    remark: ''
  }
}

function startDirectOrder(app, selection, navigate) {
  if (
    !app ||
    !app.globalData ||
    !selection ||
    !selection.locator ||
    !selection.price ||
    !selection.displayName ||
    typeof navigate !== 'function'
  ) {
    return false
  }

  app.globalData.currentSelection = buildDirectItem(
    selection.locator,
    selection.price,
    selection.displayName
  )

  navigate('/pages/order-intent/index', {
    mode: 'direct'
  })

  return true
}

module.exports = {
  buildDirectItem,
  startDirectOrder
}
