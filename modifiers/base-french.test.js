import test from 'ava'

const fre = require('./base-french')

test('replace', t => {
  t.true(typeof fre.replace === 'function')
})

test('capitalizeAll', t => {
  t.true(typeof fre.capitalizeAll === 'function')
})

test('capitalize', t => {
  t.true(typeof fre.capitalize === 'function')
})
