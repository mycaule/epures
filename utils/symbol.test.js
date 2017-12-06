import test from 'ava'

const Symbol = require('./symbol')
const Grammar = require('./grammar')

let sym

const rawRules = {
  alpha: 'beta',
  one: 'two'
}

const newRules = {a: 'b'}

test.before(t => {
  const gra = new Grammar()
  const key = 1

  sym = new Symbol(gra, key, rawRules)

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
  sym.clearState()
  t.is(sym.uses.length, 0)
  t.is(sym.stack.length, 1)
  t.is(sym.stack[0], sym.baseRules)
  t.is(sym.baseRules.defaultUses, undefined)
})

test('pushRules', t => {
  t.true(typeof sym.pushRules === 'function')
  const len = sym.stack.length
  sym.pushRules(newRules)
  const [last] = sym.stack.slice(-1)
  t.is(sym.stack.length, len + 1)
  t.is(last.raw, newRules)
})

test('popRules', t => {
  t.true(typeof sym.popRules === 'function')
  const len = sym.stack.length
  sym.popRules()
  t.is(sym.stack.length, len - 1)
})

test('selectRules', t => {
  t.true(typeof sym.selectRule === 'function')
})

test('getActiveRules', t => {
  t.true(typeof sym.getActiveRules === 'function')
  sym.popRules()
  t.is(sym.getActiveRules(), null)
})

test('rulesToJSON', t => {
  t.true(typeof sym.rulesToJSON === 'function')
  t.is(sym.rulesToJSON(), '{"alpha":"beta","one":"two"}')
})
