const { formatRawPrice } = require('./format')

function flattenOffers(pricingFull) {
  return (pricingFull.services || []).reduce((offers, service) => {
    if (service.type === 'entry-groups') {
      ;(service.sections || []).forEach((section) => {
        ;(section.entries || []).forEach((entry) => {
          offers.push({
            id: `${service.id}:${section.id}:${entry.id}`,
            serviceId: service.id,
            tag: service.title,
            title: entry.rawLabel,
            subtitle: section.title,
            price: Number(entry.price || 0),
            priceText: entry.displayPrice || formatRawPrice(entry.price)
          })
        })
      })

      return offers
    }

    ;(service.tables || []).forEach((table) => {
      ;(table.rows || []).forEach((row) => {
        ;(table.columns || []).forEach((column) => {
          const value = row.values ? row.values[column.key] : null

          if (!value || !value.value) {
            return
          }

          offers.push({
            id: `${service.id}:${table.id}:${row.id}:${column.key}`,
            serviceId: service.id,
            tag: service.title,
            title: table.title,
            subtitle: `${row.label} · ${column.label}`,
            price: Number(value.value || 0),
            priceText: formatRawPrice(value.raw)
          })
        })
      })
    })

    return offers
  }, [])
}

function pickFeaturedOffers(pricingFull, count = 4, random = Math.random) {
  const pool = flattenOffers(pricingFull)
  const size = Math.min(Math.max(Number(count) || 0, 0), pool.length)
  const picked = []

  for (let index = 0; index < size; index += 1) {
    const nextIndex = Math.floor(random() * pool.length)
    picked.push(pool[nextIndex])
    pool.splice(nextIndex, 1)
  }

  return picked
}

module.exports = {
  flattenOffers,
  pickFeaturedOffers
}
