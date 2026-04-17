function goTo(url, params) {
  const query = Object.keys(params || {})
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
  const targetUrl = query ? `${url}?${query}` : url

  wx.navigateTo({
    url: targetUrl,
    fail() {
      wx.showToast({
        title: '页面跳转失败',
        icon: 'none'
      })
    }
  })
}

module.exports = {
  goTo
}
