const { getCart, removeFromCart, toggleCartItem, updateCartRemark } = require('../../services/cart')
const { navigateTo, switchTab } = require('../../utils/router')

Page({
  data: {
    items: [],
    totalPrice: 0,
    checkedCount: 0,
    summaryText: ''
  },

  onShow() {
    this.loadCart()
  },

  async loadCart() {
    try {
      const cart = await getCart()
      const checkedCount = (cart.items || []).filter((item) => item.checked !== false).length

      this.setData({
        items: cart.items || [],
        totalPrice: Number(cart.totalPrice || 0),
        checkedCount,
        summaryText: checkedCount ? `已勾选 ${checkedCount} 项服务` : '当前没有勾选的服务项'
      })
    } catch (error) {
      wx.showToast({
        title: error.message || '加载购物车失败',
        icon: 'none'
      })
    }
  },

  async handleDelete(event) {
    try {
      await removeFromCart(event.detail.itemId)
      await this.loadCart()
    } catch (error) {
      wx.showToast({
        title: error.message || '删除失败',
        icon: 'none'
      })
    }
  },

  async handleToggle(event) {
    try {
      await toggleCartItem(event.detail.itemId)
      await this.loadCart()
    } catch (error) {
      wx.showToast({
        title: error.message || '更新勾选失败',
        icon: 'none'
      })
    }
  },

  async handleRemark(event) {
    try {
      await updateCartRemark(event.detail.itemId, event.detail.remark || '')
      await this.loadCart()
    } catch (error) {
      wx.showToast({
        title: error.message || '更新备注失败',
        icon: 'none'
      })
    }
  },

  handleCheckout() {
    if (!this.data.checkedCount) {
      wx.showToast({
        title: '请先勾选至少一个服务项',
        icon: 'none'
      })
      return
    }

    navigateTo('/pages/order-intent/index', {
      mode: 'cart'
    })
  },

  handleGoService() {
    switchTab('/pages/service/index')
  }
})
