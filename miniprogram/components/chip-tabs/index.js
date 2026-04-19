Component({
  options: {
    styleIsolation: 'shared'
  },

  properties: {
    items: {
      type: Array,
      value: []
    },
    activeId: {
      type: String,
      value: ''
    },
    variant: {
      type: String,
      value: 'primary'
    }
  },

  methods: {
    handleTap(event) {
      const id = event.currentTarget.dataset.id

      if (!id || id === this.properties.activeId) {
        return
      }

      this.triggerEvent('select', { id })
    }
  }
})
