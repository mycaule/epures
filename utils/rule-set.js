// Sets of rules
// Can also contain conditional or fallback sets of rulesets)
class RuleSet {
  constructor(grammar, raw) {
    this.raw = raw
    this.grammar = grammar
    this.falloff = 1

    this.rng = Math.random

    if (Array.isArray(raw)) {
      this.defaultRules = raw
    } else if (typeof raw === 'string' || raw instanceof String) {
      this.defaultRules = [raw]
    }
  }

  setRng(newRng) {
    this.rng = newRng
  }

  static fyshuffle(array) {
    let currentIndex = array.length
    let temporaryValue
    let randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(this.rng() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  selectRule(errors) {
    // Is there a conditional?
    if (this.conditionalRule) {
      const value = this.grammar.expand(this.conditionalRule, true)
      // Does this value match any of the conditionals?
      if (this.conditionalValues[value]) {
        const v = this.conditionalValues[value].selectRule(errors)
        if (v !== null && v !== undefined) {
          return v
        }
      }
    }

    // Is there a ranked order?
    if (this.ranking) {
      for (let i = 0; i < this.ranking.length; i++) {
        const v = this.ranking.selectRule()
        if (v !== null && v !== undefined) {
          return v
        }
      }
    }

    if (this.defaultRules !== undefined) {
      let index = 0
      // Select from this basic array of rules

      // Get the distribution from the grammar if there is no other
      let distribution = this.distribution
      if (!distribution) {
        distribution = this.grammar.distribution
      }

      switch (distribution) {
        case 'shuffle':

          // Create a shuffle desk
          if (!this.shuffledDeck || this.shuffledDeck.length === 0) {
            // Make an array
            this.shuffledDeck = this.fyshuffle(Array.apply(null, {
              length: this.defaultRules.length
            }).map(Number.call, Number), this.falloff)
          }

          index = this.shuffledDeck.pop()

          break
        case 'weighted':
          errors.push('Weighted distribution not yet implemented')
          break
        case 'falloff':
          errors.push('Falloff distribution not yet implemented')
          break
        default:
          index = Math.floor(Math.pow(this.rng(), this.falloff) * this.defaultRules.length)
          break
      }

      if (!this.defaultUses) {
        this.defaultUses = []
      }
      this.defaultUses[index] = ++this.defaultUses[index] || 1
      return this.defaultRules[index]
    }

    errors.push('No default rules defined for ' + this)
    return null
  }

  clearState() {
    if (this.defaultUses) {
      this.defaultUses = []
    }
  }
}

module.exports = RuleSet
