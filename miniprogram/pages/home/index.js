const homeContent = require('../../data/homeContent')
const { pricingFull } = require('../../data/pricingFull')
const { pickFeaturedOffers } = require('../../utils/featured')
const { switchTab } = require('../../utils/router')

Page({
  data: {
    hero: homeContent.hero,
    faq: homeContent.faq,
    serviceSummary: homeContent.serviceSummary,
    hotSales: []
  },

  onLoad() {
    this.refreshHotSales()
  },

  onShow() {
    this.refreshHotSales()
  },

  refreshHotSales() {
    this.setData({
      hotSales: pickFeaturedOffers(pricingFull, 4)
    })
  },

  handleProfile() {
    switchTab('/pages/profile/index')
  },

  handleOpenService() {
    switchTab('/pages/service/index')
  }
})
