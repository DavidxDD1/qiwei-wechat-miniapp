const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const projectRoot = path.resolve(__dirname, '..')

function read(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), 'utf8')
}

test('interactive picker components emit dedicated select events instead of tap', () => {
  const componentFiles = [
    'miniprogram/components/ServiceCard/index.js',
    'miniprogram/components/ModeTag/index.js',
    'miniprogram/components/TierCard/index.js'
  ]

  componentFiles.forEach((filePath) => {
    const source = read(filePath)

    assert.match(source, /triggerEvent\('select',\s*\{/)
    assert.doesNotMatch(source, /triggerEvent\('tap',\s*\{/)
  })
})

test('service page listens to component select events', () => {
  const source = read('miniprogram/pages/service/service.wxml')

  assert.match(source, /bind:select="handleServiceChange"/)
  assert.match(source, /bind:select="handleModeChange"/)
  assert.match(source, /bind:select="handleTierChange"/)
  assert.doesNotMatch(source, /bind:tap="handleServiceChange"/)
  assert.doesNotMatch(source, /bind:tap="handleModeChange"/)
  assert.doesNotMatch(source, /bind:tap="handleTierChange"/)
})
