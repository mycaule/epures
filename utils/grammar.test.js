import test from 'ava'

const Grammar = require('./grammar')

let gra

test.before(t => {
  gra = new Grammar()
  t.true(
    (gra.constructor.name === 'Grammar') &&
    ('modifiers' in gra) &&
    ('raw' in gra) &&
    ('symbols' in gra) &&
    ('subgrammars' in gra)
  )
})

test('clearState', t => {
  t.true(typeof gra.clearState === 'function')
})

test('addModifiers', t => {
  t.true(typeof gra.addModifiers === 'function')
})

test('loadFromRawObj', t => {
  t.true(typeof gra.loadFromRawObj === 'function')
})

test('createRoot', t => {
  t.true(typeof gra.createRoot === 'function')
})

test('expand', t => {
  t.true(typeof gra.expand === 'function')
})

test('flatten', t => {
  t.true(typeof gra.flatten === 'function')
})

test('toJSON', t => {
  t.true(typeof gra.toJSON === 'function')
})

test('pushRules', t => {
  t.true(typeof gra.pushRules === 'function')
})

test('popRules', t => {
  t.true(typeof gra.popRules === 'function')
})

test('selectRule', t => {
  t.true(typeof gra.selectRule === 'function')
})
