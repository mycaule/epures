const epures = require('../index')

const grammar = epures.createGrammar({
  animal: ['panda', 'fox', 'capybara', 'iguana'],
  emotion: ['sad', 'happy', 'angry', 'jealous'],
  origin: ['I am #emotion.a# #animal#.']
})

grammar.addModifiers(epures.baseEngModifiers)

console.log(grammar.flatten('#origin#'))

// I am a happy iguana.
// I am an angry fox.
// I am a sad capybara.
