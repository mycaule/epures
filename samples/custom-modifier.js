const epures = require('../index')

const grammar = epures.createGrammar({
  animal: ['panda', 'fox', 'capybara', 'iguana'],
  emotion: ['sad', 'happy', 'angry', 'jealous'],
  origin: ['The #animal# is #emotion.passwordify#.']
})

const myModifier = {
  passwordify: s => new Array(s.length + 1).join('*')
}

grammar.addModifiers(myModifier)

console.log(grammar.flatten('#origin#'))

// The iguana is *****.
