Component({
  options: {
    styleIsolation: 'shared'
  },

  properties: {
    label: {
      type: String,
      value: ''
    },
    priceText: {
      type: String,
      value: ''
    },
    displayName: {
      type: String,
      value: ''
    },
    selected: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    serviceId: {
      type: String,
      value: ''
    },
    tableId: {
      type: String,
      value: ''
    },
    rowId: {
      type: String,
      value: ''
    },
    columnKey: {
      type: String,
      value: ''
    },
    sectionId: {
      type: String,
      value: ''
    },
    entryId: {
      type: String,
      value: ''
    }
  },

  methods: {
    handleTap() {
      if (this.properties.disabled) {
        return
      }

      const locator = {}
      ;['serviceId', 'tableId', 'rowId', 'columnKey', 'sectionId', 'entryId'].forEach((key) => {
        if (this.properties[key]) {
          locator[key] = this.properties[key]
        }
      })

      this.triggerEvent('celltap', {
        locator,
        displayName: this.properties.displayName
      })
    }
  }
})
