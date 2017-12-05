import test from 'ava'

const base = require('./base')

test('replace (deprecated, please use replaceAll from voca)', t => {
  t.true(typeof base.replaceAll === 'function')
  t.is(base.replaceAll('nice', 'n', 'd'), 'dice')
  t.is(base.replaceAll('people', 'p', '?'), '?eo?le')
})

test('capitalizeAll (deprecated, please use titleCase from voca) ', t => {
  t.true(typeof base.titleCase === 'function')
  t.is(base.titleCase('hello world'), 'Hello World')
})

test('capitalize (deprecated, please use capitalize from voca) ', t => {
  t.true(typeof base.capitalize === 'function')
  t.is(base.capitalize('hello world'), 'Hello world')
})

test('-a-', t => {
  t.is(typeof base.a, 'function')
  t.is(base.a('duck'), 'a duck')
  t.is(base.a('animal'), 'an animal')
  t.is(base.a('A'), 'an A')
  t.is(base.a('unique book'), 'a unique book')
})

test('-firstS-', t => {
  t.is(typeof base.firstS, 'function')
  t.is(base.firstS('house bridge'), 'houses bridge')
})

test('-s-', t => {
  t.is(typeof base.s, 'function')
  t.is(base.s('nose'), 'noses')
  t.is(base.s('patch'), 'patches')
  t.is(base.s('potatoe'), 'potatoes')
})

test('-ed-', t => {
  t.is(typeof base.ed, 'function')
  t.is(base.ed('bake'), 'baked')
  t.is(base.ed('unify'), 'unified')
  t.is(base.ed('fix'), 'fixed')
})
