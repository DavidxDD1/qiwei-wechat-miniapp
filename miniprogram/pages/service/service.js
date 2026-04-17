const { services } = require('../../data/pricing')
const { getPrice } = require('../../utils/calc')
const { goTo } = require('../../utils/router')

Page({
  data: {
    services,
    modes: [],
    tiers: [],
    selectedServiceId: '',
    selectedModeId: '',
    selectedTierId: '',
    price: ''
  },

  handleServiceChange(event) {
    const { id } = event.currentTarget.dataset
    const currentService = services.find((service) => service.id === id)

    this.setData({
      selectedServiceId: id,
      selectedModeId: '',
      selectedTierId: '',
      modes: currentService ? currentService.modes : [],
      tiers: [],
      price: ''
    })
  },

  handleModeChange(event) {
    const { selectedServiceId } = this.data

    if (!selectedServiceId) {
      wx.showToast({
        title: '请先选择服务',
        icon: 'none'
      })
      return
    }

    const { id } = event.currentTarget.dataset
    const currentMode = this.data.modes.find((mode) => mode.id === id)

    this.setData({
      selectedModeId: id,
      selectedTierId: '',
      tiers: currentMode ? currentMode.tiers : [],
      price: ''
    })
  },

  handleTierChange(event) {
    const { selectedServiceId, selectedModeId } = this.data

    if (!selectedServiceId || !selectedModeId) {
      wx.showToast({
        title: '请先完成上一步选择',
        icon: 'none'
      })
      return
    }

    const { id } = event.currentTarget.dataset
    const price = getPrice(selectedServiceId, selectedModeId, id, services)

    if (price === null) {
      wx.showToast({
        title: '套餐信息无效',
        icon: 'none'
      })
      return
    }

    this.setData({
      selectedTierId: id,
      price
    })
  },

  handleNext() {
    const { selectedServiceId, selectedModeId, selectedTierId } = this.data

    if (!selectedTierId) {
      wx.showToast({
        title: '请选择套餐',
        icon: 'none'
      })
      return
    }

    goTo('/pages/order/order', {
      serviceId: selectedServiceId,
      modeId: selectedModeId,
      tierId: selectedTierId
    })
  }
})
