const SUPPORTED_SERVICE_IDS = ['escort', 'male', 'female']

function normalizeServiceIntent(serviceId) {
  const normalized = String(serviceId || '').trim()
  return SUPPORTED_SERVICE_IDS.includes(normalized) ? normalized : ''
}

function ensureGlobalData(app) {
  if (!app.globalData) {
    app.globalData = {}
  }

  return app.globalData
}

function setPendingServiceIntent(app, serviceId) {
  const normalized = normalizeServiceIntent(serviceId)

  if (!normalized) {
    return ''
  }

  ensureGlobalData(app).pendingServiceId = normalized
  return normalized
}

function consumePendingServiceIntent(app) {
  const globalData = ensureGlobalData(app)
  const pendingServiceId = normalizeServiceIntent(globalData.pendingServiceId)

  globalData.pendingServiceId = ''
  return pendingServiceId
}

module.exports = {
  consumePendingServiceIntent,
  normalizeServiceIntent,
  setPendingServiceIntent
}
