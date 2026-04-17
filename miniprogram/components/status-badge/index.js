Component({
  options: {
    styleIsolation: 'shared'
  },

  properties: {
    status: {
      type: String,
      value: ''
    },
    tone: {
      type: String,
      value: 'pending'
    }
  }
})
