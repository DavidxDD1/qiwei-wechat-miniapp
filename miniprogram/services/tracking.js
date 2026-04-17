function trackInfo(message, extra) {
  if (typeof wx !== 'undefined' && wx.getLogManager) {
    wx.getLogManager().info(message, extra || {})
    return
  }

  console.info(message, extra || {})
}

function trackError(message, error) {
  if (typeof wx !== 'undefined' && wx.getLogManager) {
    wx.getLogManager().warn(message, error || {})
    return
  }

  console.warn(message, error || {})
}

module.exports = {
  trackInfo,
  trackError
}
