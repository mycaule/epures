const epures = require('../index')

const grammar = epures.createGrammar({
  animal: ['panda', 'fox', 'capybara', 'iguana'],
  emotion: ['sad', 'happy', 'angry', 'jealous'],
  origin: ['I am #emotion.a# #animal#.']
})

grammar.addModifiers(epures.modifiers.en_US)

console.log(grammar.flatten('#origin#'))

// I am an angry fox.
