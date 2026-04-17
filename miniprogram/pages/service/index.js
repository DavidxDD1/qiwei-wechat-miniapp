const { pricingFull } = require('../../data/pricingFull')
const { getCatalog } = require('../../services/catalog')
const { addToCart } = require('../../services/cart')
const { getPrice } = require('../../utils/getPrice')
const { formatRawPrice } = require('../../utils/format')
const { navigateTo } = require('../../utils/router')

function buildSelectionKey(locator) {
  return [
    locator.serviceId,
    locator.tableId,
    locator.rowId,
    locator.columnKey,
    locator.sectionId,
    locator.entryId
  ]
    .filter(Boolean)
    .join('|')
}

function buildEntryCard(service, section) {
  return {
    id: section.id,
    cardType: 'entry-group',
    title: section.title,
    subtitle: '点击任一保底档位后，可加入购物车或直接下单',
    entries: (section.entries || []).map((entry) => ({
      serviceId: service.id,
      sectionId: section.id,
      entryId: entry.id,
      rawLabel: entry.rawLabel,
      displayPrice: entry.displayPrice || formatRawPrice(entry.price),
      selectionKey: buildSelectionKey({
        serviceId: service.id,
        sectionId: section.id,
        entryId: entry.id
      }),
      displayName: `${service.title} / ${section.title} / ${entry.rawLabel}`
    })),
    notes: []
  }
}

function buildTableCard(service, table) {
  return {
    id: table.id,
    cardType: 'raw-table',
    title: table.title,
    subtitle: '点击表格单元格即可锁定原表价格',
    columns: table.columns,
    rows: (table.rows || []).map((row) => ({
      rowId: row.id,
      label: row.label,
      cells: (table.columns || []).map((column) => {
        const value = row.values[column.key]
        const locator = {
          serviceId: service.id,
          tableId: table.id,
          rowId: row.id,
          columnKey: column.key
        }

        return {
          serviceId: service.id,
          tableId: table.id,
          rowId: row.id,
          columnKey: column.key,
          label: column.label,
          priceText: value ? formatRawPrice(value.raw) : '--',
          selectionKey: buildSelectionKey(locator),
          displayName: `${service.title} / ${table.title} / ${row.label} / ${column.label}`
        }
      })
    })),
    notes: table.notes || []
  }
}

function buildServiceView(service) {
  if (!service) {
    return {
      subTabs: [],
      cardsMap: {},
      defaultId: '',
      activeCard: null
    }
  }

  if (service.type === 'entry-groups') {
    const subTabs = (service.sections || []).map((section) => ({
      id: section.id,
      title: section.title
    }))
    const cardsMap = {}

    ;(service.sections || []).forEach((section) => {
      cardsMap[section.id] = buildEntryCard(service, section)
    })

    const defaultId = subTabs[0] ? subTabs[0].id : ''
    return {
      subTabs,
      cardsMap,
      defaultId,
      activeCard: cardsMap[defaultId] || null
    }
  }

  const subTabs = (service.tables || []).map((table) => ({
    id: table.id,
    title: table.title
  }))
  const cardsMap = {}

  ;(service.tables || []).forEach((table) => {
    cardsMap[table.id] = buildTableCard(service, table)
  })

  const defaultId = subTabs[0] ? subTabs[0].id : ''
  return {
    subTabs,
    cardsMap,
    defaultId,
    activeCard: cardsMap[defaultId] || null
  }
}

function buildDirectItem(selectedLocator, selectedPrice, selectedDisplay) {
  return {
    id: `direct_${Date.now()}`,
    locator: selectedLocator,
    quantity: 1,
    price: selectedPrice,
    displayName: selectedDisplay,
    checked: true,
    remark: ''
  }
}

Page({
  data: {
    services: [],
    activeServiceId: 'escort',
    subTabs: [],
    activeTableId: '',
    activeCard: null,
    selectedLocator: null,
    selectedKey: '',
    selectedDisplay: '',
    selectedPrice: 0
  },

  async onLoad() {
    await this.loadCatalog()
  },

  async loadCatalog() {
    try {
      const result = await getCatalog()
      const services = result.services || pricingFull.services || []
      const defaultService = services.find((item) => item.id === 'escort') || services[0] || null

      this.setActiveService(services, defaultService ? defaultService.id : '')
    } catch (error) {
      wx.showToast({
        title: error.message || '加载目录失败',
        icon: 'none'
      })
    }
  },

  setActiveService(services, serviceId) {
    const service = (services || []).find((item) => item.id === serviceId) || null
    const view = buildServiceView(service)

    this.setData({
      services,
      activeServiceId: serviceId,
      subTabs: view.subTabs,
      activeTableId: view.defaultId,
      activeCard: view.activeCard,
      selectedLocator: null,
      selectedKey: '',
      selectedDisplay: '',
      selectedPrice: 0
    })
  },

  handleServiceChange(event) {
    const serviceId = event.currentTarget.dataset.id

    if (!serviceId || serviceId === this.data.activeServiceId) {
      return
    }

    this.setActiveService(this.data.services, serviceId)
  },

  handleSubChange(event) {
    const subId = event.currentTarget.dataset.id
    const service = (this.data.services || []).find((item) => item.id === this.data.activeServiceId) || null
    const view = buildServiceView(service)

    this.setData({
      subTabs: view.subTabs,
      activeTableId: subId,
      activeCard: view.cardsMap[subId] || null,
      selectedLocator: null,
      selectedKey: '',
      selectedDisplay: '',
      selectedPrice: 0
    })
  },

  handleCellTap(event) {
    const locator = event.detail.locator || {}
    const price = getPrice(pricingFull, locator)

    if (!price) {
      wx.showToast({
        title: '该价格项不可用',
        icon: 'none'
      })
      return
    }

    this.setData({
      selectedLocator: locator,
      selectedKey: buildSelectionKey(locator),
      selectedDisplay: event.detail.displayName || '',
      selectedPrice: price
    })
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

    const app = getApp()
    app.globalData.currentSelection = buildDirectItem(
      this.data.selectedLocator,
      this.data.selectedPrice,
      this.data.selectedDisplay
    )

    navigateTo('/pages/order-intent/index', {
      mode: 'direct'
    })
  }
})
