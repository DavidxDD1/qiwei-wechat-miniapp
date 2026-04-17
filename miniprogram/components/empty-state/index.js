Component({
  options: {
    styleIsolation: 'shared'
  },

  properties: {
    title: {
      type: String,
      value: '暂无内容'
    },
    desc: {
      type: String,
      value: ''
    },
    actionText: {
      type: String,
      value: ''
    }
  },

  methods: {
    handleAction() {
      this.triggerEvent('actiontap')
    }
  }
})
