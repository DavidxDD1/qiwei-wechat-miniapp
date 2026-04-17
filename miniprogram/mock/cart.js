const { addItem, clearCart, getCart, removeItem, toggleItem, updateRemark } = require('../store/cartStore')
const { pricingFull } = require('../data/pricingFull')
const { getPrice } = require('../utils/getPrice')
const { formatSelectionName } = require('../utils/format')

function wrap(data) {
  return {
    code: 0,
    message: 'ok',
    data,
    requestId: `mock_${Date.now()}`
  }
}

async function cartAdd(params) {
  const locator = params.locator || {}
  const price = getPrice(pricingFull, locator)
  const item = {
    id: `cart_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    locator,
    quantity: Number(params.quantity || 1),
    price,
    displayName: formatSelectionName(pricingFull, locator),
    checked: true,
    remark: ''
  }

  return wrap(addItem(item))
}

async function cartList() {
  return wrap(getCart())
}

async function cartRemove(params) {
  return wrap(removeItem(params.itemId))
}

async function cartToggle(params) {
  return wrap(toggleItem(params.itemId))
}

async function cartRemark(params) {
  return wrap(updateRemark(params.itemId, params.remark || ''))
}

async function cartClear() {
  return wrap(clearCart())
}

module.exports = {
  cartAdd,
  cartList,
  cartRemove,
  cartToggle,
  cartRemark,
  cartClear
}
