const { ORDER_STATUS } = require('../../config/constants')
const { getOrderList } = require('../../services/order')
const { switchTab } = require('../../utils/router')

const FILTERS = [
  { id: 'all', label: '全部' },
  { id: ORDER_STATUS.PENDING, label: ORDER_STATUS.PENDING },
  { id: ORDER_STATUS.CONFIRMED, label: ORDER_STATUS.CONFIRMED },
  { id: ORDER_STATUS.CANCELLED, label: ORDER_STATUS.CANCELLED }
]

function formatTime(timestamp) {
  const date = new Date(Number(timestamp || Date.now()))
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  const hour = `${date.getHours()}`.padStart(2, '0')
  const minute = `${date.getMinutes()}`.padStart(2, '0')

  return `${year}-${month}-${day} ${hour}:${minute}`
}

function getTone(status) {
  if (status === ORDER_STATUS.CONFIRMED) {
    return 'confirmed'
  }

  if (status === ORDER_STATUS.CANCELLED) {
    return 'cancelled'
  }

  return 'pending'
}

Page({
  data: {
    filters: FILTERS,
    activeStatus: 'all',
    orders: []
  },

  onShow() {
    this.loadOrders(this.data.activeStatus)
  },

  async loadOrders(status) {
    try {
      const result = await getOrderList(status === 'all' ? '' : status)
      const orders = (result.list || []).map((item) => ({
        ...item,
        tone: getTone(item.status),
        createdAtText: formatTime(item.createdAt)
      }))

      this.setData({
        activeStatus: status,
        orders
      })
    } catch (error) {
      wx.showToast({
        title: error.message || '加载订单失败',
        icon: 'none'
      })
    }
  },

  handleFilterChange(event) {
    const status = event.currentTarget.dataset.id
    this.loadOrders(status)
  },

  handleGoService() {
    switchTab('/pages/service/index')
  }
})
