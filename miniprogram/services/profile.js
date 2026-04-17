const { adapter } = require('./adapter')

async function getProfileData() {
  const res = await adapter.profileGet({})
  if (res.code !== 0) {
    throw new Error(res.message || '获取个人信息失败')
  }

  return res.data
}

module.exports = {
  getProfileData
}
