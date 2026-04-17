function validateOrderForm(payload) {
  const {
    items = [],
    contactName = '',
    contactPhone = '',
    agreeRules = false
  } = payload || {}

  if (!items.length) {
    return { valid: false, message: '\u8bf7\u9009\u62e9\u81f3\u5c11\u4e00\u4e2a\u670d\u52a1\u9879' }
  }

  if (!contactName.trim()) {
    return { valid: false, message: '\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba\u59d3\u540d' }
  }

  if (!/^1\d{10}$/.test(contactPhone)) {
    return { valid: false, message: '\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7' }
  }

  if (!agreeRules) {
    return { valid: false, message: '\u8bf7\u5148\u52fe\u9009\u670d\u52a1\u8bf4\u660e' }
  }

  return { valid: true, message: 'ok' }
}

module.exports = {
  validateOrderForm
}
