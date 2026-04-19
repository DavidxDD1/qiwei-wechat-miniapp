const { formatRawPrice } = require('../../utils/format')
const { buildEntryGroupSubtitle } = require('./entryGroups')

const SERVICE_META = {
  escort: {
    eyebrow: 'Escort Queue',
    description: '体验单、正常单与保底单按具体服务卡片展示，适合直接锁定并跳转下单。',
    badge: '服务卡片'
  },
  male: {
    eyebrow: 'Male Matrix',
    description: '保留完整原表矩阵结构，适合横向比较档位、保底要求与时长组合。',
    badge: '矩阵浏览'
  },
  female: {
    eyebrow: 'Female Matrix',
    description: '娱乐与技术路线分表展示，适合按风格、时长与强度快速筛选。',
    badge: '矩阵浏览'
  }
}

function buildSelectionKey(locator) {
  return [
    locator.serviceId,
    locator.tableId,
    locator.rowId,
    locator.columnKey,
    locator.sectionId,
    locator.entryId
  ]
    .filter(Boolean)
    .join('|')
}

function buildEntryMetaTags(section, entry) {
  return [section.title, entry.extra]
    .map((item) => String(item || '').trim())
    .filter(Boolean)
    .filter((item, index, list) => list.indexOf(item) === index)
}

function buildEntrySummary(section, entry) {
  const tags = buildEntryMetaTags(section, entry)
  return tags.join(' · ') || section.title
}

function buildEntryOffer(service, section, entry) {
  const locator = {
    serviceId: service.id,
    sectionId: section.id,
    entryId: entry.id
  }

  return {
    serviceId: service.id,
    sectionId: section.id,
    entryId: entry.id,
    rawLabel: entry.rawLabel,
    title: entry.rawLabel,
    displayPrice: entry.displayPrice || formatRawPrice(entry.price),
    price: Number(entry.price || 0),
    guaranteeText: entry.guarantee ? `保底 ${entry.guarantee}` : '',
    summary: buildEntrySummary(section, entry),
    hintText: '点击卡片锁定方案，或直接下单',
    metaTags: buildEntryMetaTags(section, entry),
    actionText: '立即下单',
    locator,
    selectionKey: buildSelectionKey(locator),
    displayName: `${service.title} / ${section.title} / ${entry.rawLabel}`
  }
}

function buildEntryCard(service, section) {
  return {
    id: section.id,
    cardType: 'entry-group',
    title: section.title,
    subtitle: buildEntryGroupSubtitle(section.title),
    entries: (section.entries || []).map((entry) => buildEntryOffer(service, section, entry)),
    notes: []
  }
}

function buildTableCard(service, table) {
  return {
    id: table.id,
    cardType: 'raw-table',
    title: table.title,
    subtitle: '点击表格单元格即可锁定原表价格',
    columns: table.columns,
    rows: (table.rows || []).map((row) => ({
      rowId: row.id,
      label: row.label,
      cells: (table.columns || []).map((column) => {
        const value = row.values[column.key]
        const locator = {
          serviceId: service.id,
          tableId: table.id,
          rowId: row.id,
          columnKey: column.key
        }

        return {
          serviceId: service.id,
          tableId: table.id,
          rowId: row.id,
          columnKey: column.key,
          label: column.label,
          disabled: !value || !value.value,
          priceText: value ? formatRawPrice(value.raw) : '--',
          selectionKey: buildSelectionKey(locator),
          displayName: `${service.title} / ${table.title} / ${row.label} / ${column.label}`
        }
      })
    })),
    notes: table.notes || []
  }
}

function buildServiceView(service) {
  if (!service) {
    return {
      subTabs: [],
      cardsMap: {},
      defaultId: '',
      activeCard: null
    }
  }

  if (service.type === 'entry-groups') {
    const subTabs = (service.sections || []).map((section) => ({
      id: section.id,
      title: section.title,
      caption: `${(section.entries || []).length} 项`
    }))
    const cardsMap = {}

    ;(service.sections || []).forEach((section) => {
      cardsMap[section.id] = buildEntryCard(service, section)
    })

    const defaultId = subTabs[0] ? subTabs[0].id : ''
    return {
      subTabs,
      cardsMap,
      defaultId,
      activeCard: cardsMap[defaultId] || null
    }
  }

  const subTabs = (service.tables || []).map((table) => ({
    id: table.id,
    title: table.title,
    caption: `${(table.columns || []).length} 列`
  }))
  const cardsMap = {}

  ;(service.tables || []).forEach((table) => {
    cardsMap[table.id] = buildTableCard(service, table)
  })

  const defaultId = subTabs[0] ? subTabs[0].id : ''
  return {
    subTabs,
    cardsMap,
    defaultId,
    activeCard: cardsMap[defaultId] || null
  }
}

function buildServiceTabs(services) {
  return (services || []).map((service) => ({
    id: service.id,
    title: service.title,
    caption: service.type === 'entry-groups' ? '分组定价' : '价格矩阵'
  }))
}

function countServiceOptions(service) {
  if (!service) {
    return 0
  }

  if (service.type === 'entry-groups') {
    return (service.sections || []).reduce((total, section) => total + (section.entries || []).length, 0)
  }

  return (service.tables || []).reduce((total, table) => {
    return total + (table.rows || []).reduce((rowTotal, row) => {
      return rowTotal + (table.columns || []).filter((column) => {
        const value = row.values ? row.values[column.key] : null
        return Boolean(value && value.value)
      }).length
    }, 0)
  }, 0)
}

function buildServiceStats(service, view, hasSelection) {
  const optionLabel = service.type === 'entry-groups' ? '具体服务' : '价格格位'

  return [
    {
      label: '目录数量',
      value: `${view.subTabs.length}`
    },
    {
      label: optionLabel,
      value: `${countServiceOptions(service)}`
    },
    {
      label: '选择状态',
      value: hasSelection ? '已锁定' : '待选择'
    }
  ]
}

function buildHeroData(service, view, hasSelection) {
  const meta = SERVICE_META[service.id] || {}

  return {
    activeServiceEyebrow: meta.eyebrow || 'Pricing Console',
    activeServiceTitle: service.title,
    activeServiceDescription: meta.description || '按原表结构浏览价格目录并锁定当前方案。',
    activeServiceBadge: meta.badge || '价格浏览',
    serviceStats: buildServiceStats(service, view, hasSelection)
  }
}

module.exports = {
  buildSelectionKey,
  buildServiceTabs,
  buildServiceView,
  buildHeroData
}
