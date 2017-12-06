import test from 'ava'

const gen = require('./generators')

test('getSamples', t => {
  const toto = gen.getSamples(10, x => x)
  t.is(toto.length, 10)
  t.is(toto[0], 10)
  t.is(toto[9], 1)
})
