Component({
  options: {
    styleIsolation: 'shared'
  },

  properties: {
    price: {
      type: Number,
      value: 0
    },
    displayName: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: true
    },
    primaryText: {
      type: String,
      value: '立即下单'
    },
    secondaryText: {
      type: String,
      value: '加入购物车'
    },
    showSecondary: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onAddCart() {
      if (this.properties.disabled) {
        return
      }

      this.triggerEvent('addcart')
    },

    onBuy() {
      if (this.properties.disabled) {
        return
      }

      this.triggerEvent('buy')
    }
  }
})
