/* eslint camelcase: [2, {properties: "never"}] */

const Grammar = require('./utils/grammar')

const epures = (() => {
  const ruleset = require('./utils/rule-set')

  return {
    createGrammar: raw => new Grammar(raw),
    modifiers: {
      en_US: require('./modifiers/en_US/base'),
      fr_FR: require('./modifiers/fr_FR/base')
    },
    EpuresNode: require('./utils/epure'),
    Grammar: require('./utils/grammar'),
    Symbol: require('./utils/symbol'),
    RuleSet: ruleset,
    setRng: rng => ruleset.setRng(rng)
  }
})()

module.exports = epures
