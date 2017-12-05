import test from 'ava'

const lang = require('./base')

test('replace (deprecated, please use replaceAll from voca)', t => {
  t.true(typeof lang.replaceAll === 'function')
  t.is(lang.replaceAll('nice', 'n', 'd'), 'dice')
  t.is(lang.replaceAll('people', 'p', '?'), '?eo?le')
})

test('capitalizeAll (deprecated, please use titleCase from voca) ', t => {
  t.true(typeof lang.titleCase === 'function')
  t.is(lang.titleCase('hello world'), 'Hello World')
})

test('capitalize (deprecated, please use capitalize from voca) ', t => {
  t.true(typeof lang.capitalize === 'function')
  t.is(lang.capitalize('hello world'), 'Hello world')
})

test('-a-', t => {
  t.is(typeof lang.a, 'function')
  t.is(lang.a('duck'), 'a duck')
  t.is(lang.a('animal'), 'an animal')
  t.is(lang.a('A'), 'an A')
  t.is(lang.a('unique book'), 'a unique book')
})

test('-firstS-', t => {
  t.is(typeof lang.firstS, 'function')
  t.is(lang.firstS('house bridge'), 'houses bridge')
})

test('-s-', t => {
  t.is(typeof lang.s, 'function')
  t.is(lang.s('nose'), 'noses')
  t.is(lang.s('patch'), 'patches')
  t.is(lang.s('potatoe'), 'potatoes')
})

test('-ed-', t => {
  t.is(typeof lang.ed, 'function')
  t.is(lang.ed('bake'), 'baked')
  t.is(lang.ed('unify'), 'unified')
  t.is(lang.ed('fix'), 'fixed')
})
