const { adapter } = require('./adapter')

async function getCatalog(serviceId) {
  const res = await adapter.catalogList(serviceId ? { serviceId } : {})
  if (res.code !== 0) {
    throw new Error(res.message || '获取目录失败')
  }

  return res.data
}

async function resolveSelection(locator) {
  const res = await adapter.resolveSelection({ locator })
  if (res.code !== 0) {
    throw new Error(res.message || '解析价格失败')
  }

  return res.data
}

module.exports = {
  getCatalog,
  resolveSelection
}
