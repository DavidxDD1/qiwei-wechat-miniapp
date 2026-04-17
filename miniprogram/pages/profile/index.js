const { login } = require('../../services/auth')
const { getProfileData } = require('../../services/profile')
const { switchTab } = require('../../utils/router')

Page({
  data: {
    guestProfile: null,
    placeholderCards: []
  },

  async onLoad() {
    await this.loadProfile()
  },

  async onShow() {
    await this.loadProfile()
  },

  async loadProfile() {
    try {
      await login()
      const result = await getProfileData()
      const guestProfile = result.guestProfile || null
      const placeholderCards = [
        result.memberPlans,
        result.notifications,
        result.reviews
      ].filter(Boolean)

      this.setData({
        guestProfile,
        placeholderCards
      })
    } catch (error) {
      wx.showToast({
        title: error.message || '加载个人中心失败',
        icon: 'none'
      })
    }
  },

  handleGoService() {
    switchTab('/pages/service/index')
  },

  handleGoOrders() {
    switchTab('/pages/orders/index')
  },

  handleContact() {
    wx.showToast({
      title: '请联系俱乐部客服',
      icon: 'none'
    })
  }
})
