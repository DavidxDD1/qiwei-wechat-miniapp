const { getStorageSync, setStorageSync } = require('../utils/storage')

const PROFILE_KEY = 'qiwai_profile_v15'

function getProfile() {
  return (
    getStorageSync(PROFILE_KEY) || {
      nickname: '\u6e38\u5ba2\u7528\u6237',
      avatarText: 'QW',
      mode: 'guest'
    }
  )
}

function saveProfile(profile) {
  setStorageSync(PROFILE_KEY, profile)
  return profile
}

module.exports = {
  getProfile,
  saveProfile
}
