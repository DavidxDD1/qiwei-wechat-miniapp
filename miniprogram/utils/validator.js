function validateOrderForm(data) {
  const gameId = (data.gameId || '').trim()
  const contact = (data.contact || '').trim()

  if (!gameId) {
    return {
      valid: false,
      message: '请输入游戏ID'
    }
  }

  if (!contact) {
    return {
      valid: false,
      message: '请输入联系方式'
    }
  }

  return {
    valid: true,
    message: ''
  }
}

module.exports = {
  validateOrderForm
}
