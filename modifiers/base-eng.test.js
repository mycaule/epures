import {test, skip} from 'ava'

const eng = require('./base-eng')

test('test 1', t => {
  console.log(eng)
  t.true(true)
})

skip('test 2', t => {
  console.log(eng)
  t.true(true)
})
