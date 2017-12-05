const faker = require('faker/locale/en')
const epures = require('../index')

function * nameMaker(n, fn) {
  for (let i = n; i > 0; --i) {
    yield fn()
  }
}

console.log([...nameMaker(20, faker.company.bsAdjective)].join(', '))
const rawData = {
  bs: [...nameMaker(20, faker.company.bs)],
  catchPhraseDescriptor: [...nameMaker(20, faker.company.catchPhraseDescriptor)],
  catchPhraseAdjective: [...nameMaker(20, faker.company.catchPhraseAdjective)],
  catchPhraseNoun: [...nameMaker(20, faker.company.catchPhraseNoun)],
  bsAdjective: [...nameMaker(20, faker.company.bsAdjective)],
  origin: ['You can try our #bs# with #catchPhraseAdjective.lowerCase.a# #catchPhraseDescriptor# #catchPhraseNoun#.']
}
const grammar = epures.createGrammar(rawData)

grammar.addModifiers(epures.modifiers.en_US)

console.log(grammar.flatten('#origin#'))

// You can try our vertical visualize vortals with a streamlined even-keeled emulation.
