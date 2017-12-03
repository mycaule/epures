import test from 'ava'

const common = require('./common')

test('lowerCase', t => {
  t.is(typeof common.lowerCase, 'function')
  t.is(common.lowerCase('Green'), 'green')
  t.is(common.lowerCase('BLUE'), 'blue')
})

test('upperCase', t => {
  t.is(typeof common.upperCase, 'function')
  t.is(common.upperCase('school'), 'SCHOOL')
})
