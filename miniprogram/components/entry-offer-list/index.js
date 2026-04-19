Component({
  options: {
    styleIsolation: 'shared'
  },

  properties: {
    card: {
      type: Object,
      value: null
    },
    selectedKey: {
      type: String,
      value: ''
    }
  },

  methods: {
    findEntry(entryId) {
      return ((this.properties.card && this.properties.card.entries) || []).find((entry) => entry.entryId === entryId) || null
    },

    buildDetail(entry) {
      if (!entry) {
        return null
      }

      return {
        locator: entry.locator,
        displayName: entry.displayName,
        price: entry.price
      }
    },

    handleSelect(event) {
      const entry = this.findEntry(event.currentTarget.dataset.entryId)
      const detail = this.buildDetail(entry)

      if (!detail) {
        return
      }

      this.triggerEvent('select', detail)
    },

    handleBuy(event) {
      const entry = this.findEntry(event.currentTarget.dataset.entryId)
      const detail = this.buildDetail(entry)

      if (!detail) {
        return
      }

      this.triggerEvent('buy', detail)
    }
  }
})
