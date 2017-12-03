import test from 'ava'

const base = require('./base')

test('replace', t => {
  t.true(typeof base.replace === 'function')
})

test('capitalizeAll', t => {
  t.true(typeof base.capitalizeAll === 'function')
})

test('capitalize', t => {
  t.true(typeof base.capitalize === 'function')
})
