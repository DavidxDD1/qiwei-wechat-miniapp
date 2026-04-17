Component({
  options: {
    styleIsolation: 'shared'
  },

  properties: {
    item: {
      type: Object,
      value: null
    }
  },

  methods: {
    handleToggle() {
      if (!this.properties.item) {
        return
      }

      this.triggerEvent('toggle', {
        itemId: this.properties.item.id
      })
    },

    handleDelete() {
      if (!this.properties.item) {
        return
      }

      this.triggerEvent('delete', {
        itemId: this.properties.item.id
      })
    },

    handleRemarkBlur(event) {
      if (!this.properties.item) {
        return
      }

      this.triggerEvent('editremark', {
        itemId: this.properties.item.id,
        remark: event.detail.value || ''
      })
    }
  }
})
