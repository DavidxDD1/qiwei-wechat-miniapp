const { ORDER_STATUS } = require('../config/constants')
const { pricingFull } = require('../data/pricingFull')
const { generateOrderId } = require('../utils/generateOrderId')
const { formatSelectionName } = require('../utils/format')
const { getStorageSync, setStorageSync } = require('../utils/storage')

const ORDER_KEY = 'qiwai_orders_v15'

function wrap(data) {
  return {
    code: 0,
    message: 'ok',
    data,
    requestId: `mock_${Date.now()}`
  }
}

function listOrders() {
  return getStorageSync(ORDER_KEY) || []
}

function saveOrders(orders) {
  setStorageSync(ORDER_KEY, orders)
  return orders
}

async function orderCreate(params) {
  const orderNo = generateOrderId()
  const order = {
    orderNo,
    status: ORDER_STATUS.PENDING,
    createdAt: Date.now(),
    payableAmount: (params.items || []).reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
      0
    ),
    items: (params.items || []).map((item) => ({
      ...item,
      displayName: item.displayName || formatSelectionName(pricingFull, item.locator || {})
    })),
    contact: {
      contactName: params.contactName || '',
      contactPhone: params.contactPhone || '',
      contactWechat: params.contactWechat || ''
    },
    remark: params.remark || ''
  }

  const nextOrders = [order, ...listOrders()]
  saveOrders(nextOrders)

  return wrap({
    orderNo,
    status: order.status,
    order
  })
}

async function orderList(params = {}) {
  const list = listOrders().filter((item) =>
    params.status ? item.status === params.status : true
  )

  return wrap({ list })
}

async function orderDetail(params = {}) {
  const order = listOrders().find((item) => item.orderNo === params.orderNo)
  return wrap({ order: order || null })
}

module.exports = {
  orderCreate,
  orderList,
  orderDetail
}
