const faker = require('faker/locale/en')
const epures = require('../index')

const getSamples = epures.generators.getSamples

const rawData = {
  bs: getSamples(20, faker.company.bs),
  catchPhraseDescriptor: getSamples(20, faker.company.catchPhraseDescriptor),
  catchPhraseAdjective: getSamples(20, faker.company.catchPhraseAdjective),
  catchPhraseNoun: getSamples(20, faker.company.catchPhraseNoun),
  bsAdjective: getSamples(20, faker.company.bsAdjective),
  origin: ['You can try our #bs# with #catchPhraseAdjective.lowerCase.a# #catchPhraseDescriptor# #catchPhraseNoun#.']
}
const grammar = epures.createGrammar(rawData)

grammar.addModifiers(epures.modifiers.en_US)

console.log(grammar.flatten('#origin#'))

// You can try our vertical visualize vortals with a streamlined even-keeled emulation.
