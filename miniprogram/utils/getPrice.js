function getPrice(pricingFull, locator) {
  const { serviceId, tableId, rowId, columnKey, sectionId, entryId } = locator || {}

  const service = (pricingFull.services || []).find((item) => item.id === serviceId)
  if (!service) return 0

  if (service.type === 'entry-groups') {
    const section = (service.sections || []).find((item) => item.id === sectionId)
    if (!section) return 0
    const entry = (section.entries || []).find((item) => item.id === entryId)
    return entry ? Number(entry.price || 0) : 0
  }

  if (service.type === 'raw-tables') {
    const table = (service.tables || []).find((item) => item.id === tableId)
    if (!table) return 0
    const row = (table.rows || []).find((item) => item.id === rowId)
    if (!row || !row.values || !row.values[columnKey]) return 0
    return Number(row.values[columnKey].value || 0)
  }

  return 0
}

module.exports = {
  getPrice
}
