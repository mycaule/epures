import test from 'ava'

const Parser = require('./parser')

test('parseTag', t => {
  t.true(typeof Parser.parseTag === 'function')
})

test('parse', t => {
  t.true(typeof Parser.parse === 'function')
})
