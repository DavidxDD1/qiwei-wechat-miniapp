const { ENABLE_ONLINE_PAY } = require('../config/env')

function ensureSelection(locator) {
  return !!locator
}

function canOnlinePay() {
  return !!ENABLE_ONLINE_PAY
}

module.exports = {
  ensureSelection,
  canOnlinePay
}
