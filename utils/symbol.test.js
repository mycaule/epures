import test from 'ava'

const Symbol = require('./symbol')

let sym

test.before(t => {
  sym = new Symbol()

  t.true(
    (sym.constructor.name === 'Symbol') &&
    ('key' in sym) &&
    ('grammar' in sym) &&
    ('rawRules' in sym) &&
    ('baseRules' in sym) &&
    (sym.baseRules.constructor.name === 'RuleSet') &&
    ('stack' in sym) &&
    (sym.stack[0].constructor.name === 'RuleSet') &&
    ('uses' in sym)
  )
})

test('clearState', t => {
  t.true(typeof sym.clearState === 'function')
})

test('pushRules', t => {
  t.true(typeof sym.pushRules === 'function')
})

test('popRules', t => {
  t.true(typeof sym.popRules === 'function')
})

test('selectRules', t => {
  t.true(typeof sym.selectRule === 'function')
})

test('getActiveRules', t => {
  t.true(typeof sym.getActiveRules === 'function')
})

test('rulesToJSON', t => {
  t.true(typeof sym.rulesToJSON === 'function')
})
