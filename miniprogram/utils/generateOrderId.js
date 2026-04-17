function generateOrderId() {
  const now = Date.now()
  const rand = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')
  return `QW${now}${rand}`
}

module.exports = {
  generateOrderId
}
