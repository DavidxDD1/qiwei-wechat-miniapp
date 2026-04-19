Component({
  options: {
    styleIsolation: 'shared'
  },

  properties: {
    eyebrow: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    desc: {
      type: String,
      value: ''
    },
    logoSrc: {
      type: String,
      value: ''
    },
    metrics: {
      type: Array,
      value: []
    },
    primaryText: {
      type: String,
      value: ''
    },
    secondaryText: {
      type: String,
      value: ''
    }
  },

  methods: {
    handlePrimary() {
      this.triggerEvent('primarytap')
    },

    handleSecondary() {
      this.triggerEvent('secondarytap')
    }
  }
})
