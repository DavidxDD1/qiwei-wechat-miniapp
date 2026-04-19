const homeContent = require('../../data/homeContent')
const { pricingFull } = require('../../data/pricingFull')
const { flattenOffers, pickFeaturedOffers } = require('../../utils/featured')
const { switchTab } = require('../../utils/router')

function buildHeroMetrics(catalog) {
  const services = catalog.services || []
  const offers = flattenOffers(catalog)

  return [
    {
      label: '服务矩阵',
      value: `${services.length} 大类`
    },
    {
      label: '价格点位',
      value: `${offers.length}+`
    },
    {
      label: '下单链路',
      value: '7 页联动'
    }
  ]
}

Page({
  data: {
    hero: homeContent.hero,
    entryCards: homeContent.entryCards,
    faq: homeContent.faq,
    journeySteps: homeContent.journeySteps,
    serviceSummary: homeContent.serviceSummary,
    heroMetrics: buildHeroMetrics(pricingFull),
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
