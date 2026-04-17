const { getCart } = require('../../services/cart')
const { createOrder } = require('../../services/order')
const { redirectTo, switchTab } = require('../../utils/router')

function sumPrice(items) {
  return (items || []).reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  )
}

Page({
  data: {
    mode: 'cart',
    items: [],
    totalPrice: 0,
    contactName: '',
    contactPhone: '',
    contactWechat: '',
    remark: '',
    agreeRules: false,
    submitting: false
  },

  async onLoad(options) {
    await this.loadOrderItems((options && options.mode) || 'cart')
  },

  async loadOrderItems(mode) {
    try {
      let items = []

      if (mode === 'direct') {
        const app = getApp()
        const currentSelection = app.globalData.currentSelection || null
        items = currentSelection ? [currentSelection] : []
      } else {
        const cart = await getCart()
        items = (cart.items || []).filter((item) => item.checked !== false)
      }

      if (!items.length) {
        wx.showToast({
          title: '当前没有可下单的服务项',
          icon: 'none'
        })

        switchTab(mode === 'direct' ? '/pages/service/index' : '/pages/cart/index')
        return
      }

      this.setData({
        mode,
        items,
        totalPrice: sumPrice(items)
      })
    } catch (error) {
      wx.showToast({
        title: error.message || '加载订单信息失败',
        icon: 'none'
      })
    }
  },

  handleInput(event) {
    const field = event.currentTarget.dataset.field
    this.setData({
      [field]: event.detail.value || ''
    })
  },

  toggleAgree() {
    this.setData({
      agreeRules: !this.data.agreeRules
    })
  },

  async handleSubmit() {
    if (this.data.submitting) {
      return
    }

    this.setData({
      submitting: true
    })

    try {
      const result = await createOrder({
        items: this.data.items,
        contactName: this.data.contactName,
        contactPhone: this.data.contactPhone,
        contactWechat: this.data.contactWechat,
        remark: this.data.remark,
        agreeRules: this.data.agreeRules
      })

      const app = getApp()
      app.globalData.currentOrder = result.order

      redirectTo('/pages/pay-info/index', {
        orderNo: result.orderNo
      })
    } catch (error) {
      wx.showToast({
        title: error.message || '提交失败',
        icon: 'none'
      })
    } finally {
      this.setData({
        submitting: false
      })
    }
  }
})
