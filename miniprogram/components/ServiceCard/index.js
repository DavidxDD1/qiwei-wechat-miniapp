Component({
  options: {
    styleIsolation: 'shared'
  },

  properties: {
    itemId: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    subtitle: {
      type: String,
      value: ''
    },
    hint: {
      type: String,
      value: ''
    },
    badge: {
      type: String,
      value: ''
    },
    accent: {
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
    compact: {
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
