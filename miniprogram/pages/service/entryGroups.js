function buildEntryGroupSubtitle(sectionTitle) {
  const normalizedTitle = String(sectionTitle || '').trim()

  if (!normalizedTitle) {
    return '点击任一档位后，可加入购物车或直接下单'
  }

  return `点击任一${normalizedTitle}档位后，可加入购物车或直接下单`
}

module.exports = {
  buildEntryGroupSubtitle
}
