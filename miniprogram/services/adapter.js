const catalogMock = require('../mock/catalog')
const cartMock = require('../mock/cart')
const orderMock = require('../mock/order')
const profileMock = require('../mock/profile')
const { USE_MOCK } = require('../config/env')

const MODE = USE_MOCK ? 'mock' : 'cloud'

const adapter = {
  async catalogList(params) {
    if (MODE === 'mock') return catalogMock.catalogList(params)
    return Promise.reject(new Error('cloud adapter not enabled'))
  },

  async resolveSelection(params) {
    if (MODE === 'mock') return catalogMock.resolveSelection(params)
    return Promise.reject(new Error('cloud adapter not enabled'))
  },

  async cartAdd(params) {
    if (MODE === 'mock') return cartMock.cartAdd(params)
    return Promise.reject(new Error('cloud adapter not enabled'))
  },

  async cartList(params) {
    if (MODE === 'mock') return cartMock.cartList(params)
    return Promise.reject(new Error('cloud adapter not enabled'))
  },

  async cartRemove(params) {
    if (MODE === 'mock') return cartMock.cartRemove(params)
    return Promise.reject(new Error('cloud adapter not enabled'))
  },

  async cartToggle(params) {
    if (MODE === 'mock') return cartMock.cartToggle(params)
    return Promise.reject(new Error('cloud adapter not enabled'))
  },

  async cartRemark(params) {
    if (MODE === 'mock') return cartMock.cartRemark(params)
    return Promise.reject(new Error('cloud adapter not enabled'))
  },

  async cartClear(params) {
    if (MODE === 'mock') return cartMock.cartClear(params)
    return Promise.reject(new Error('cloud adapter not enabled'))
  },

  async orderCreate(params) {
    if (MODE === 'mock') return orderMock.orderCreate(params)
    return Promise.reject(new Error('cloud adapter not enabled'))
  },

  async orderList(params) {
    if (MODE === 'mock') return orderMock.orderList(params)
    return Promise.reject(new Error('cloud adapter not enabled'))
  },

  async orderDetail(params) {
    if (MODE === 'mock') return orderMock.orderDetail(params)
    return Promise.reject(new Error('cloud adapter not enabled'))
  },

  async profileGet(params) {
    if (MODE === 'mock') return profileMock.profileGet(params)
    return Promise.reject(new Error('cloud adapter not enabled'))
  }
}

module.exports = {
  adapter
}
