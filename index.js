const Grammar = require('./utils/grammar')

const epures = (() => {
  const ruleset = require('./utils/rule-set')

  return {
    createGrammar: raw => new Grammar(raw),
    modifiers: require('./modifiers'),
    generators: require('./utils/generators'),
    EpuresNode: require('./utils/epure'),
    Grammar: require('./utils/grammar'),
    Symbol: require('./utils/symbol'),
    RuleSet: ruleset,
    setRng: rng => ruleset.setRng(rng)
  }
})()

module.exports = epures
