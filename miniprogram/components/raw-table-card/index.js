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
    handleCellTap(event) {
      this.triggerEvent('celltap', event.detail)
    }
  }
})
