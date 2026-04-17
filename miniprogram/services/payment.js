const { ENABLE_ONLINE_PAY } = require('../config/env')

async function paymentPrepare(orderNo) {
  return {
    code: 0,
    message: 'ok',
    data: {
      orderNo,
      canOnlinePay: !!ENABLE_ONLINE_PAY,
      paymentMode: ENABLE_ONLINE_PAY ? 'online' : 'manual'
    },
    requestId: `mock_${Date.now()}`
  }
}

module.exports = {
  paymentPrepare
}
