const { formatRawPrice } = require('../../utils/format')
const { buildEntryGroupSubtitle } = require('./entryGroups')

const SERVICE_META = {
  escort: {
    eyebrow: 'Escort Queue',
    description: '体验单、正常单与保底单按具体服务卡片展示，适合直接锁定并跳转下单。',
    badge: '服务卡片',
    advisor: {
      title: '先按单型锁定方案',
      desc: '护航单更适合直接从服务卡片进入，先确定单型，再看保底和价格。',
      tags: [
        { label: '适合', value: '快速下单' },
        { label: '优先看', value: '保底与单型' },
        { label: '确认点', value: '价格和备注' }
      ],
      steps: [
        '先选体验单、正常单或单局保底单。',
        '点击服务卡片锁定具体方案。',
        '确认金额后加入购物车或直接下单。'
      ]
    }
  },
  male: {
    eyebrow: 'Male Matrix',
    description: '保留完整原表矩阵结构，适合横向比较档位、保底要求与时长组合。',
    badge: '矩阵浏览',
    advisor: {
      title: '先定档位，再比时长',
      desc: '男陪价格表更适合矩阵比较，先选档位表，再横向比较不同时长价格。',
      tags: [
        { label: '适合', value: '预算比较' },
        { label: '优先看', value: '档位和时长' },
        { label: '确认点', value: '保底要求' }
      ],
      steps: [
        '先切换到目标档位或路线表。',
        '横向比较同一行的不同时长价格。',
        '点选单元格后再确认下单信息。'
      ]
    }
  },
  female: {
    eyebrow: 'Female Matrix',
    description: '娱乐与技术路线分表展示，适合按风格、时长与强度快速筛选。',
    badge: '矩阵浏览',
    advisor: {
      title: '先筛路线，再比价格',
      desc: '女陪价格表更适合先看风格路线，再在同一表格里比较时长和价格。',
      tags: [
        { label: '适合', value: '风格筛选' },
        { label: '优先看', value: '娱乐或技术' },
        { label: '确认点', value: '路线和时长' }
      ],
      steps: [
        '先选娱乐、技术或高阶路线表。',
        '横向比较同一路线下的不同时长价格。',
        '锁定价格后再提交预约意向。'
      ]
    }
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

function buildServiceAdvisor(service, view, hasSelection) {
  const meta = SERVICE_META[service && service.id] || {}
  const advisor = meta.advisor || {}
  const activeTitle = view && view.activeCard ? view.activeCard.title : ''

  return {
    title: advisor.title || '先选目录，再锁定价格',
    desc: advisor.desc || '按当前服务结构浏览目录，选择价格后可加入购物车或提交预约意向。',
    statusText: hasSelection ? '方案已锁定' : '等待选择',
    activeTitle,
    tags: advisor.tags || [],
    steps: advisor.steps || []
  }
}

module.exports = {
  buildServiceAdvisor,
  buildSelectionKey,
  buildServiceTabs,
  buildServiceView,
  buildHeroData
}
