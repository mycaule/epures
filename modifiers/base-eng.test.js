import test from 'ava'

const eng = require('./base-eng')

test('replace', t => {
  t.true(typeof eng.replace === 'function')
})

test('capitalizeAll', t => {
  t.true(typeof eng.capitalizeAll === 'function')
})

test('capitalize', t => {
  t.true(typeof eng.capitalize === 'function')
})

test('modifier -a-', t => {
  t.true(typeof eng.a === 'function')
})

test('modifier -firstS-', t => {
  t.true(typeof eng.firstS === 'function')
})

test('modifier -s-', t => {
  t.true(typeof eng.s === 'function')
})

test('modifier -ed-', t => {
  t.true(typeof eng.ed === 'function')
})
