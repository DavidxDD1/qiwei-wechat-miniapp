const { pricingFull } = require('../../data/pricingFull')
const { getCatalog } = require('../../services/catalog')
const { addToCart } = require('../../services/cart')
const { getPrice } = require('../../utils/getPrice')
const { navigateTo } = require('../../utils/router')
const { buildSelectionState } = require('./selectionState')
const { startDirectOrder } = require('./directOrder')
const {
  buildSelectionKey,
  buildServiceTabs,
  buildServiceView,
  buildHeroData
} = require('./serviceView')

Page({
  data: {
    services: [],
    serviceTabs: [],
    activeServiceId: 'escort',
    subTabs: [],
    activeTableId: '',
    activeCard: null,
    activeServiceEyebrow: 'Pricing Console',
    activeServiceTitle: '原表价格目录',
    activeServiceDescription: '',
    activeServiceBadge: '',
    serviceStats: [],
    selectedLocator: null,
    selectedKey: '',
    selectedDisplay: '',
    selectedPrice: 0,
    selectionEyebrow: '等待选择',
    selectionTitle: '请选择一个价格目录',
    selectionDescription: '',
    selectionPriceText: '待选择',
    selectionPreviewItems: []
  },

  async onLoad(options) {
    this.defaultServiceId = options && options.serviceId ? options.serviceId : 'escort'
    await this.loadCatalog()
  },

  async loadCatalog() {
    try {
      const result = await getCatalog()
      const services = result.services || pricingFull.services || []
      const defaultService = services.find((item) => item.id === this.defaultServiceId) || services[0] || null

      this.setActiveService(services, defaultService ? defaultService.id : '')
    } catch (error) {
      wx.showToast({
        title: error.message || '加载目录失败',
        icon: 'none'
      })
    }
  },

  applySelection(locator, displayName, price) {
    const service = (this.data.services || []).find((item) => item.id === this.data.activeServiceId) || null
    const view = buildServiceView(service)
    const heroData = service ? buildHeroData(service, view, true) : {}
    const selectionState = buildSelectionState(this.data.activeCard, displayName, price)

    this.setData({
      selectedLocator: locator,
      selectedKey: buildSelectionKey(locator),
      selectedDisplay: displayName,
      selectedPrice: price,
      serviceStats: heroData.serviceStats || [],
      selectionEyebrow: selectionState.selectionEyebrow,
      selectionTitle: selectionState.selectionTitle,
      selectionDescription: selectionState.selectionDescription,
      selectionPriceText: selectionState.selectionPriceText,
      selectionPreviewItems: selectionState.previewItems || []
    })
  },

  setActiveService(services, serviceId) {
    const service = (services || []).find((item) => item.id === serviceId) || null
    const view = buildServiceView(service)
    const heroData = service ? buildHeroData(service, view, false) : {}
    const selectionState = buildSelectionState(view.activeCard, '', 0)

    this.setData({
      services,
      serviceTabs: buildServiceTabs(services),
      activeServiceId: serviceId,
      subTabs: view.subTabs,
      activeTableId: view.defaultId,
      activeCard: view.activeCard,
      activeServiceEyebrow: heroData.activeServiceEyebrow || 'Pricing Console',
      activeServiceTitle: heroData.activeServiceTitle || '原表价格目录',
      activeServiceDescription: heroData.activeServiceDescription || '',
      activeServiceBadge: heroData.activeServiceBadge || '',
      serviceStats: heroData.serviceStats || [],
      selectedLocator: null,
      selectedKey: '',
      selectedDisplay: '',
      selectedPrice: 0,
      selectionEyebrow: selectionState.selectionEyebrow,
      selectionTitle: selectionState.selectionTitle,
      selectionDescription: selectionState.selectionDescription,
      selectionPriceText: selectionState.selectionPriceText,
      selectionPreviewItems: selectionState.previewItems || []
    })
  },

  handleServiceSelect(event) {
    const serviceId = event.detail.id

    if (!serviceId || serviceId === this.data.activeServiceId) {
      return
    }

    this.setActiveService(this.data.services, serviceId)
  },

  handleSubSelect(event) {
    const subId = event.detail.id
    const service = (this.data.services || []).find((item) => item.id === this.data.activeServiceId) || null
    const view = buildServiceView(service)
    const nextCard = view.cardsMap[subId] || null
    const heroData = service ? buildHeroData(service, view, false) : {}
    const selectionState = buildSelectionState(nextCard, '', 0)

    this.setData({
      subTabs: view.subTabs,
      activeTableId: subId,
      activeCard: nextCard,
      serviceStats: heroData.serviceStats || [],
      selectedLocator: null,
      selectedKey: '',
      selectedDisplay: '',
      selectedPrice: 0,
      selectionEyebrow: selectionState.selectionEyebrow,
      selectionTitle: selectionState.selectionTitle,
      selectionDescription: selectionState.selectionDescription,
      selectionPriceText: selectionState.selectionPriceText,
      selectionPreviewItems: selectionState.previewItems || []
    })
  },

  handleCellTap(event) {
    const locator = event.detail.locator || {}
    const price = getPrice(pricingFull, locator)
    const displayName = event.detail.displayName || ''

    if (!price) {
      wx.showToast({
        title: '该价格项不可用',
        icon: 'none'
      })
      return
    }

    this.applySelection(locator, displayName, price)
  },

  handleEntryBuy(event) {
    const locator = event.detail.locator || {}
    const price = Number(event.detail.price || getPrice(pricingFull, locator))
    const displayName = event.detail.displayName || ''

    if (!price || !displayName) {
      wx.showToast({
        title: '该价格项不可用',
        icon: 'none'
      })
      return
    }

    this.applySelection(locator, displayName, price)

    const started = startDirectOrder(
      getApp(),
      {
        locator,
        price,
        displayName
      },
      navigateTo
    )

    if (!started) {
      wx.showToast({
        title: '下单跳转失败',
        icon: 'none'
      })
    }
  },

  async handleAddCart() {
    if (!this.data.selectedLocator) {
      wx.showToast({
        title: '请先选择价格项',
        icon: 'none'
      })
      return
    }

    try {
      await addToCart({
        locator: this.data.selectedLocator,
        quantity: 1
      })

      wx.showToast({
        title: '已加入购物车',
        icon: 'success'
      })
    } catch (error) {
      wx.showToast({
        title: error.message || '加入购物车失败',
        icon: 'none'
      })
    }
  },

  handleBuy() {
    if (!this.data.selectedLocator) {
      wx.showToast({
        title: '请先选择价格项',
        icon: 'none'
      })
      return
    }

    const started = startDirectOrder(
      getApp(),
      {
        locator: this.data.selectedLocator,
        price: this.data.selectedPrice,
        displayName: this.data.selectedDisplay
      },
      navigateTo
    )

    if (!started) {
      wx.showToast({
        title: '下单跳转失败',
        icon: 'none'
      })
    }
  }
})
