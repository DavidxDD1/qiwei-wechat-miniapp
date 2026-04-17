const { getStorageSync, setStorageSync } = require('../utils/storage')

const CART_KEY = 'qiwai_cart_v15'

function listItems() {
  return getStorageSync(CART_KEY) || []
}

function saveItems(items) {
  setStorageSync(CART_KEY, items)
  return items
}

function getCart() {
  const items = listItems()
  const totalPrice = items
    .filter((item) => item.checked !== false)
    .reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0)

  return {
    items,
    totalPrice
  }
}

function addItem(item) {
  const items = listItems()
  const nextItems = [...items, item]
  saveItems(nextItems)
  return getCart()
}

function removeItem(itemId) {
  const nextItems = listItems().filter((item) => item.id !== itemId)
  saveItems(nextItems)
  return getCart()
}

function updateRemark(itemId, remark) {
  const nextItems = listItems().map((item) =>
    item.id === itemId ? { ...item, remark } : item
  )
  saveItems(nextItems)
  return getCart()
}

function toggleItem(itemId) {
  const nextItems = listItems().map((item) =>
    item.id === itemId ? { ...item, checked: item.checked === false } : item
  )
  saveItems(nextItems)
  return getCart()
}

function clearCart() {
  saveItems([])
  return getCart()
}

module.exports = {
  getCart,
  addItem,
  removeItem,
  updateRemark,
  toggleItem,
  clearCart
}
