const Grammar = require('./utils/grammar')

const epures = (() => {
  return {
    createGrammar: raw => new Grammar(raw),
    baseEngModifiers: require('./modifiers/base-eng'),
    EpuresNode: require('./utils/epure'),
    Grammar: require('./utils/grammar'),
    Symbol: require('./utils/symbol'),
    RuleSet: require('./utils/rule-set')
  }
})()

module.exports = epures
