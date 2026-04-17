function getPrice(serviceId, modeId, tierId, services) {
  const currentService = services.find((service) => service.id === serviceId)

  if (!currentService) {
    return null
  }

  const currentMode = currentService.modes.find((mode) => mode.id === modeId)

  if (!currentMode) {
    return null
  }

  const currentTier = currentMode.tiers.find((tier) => tier.id === tierId)

  return currentTier ? currentTier.price : null
}

module.exports = {
  getPrice
}
