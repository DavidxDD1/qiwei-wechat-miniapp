const { services } = require('../../data/pricing')
const { getPrice } = require('../../utils/calc')
const { generateOrderId } = require('../../utils/order')
const { goTo } = require('../../utils/router')
const { validateOrderForm } = require('../../utils/validator')

function resolveSelection(serviceId, modeId, tierId) {
  const currentService = services.find((service) => service.id === serviceId)
  const currentMode = currentService
    ? currentService.modes.find((mode) => mode.id === modeId)
    : null
  const currentTier = currentMode
    ? currentMode.tiers.find((tier) => tier.id === tierId)
    : null

  return {
    currentService,
    currentMode,
    currentTier
  }
}

Page({
  data: {
    serviceId: '',
    modeId: '',
    tierId: '',
    serviceName: '',
    modeName: '',
    tierLabel: '',
    price: '',
    gameId: '',
    contact: ''
  },

  onLoad(options) {
    const serviceId = options.serviceId || ''
    const modeId = options.modeId || ''
    const tierId = options.tierId || ''
    const { currentService, currentMode, currentTier } = resolveSelection(
      serviceId,
      modeId,
      tierId
    )
    const price = getPrice(serviceId, modeId, tierId, services)

    if (!currentService || !currentMode || !currentTier || price === null) {
      wx.showToast({
        title: '订单信息无效',
        icon: 'none'
      })

      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/service/service'
        })
      }, 500)

      return
    }

    this.setData({
      serviceId,
      modeId,
      tierId,
      serviceName: currentService.name,
      modeName: currentMode.name,
      tierLabel: currentTier.label,
      price
    })
  },

  handleInput(event) {
    const { field } = event.currentTarget.dataset
    const { value } = event.detail

    this.setData({
      [field]: value
    })
  },

  handleSubmit() {
    const { serviceId, modeId, tierId, serviceName, modeName, tierLabel, price, gameId, contact } =
      this.data
    const result = validateOrderForm({
      gameId,
      contact
    })

    if (!result.valid) {
      wx.showToast({
        title: result.message,
        icon: 'none'
      })
      return
    }

    const orderId = generateOrderId()
    const app = getApp()

    app.globalData.currentOrder = {
      orderId,
      serviceId,
      modeId,
      tierId,
      serviceName,
      modeName,
      tierLabel,
      price,
      gameId: gameId.trim(),
      contact: contact.trim()
    }

    goTo('/pages/success/success', {
      orderId,
      price
    })
  }
})
