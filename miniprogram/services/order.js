const { adapter } = require('./adapter')
const { validateOrderForm } = require('../utils/validateOrderForm')

async function createOrder(payload) {
  const check = validateOrderForm(payload)
  if (!check.valid) {
    throw new Error(check.message)
  }

  const res = await adapter.orderCreate(payload)
  if (res.code !== 0) {
    throw new Error(res.message || '创建订单失败')
  }
  return res.data
}

async function getOrderList(status) {
  const res = await adapter.orderList(status ? { status } : {})
  if (res.code !== 0) {
    throw new Error(res.message || '获取订单失败')
  }

  return res.data
}

async function getOrderDetail(orderNo) {
  const res = await adapter.orderDetail({ orderNo })
  if (res.code !== 0) {
    throw new Error(res.message || '获取订单详情失败')
  }

  return res.data
}

module.exports = {
  createOrder,
  getOrderList,
  getOrderDetail
}
