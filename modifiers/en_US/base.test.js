import test from 'ava'

const base = require('./base')

test('replace', t => {
  t.is(typeof base.replace, 'function')
  t.is(base.replace('nice', 'nd'), 'dice')
  t.is(base.replace('people', 'p?'), '?eo?le')
})

test('capitalizeAll', t => {
  t.is(typeof base.capitalizeAll, 'function')
  t.is(base.capitalizeAll('hello world'), 'Hello World')
})

test('capitalize', t => {
  t.is(typeof base.capitalize, 'function')
  t.is(base.capitalize('hello world'), 'Hello world')
})

test('modifier -a-', t => {
  t.is(typeof base.a, 'function')
  t.is(base.a('duck'), 'a duck')
  t.is(base.a('animal'), 'an animal')
  t.is(base.a('A'), 'an A')
  t.is(base.a('unique book'), 'a unique book')
})

test('modifier -firstS-', t => {
  t.is(typeof base.firstS, 'function')
  t.is(base.firstS('house bridge'), 'houses bridge')
})

test('modifier -s-', t => {
  t.is(typeof base.s, 'function')
  t.is(base.s('nose'), 'noses')
  t.is(base.s('patch'), 'patches')
  t.is(base.s('potatoe'), 'potatoes')
})

test('modifier -ed-', t => {
  t.is(typeof base.ed, 'function')
  t.is(base.ed('bake'), 'baked')
  t.is(base.ed('unify'), 'unified')
  t.is(base.ed('fix'), 'fixed')
})
