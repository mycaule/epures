import test from 'ava'

const lang = require('./base')

test('lang', t => {
  t.true(typeof lang === 'object')
})
