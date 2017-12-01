let epures = (() => {
  const Grammar = require('./utils/grammar')

    // Parses a plaintext rule in the epures syntax
  epures = {
    createGrammar(raw) {
      return new Grammar(raw)
    }
  }

  epures.baseEngModifiers = require('./modifiers/base-eng')
  epures.EpuresNode = require('./utils/epure')
  epures.Grammar = require('./utils/grammar')
  epures.Symbol = require('./utils/symbol')
  epures.RuleSet = require('./utils/rule-set')

  return epures
})()

module.exports = epures
