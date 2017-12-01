const RuleSet = require('./rule-set')

const Symbol = function (grammar, key, rawRules) {
  // Symbols can be made with a single value, and array, or array of objects of (conditions/values)
  this.key = key
  this.grammar = grammar
  this.rawRules = rawRules

  this.baseRules = new RuleSet(this.grammar, rawRules)
  this.clearState()
}

Symbol.prototype.clearState = function () {
  // Clear the stack and clear all ruleset usages
  this.stack = [this.baseRules]

  this.uses = []
  this.baseRules.clearState()
}

Symbol.prototype.pushRules = function (rawRules) {
  const rules = new RuleSet(this.grammar, rawRules)
  this.stack.push(rules)
}

Symbol.prototype.popRules = function () {
  this.stack.pop()
}

Symbol.prototype.selectRule = function (node, errors) {
  this.uses.push({
    node
  })

  if (this.stack.length === 0) {
    errors.push('The rule stack for \'' + this.key + '\' is empty, too many pops?')
    return '((' + this.key + '))'
  }

  return this.stack[this.stack.length - 1].selectRule()
}

Symbol.prototype.getActiveRules = function () {
  if (this.stack.length === 0) {
    return null
  }
  return this.stack[this.stack.length - 1].selectRule()
}

Symbol.prototype.rulesToJSON = function () {
  return JSON.stringify(this.rawRules)
}

module.exports = Symbol
