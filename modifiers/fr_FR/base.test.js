import test from 'ava'

const base = require('./base')

test('femininize', t => {
  t.true(typeof base.femininize === 'function')
  t.is(base.femininize('hello world'), 'hello world')
})
