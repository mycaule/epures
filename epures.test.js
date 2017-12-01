import {test, skip} from 'ava'

const epures = require('./epures')

test('test 1', t => {
  console.log(epures)
  t.true(true)
})

skip('test 2', t => {
  console.log(epures)
  t.true(true)
})
