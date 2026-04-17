function buildUrl(url, params) {
  const query = Object.keys(params || {})
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')

  return query ? `${url}?${query}` : url
}

function showRouteError() {
  wx.showToast({
    title: '页面跳转失败',
    icon: 'none'
  })
}

function navigateTo(url, params) {
  wx.navigateTo({
    url: buildUrl(url, params),
    fail: showRouteError
  })
}

function redirectTo(url, params) {
  wx.redirectTo({
    url: buildUrl(url, params),
    fail: showRouteError
  })
}

function switchTab(url) {
  wx.switchTab({
    url,
    fail: showRouteError
  })
}

function navigateBack(delta = 1) {
  wx.navigateBack({
    delta,
    fail: showRouteError
  })
}

module.exports = {
  navigateTo,
  redirectTo,
  switchTab,
  navigateBack
}
