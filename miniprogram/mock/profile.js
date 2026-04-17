const { pricingFull } = require('../data/pricingFull')
const { getProfile } = require('../store/profileStore')
const placeholders = require('../data/placeholders')

function wrap(data) {
  return {
    code: 0,
    message: 'ok',
    data,
    requestId: `mock_${Date.now()}`
  }
}

async function profileGet() {
  return wrap({
    guestProfile: getProfile(),
    placeholders,
    memberPlans: pricingFull.placeholders.memberPlans,
    notifications: pricingFull.placeholders.notifications,
    reviews: pricingFull.placeholders.reviews
  })
}

module.exports = {
  profileGet
}
