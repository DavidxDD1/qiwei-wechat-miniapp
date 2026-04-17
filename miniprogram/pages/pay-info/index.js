const { ENABLE_CONTACT_BUTTON } = require('../../config/env')
const { PLACEHOLDER_TEXT } = require('../../config/constants')
const { getOrderDetail } = require('../../services/order')
const { paymentPrepare } = require('../../services/payment')
const { switchTab } = require('../../utils/router')

function getTone(status) {
  if (status === '\u5df2\u786e\u8ba4') {
    return 'confirmed'
  }

  if (status === '\u5df2\u53d6\u6d88') {
    return 'cancelled'
  }

  return 'pending'
}

Page({
  data: {
    order: null,
    canOnlinePay: false,
    paymentMode: 'manual',
    useContactButton: !!ENABLE_CONTACT_BUTTON,
    contactText: PLACEHOLDER_TEXT.CONTACT
  },

  async onLoad(options) {
    const app = getApp()
    const orderNo = (options && options.orderNo) || (app.globalData.currentOrder || {}).orderNo || ''

    if (!orderNo) {
      wx.showToast({
        title: '订单号不存在',
        icon: 'none'
      })
      switchTab('/pages/orders/index')
      return
    }

    await this.loadOrder(orderNo)
  },

  async loadOrder(orderNo) {
    try {
      const detail = await getOrderDetail(orderNo)
      const payment = await paymentPrepare(orderNo)
      const order = detail.order || null

      if (!order) {
        wx.showToast({
          title: '订单详情不存在',
          icon: 'none'
        })
        return
      }

      this.setData({
        order: {
          ...order,
          tone: getTone(order.status)
        },
        canOnlinePay: !!payment.data.canOnlinePay,
        paymentMode: payment.data.paymentMode || 'manual'
      })
    } catch (error) {
      wx.showToast({
        title: error.message || '加载支付说明失败',
        icon: 'none'
      })
    }
  },

  handleContactFallback() {
    wx.showToast({
      title: this.data.contactText,
      icon: 'none'
    })
  },

  handleViewOrders() {
    switchTab('/pages/orders/index')
  },

  handleBackService() {
    switchTab('/pages/service/index')
  }
})
