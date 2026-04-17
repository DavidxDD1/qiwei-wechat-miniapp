const { saveProfile } = require('../store/profileStore')

async function login() {
  const profile = saveProfile({
    nickname: '\u6e38\u5ba2\u7528\u6237',
    avatarText: 'QW',
    mode: 'guest'
  })

  return {
    code: 0,
    message: 'ok',
    data: {
      mode: 'guest',
      profile
    },
    requestId: `mock_${Date.now()}`
  }
}

module.exports = {
  login
}
