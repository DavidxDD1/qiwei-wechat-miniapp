const homeContent = require('../../data/homeContent')
const { switchTab } = require('../../utils/router')

Page({
  data: {
    hero: homeContent.hero,
    entryCards: homeContent.entryCards,
    faq: homeContent.faq,
    serviceSummary: homeContent.serviceSummary
  },

  handleStart() {
    switchTab('/pages/service/index')
  },

  handleProfile() {
    switchTab('/pages/profile/index')
  }
})
