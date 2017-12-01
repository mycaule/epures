import {test} from 'ava'

const eng = require('./base-eng')

test('replace stuff', t => {
  t.true(typeof eng.replace === 'function')
})

test('capitalizeAll stuff', t => {
  t.true(typeof eng.capitalizeAll === 'function')
})

test('capitalize stuff', t => {
  t.true(typeof eng.capitalize === 'function')
})

test('replace a preposition', t => {
  t.true(typeof eng.a === 'function')
})

test('replace firstS', t => {
  t.true(typeof eng.firstS === 'function')
})

test('replace plurals', t => {
  t.true(typeof eng.s === 'function')
})

test('replace ed termination', t => {
  t.true(typeof eng.ed === 'function')
})
