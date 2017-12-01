import test from 'ava'

const EpuresNode = require('./epure')
const Grammar = require('./grammar')

let epu
let gra

test.before(t => {
  gra = new Grammar()
  epu = new EpuresNode(gra, 0, {type: -1})

  t.true(
    (epu.constructor.name === 'EpuresNode') &&
    ('errors' in epu) &&
    ('grammar' in epu) &&
    (epu.grammar.constructor.name === 'Grammar') &&
    ('parent' in epu) &&
    ('depth' in epu) &&
    ('childIndex' in epu) &&
    ('raw' in epu) &&
    ('type' in epu) &&
    ('isExpanded' in epu)
  )
})

test('toString', t => {
  t.true(typeof epu.toString === 'function')
})

test('expandChildren', t => {
  t.true(typeof epu.expandChildren === 'function')
})

test('expand', t => {
  t.true(typeof epu.expand === 'function')
})

test('clearEscapeChars', t => {
  t.true(typeof epu.clearEscapeChars === 'function')
})
