Component({
  options: {
    styleIsolation: 'shared'
  },

  properties: {
    itemId: {
      type: String,
      value: ''
    },
    label: {
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
    }
  },

  methods: {
    handleTap() {
      if (this.properties.disabled) {
        return
      }

      this.triggerEvent('select', {
        id: this.properties.itemId
      })
    }
  }
})
