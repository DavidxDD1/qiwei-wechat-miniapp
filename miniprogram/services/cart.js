const { adapter } = require('./adapter')

async function addToCart(payload) {
  const res = await adapter.cartAdd(payload)
  if (res.code !== 0) {
    throw new Error(res.message || '加入购物车失败')
  }

  return res.data
}

async function getCart() {
  const res = await adapter.cartList({})
  if (res.code !== 0) {
    throw new Error(res.message || '获取购物车失败')
  }

  return res.data
}

async function removeFromCart(itemId) {
  const res = await adapter.cartRemove({ itemId })
  if (res.code !== 0) {
    throw new Error(res.message || '删除购物车失败')
  }

  return res.data
}

async function toggleCartItem(itemId) {
  const res = await adapter.cartToggle({ itemId })
  if (res.code !== 0) {
    throw new Error(res.message || '更新购物车失败')
  }

  return res.data
}

async function updateCartRemark(itemId, remark) {
  const res = await adapter.cartRemark({ itemId, remark })
  if (res.code !== 0) {
    throw new Error(res.message || '更新备注失败')
  }

  return res.data
}

async function clearCart() {
  const res = await adapter.cartClear({})
  if (res.code !== 0) {
    throw new Error(res.message || '清空购物车失败')
  }

  return res.data
}

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  toggleCartItem,
  updateCartRemark,
  clearCart
}
