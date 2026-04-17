const memoryStorage = {}

function getStorageSync(key) {
  if (typeof wx !== 'undefined' && wx.getStorageSync) {
    return wx.getStorageSync(key)
  }

  return memoryStorage[key]
}

function setStorageSync(key, value) {
  if (typeof wx !== 'undefined' && wx.setStorageSync) {
    wx.setStorageSync(key, value)
    return
  }

  memoryStorage[key] = value
}

function removeStorageSync(key) {
  if (typeof wx !== 'undefined' && wx.removeStorageSync) {
    wx.removeStorageSync(key)
    return
  }

  delete memoryStorage[key]
}

module.exports = {
  getStorageSync,
  setStorageSync,
  removeStorageSync
}
