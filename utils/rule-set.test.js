import test from 'ava'

const RuleSet = require('./rule-set')

let rul

test.before(t => {
  rul = new RuleSet()
  t.true(
    (rul.constructor.name === 'RuleSet') &&
    ('raw' in rul) &&
    ('grammar' in rul) &&
    ('falloff' in rul)
  )
})

test('selectRule', t => {
  t.true(typeof rul.selectRule === 'function')
})

test('clearState', t => {
  t.true(typeof rul.clearState === 'function')
})

test('setRng', t => {
  t.true(typeof rul.setRng === 'function')
})
