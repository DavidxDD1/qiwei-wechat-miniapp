Component({
  options: {
    styleIsolation: 'shared'
  },

  properties: {
    title: {
      type: String,
      value: ''
    },
    subtitle: {
      type: String,
      value: ''
    },
    align: {
      type: String,
      value: 'left'
    }
  }
})
