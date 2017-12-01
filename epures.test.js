import test from 'ava'

const Epures = require('./epures')

test('createGrammar', t => {
  t.true(typeof Epures.createGrammar === 'function')
})

test('baseEngModifiers', t => {
  t.true(typeof Epures.baseEngModifiers === 'object')
})

test('EpuresNode', t => {
  t.true(typeof Epures.EpuresNode === 'function')
})

test('Grammar', t => {
  t.true(typeof Epures.Grammar === 'function')
})

test('Symbol', t => {
  t.true(typeof Epures.Symbol === 'function')
})

test('RuleSet', t => {
  t.true(typeof Epures.RuleSet === 'function')
})
