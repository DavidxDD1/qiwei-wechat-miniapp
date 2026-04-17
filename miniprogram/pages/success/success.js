Page({
  data: {
    orderId: '',
    price: ''
  },

  onLoad(options) {
    const app = getApp()
    const currentOrder = app.globalData.currentOrder || {}
    const orderId = options.orderId || currentOrder.orderId || ''
    const price = options.price || currentOrder.price || ''

    if (!orderId) {
      wx.showToast({
        title: '订单信息不存在',
        icon: 'none'
      })
      return
    }

    this.setData({
      orderId,
      price
    })
  }
})
