import test from 'ava'

const eng = require('./base-eng')

test('replace', t => {
  t.is(typeof eng.replace, 'function')
  t.is(eng.replace('nice', 'nd'), 'dice')
  t.is(eng.replace('people', 'p?'), '?eo?le')
})

test('capitalizeAll', t => {
  t.is(typeof eng.capitalizeAll, 'function')
  t.is(eng.capitalizeAll('hello world'), 'Hello World')
})

test('capitalize', t => {
  t.is(typeof eng.capitalize, 'function')
  t.is(eng.capitalize('hello world'), 'Hello world')
})

test('modifier -a-', t => {
  t.is(typeof eng.a, 'function')
  t.is(eng.a('duck'), 'a duck')
  t.is(eng.a('animal'), 'an animal')
  t.is(eng.a('A'), 'an A')
  t.is(eng.a('unique book'), 'a unique book')
})

test('modifier -firstS-', t => {
  t.is(typeof eng.firstS, 'function')
  t.is(eng.firstS('house bridge'), 'houses bridge')
})

test('modifier -s-', t => {
  t.is(typeof eng.s, 'function')
  t.is(eng.s('nose'), 'noses')
  t.is(eng.s('patch'), 'patches')
  t.is(eng.s('potatoe'), 'potatoes')
})

test('modifier -ed-', t => {
  t.is(typeof eng.ed, 'function')
  t.is(eng.ed('bake'), 'baked')
  t.is(eng.ed('unify'), 'unified')
  t.is(eng.ed('fix'), 'fixed')
})
