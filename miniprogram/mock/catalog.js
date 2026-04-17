const { pricingFull } = require('../data/pricingFull')
const { getPrice } = require('../utils/getPrice')
const { formatSelectionName } = require('../utils/format')

function wrap(data) {
  return {
    code: 0,
    message: 'ok',
    data,
    requestId: `mock_${Date.now()}`
  }
}

async function catalogList(params = {}) {
  if (!params.serviceId) {
    return wrap({ services: pricingFull.services })
  }

  const service = pricingFull.services.find((item) => item.id === params.serviceId)
  return wrap({ services: service ? [service] : [] })
}

async function resolveSelection(params = {}) {
  const locator = params.locator || {}
  const price = getPrice(pricingFull, locator)

  return wrap({
    locator,
    price,
    displayName: formatSelectionName(pricingFull, locator)
  })
}

module.exports = {
  catalogList,
  resolveSelection
}
