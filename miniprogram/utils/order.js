function generateOrderId() {
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')

  return `QW${Date.now()}${random}`
}

module.exports = {
  generateOrderId
}
