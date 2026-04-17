Component({
  options: {
    styleIsolation: 'shared'
  },

  properties: {
    price: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    },
    buttonText: {
      type: String,
      value: '立即预约'
    }
  },

  methods: {
    handleAction() {
      if (this.properties.disabled) {
        return
      }

      this.triggerEvent('action')
    }
  }
})
