function formatPrice(price) {
  return `\uFFE5${Number(price || 0)}`
}

function formatRawPrice(raw) {
  const text = String(raw || '')

  if (!text) {
    return formatPrice(0)
  }

  if (/^[0-9]+$/.test(text)) {
    return `\uFFE5${text}`
  }

  return text.replace(/^￥/, '\uFFE5')
}

function resolveLocatorMeta(pricingFull, locator) {
  const service = (pricingFull.services || []).find((item) => item.id === locator.serviceId)
  if (!service) {
    return null
  }

  if (service.type === 'entry-groups') {
    const section = (service.sections || []).find((item) => item.id === locator.sectionId)
    const entry = section ? (section.entries || []).find((item) => item.id === locator.entryId) : null
    if (!section || !entry) {
      return null
    }

    return {
      service,
      section,
      entry
    }
  }

  const table = (service.tables || []).find((item) => item.id === locator.tableId)
  const row = table ? (table.rows || []).find((item) => item.id === locator.rowId) : null
  const column = table ? (table.columns || []).find((item) => item.key === locator.columnKey) : null
  const cell = row && column ? row.values[column.key] : null

  if (!table || !row || !column || !cell) {
    return null
  }

  return {
    service,
    table,
    row,
    column,
    cell
  }
}

function formatSelectionName(pricingFull, locator) {
  const meta = resolveLocatorMeta(pricingFull, locator)
  if (!meta) {
    return ''
  }

  if (meta.entry) {
    return `${meta.service.title} / ${meta.section.title} / ${meta.entry.rawLabel}`
  }

  return `${meta.service.title} / ${meta.table.title} / ${meta.row.label} / ${meta.column.label}`
}

module.exports = {
  formatPrice,
  formatRawPrice,
  resolveLocatorMeta,
  formatSelectionName
}
