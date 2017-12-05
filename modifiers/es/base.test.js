import test from 'ava'

const base = require('./base')

test('base', t => {
  t.true(typeof base === 'object')
})
