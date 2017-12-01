import {test, skip} from 'ava'

const ruleset = require('./rule-set')

test('test 1', t => {
  console.log(ruleset)
  t.true(true)
})

skip('test 2', t => {
  console.log(ruleset)
  t.true(true)
})
