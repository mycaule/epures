/* eslint no-use-before-define: [2, {classes: false}] */

const Parser = require('./parser')

// An action that occurs when a node is expanded
// Types of actions:
// 0 Push: [key:rule]
// 1 Pop: [key:POP]
// 2 function: [functionName(param0,param1)] (TODO!)
class NodeAction {
  constructor(node, raw) {
    this.node = node

    const sections = raw.split(':')
    this.target = sections[0]

    if (sections.length === 1) {
    // No colon? A function!
      this.type = 2
    } else {
    // Colon? It's either a push or a pop
      this.rule = sections[1]
      if (this.rule === 'POP') {
        this.type = 1
      } else {
        this.type = 0
      }
    }
  }

  createUndo() {
    if (this.type === 0) {
      return new NodeAction(this.node, this.target + ':POP')
    }

    return null
  }

  activate() {
    const grammar = this.node.grammar
    switch (this.type) {
      case 0:
        // Split into sections (the way to denote an array of rules)
        this.ruleSections = this.rule.split(',')
        this.finishedRules = []
        this.ruleNodes = []
        for (let i = 0; i < this.ruleSections.length; i++) {
          const n = new EpuresNode(grammar, 0, {
            type: -1,
            raw: this.ruleSections[i]
          })

          n.expand()

          this.finishedRules.push(n.finishedText)
        }

        grammar.pushRules(this.target, this.finishedRules, this)
        break
      case 1:
        grammar.popRules(this.target)
        break
      case 2:
        grammar.flatten(this.target, true)
        break
      default:
    }
  }

  toText() {
    switch (this.type) {
      case 0:
        return this.target + ':' + this.rule
      case 1:
        return this.target + ':POP'
      case 2:
        return '((some function))'
      default:
        return '((Unknown Action))'
    }
  }
}

class EpuresNode {
  constructor(parent, childIndex, settings) {
    this.errors = []

    // No input? Add an error, but continue anyways
    if (settings.raw === undefined) {
      this.errors.push('Empty input for node')
      settings.raw = ''
    }

    // If the root node of an expansion, it will have the grammar passed as the 'parent'
    // set the grammar from the 'parent', and set all other values for a root node
    if (parent.constructor.name === 'Grammar') {
      this.grammar = parent
      this.parent = null
      this.depth = 0
      this.childIndex = 0
    } else {
      this.grammar = parent.grammar
      this.parent = parent
      this.depth = parent.depth + 1
      this.childIndex = childIndex
    }

    this.raw = settings.raw
    this.type = settings.type
    this.isExpanded = false

    if (!this.grammar) {
      console.warn('No grammar specified for this node', this)
    }
  }

  toString() {
    return 'Node(\'' + this.raw + '\' ' + this.type + ' d:' + this.depth + ')'
  }

  // Expand the node (with the given child rule)
  // Make children if the node has any
  expandChildren(childRule, preventRecursion) {
    this.children = []
    this.finishedText = ''

    // Set the rule for making children,
    // and expand it into section
    this.childRule = childRule
    if (this.childRule === undefined) {
      // In normal operation, this shouldn't ever happen
      this.errors.push('No child rule provided, can\'t expand children')
      console.warn('No child rule provided, can\'t expand children')
    } else {
      const sections = Parser.parse(childRule)

      // Add errors to this
      if (sections.errors.length > 0) {
        this.errors = this.errors.concat(sections.errors)
      }

      for (let i = 0; i < sections.length; i++) {
        this.children[i] = new EpuresNode(this, i, sections[i])
        if (!preventRecursion) {
          this.children[i].expand(preventRecursion)
        }

        // Add in the finished text
        this.finishedText += this.children[i].finishedText
      }
    }
  }

  // Expand this rule (possibly creating children)
  expand(preventRecursion) {
    if (!this.isExpanded) {
      this.isExpanded = true

      this.expansionErrors = []

      // Types of nodes
      // -1: raw, needs parsing
      //  0: Plaintext
      //  1: Tag ("#symbol.mod.mod2.mod3#" or "#[pushTarget:pushRule]symbol.mod")
      //  2: Action ("[pushTarget:pushRule], [pushTarget:POP]", more in the future)

      switch (this.type) {
        // Raw rule
        case -1:

          this.expandChildren(this.raw, preventRecursion)
          break

        // Plaintext, do nothing but copy text into finsihed text
        case 0:
          this.finishedText = this.raw
          break

        // Tag
        case 1: {
          // Parse to find any actions, and figure out what the symbol is
          this.preactions = []
          this.postactions = []

          const parsed = Parser.parseTag(this.raw)

          // Break into symbol actions and modifiers
          this.symbol = parsed.symbol
          this.modifiers = parsed.modifiers

          // Create all the preactions from the raw syntax
          for (let i = 0; i < parsed.preactions.length; i++) {
            this.preactions[i] = new NodeAction(this, parsed.preactions[i].raw)
          }

          // Make undo actions for all preactions (pops for each push)
          this.preactions.forEach(pa => {
            if (pa.type === 0) {
              this.postactions.push(pa.createUndo())
            }
          })

          // Activate all the preactions
          this.preactions.forEach(pa => pa.activate())

          this.finishedText = this.raw

          // Expand (passing the node, this allows tracking of recursion depth)
          const selectedRule = this.grammar.selectRule(this.symbol, this, this.errors)

          this.expandChildren(selectedRule, preventRecursion)

          // Apply modifiers
          this.modifiers.forEach(modName => {
            let modParams = []
            if (modName.indexOf('(') > 0) {
              const regExp = /\(([^)]+)\)/

              const results = regExp.exec(modName)
              if (results && results.length >= 2) {
                modParams = results[1].split(',')
                modName = modName.substring(0, modName.indexOf('('))
              }
            }

            const mod = this.grammar.modifiers[modName]

            // Missing modifier?
            if (mod) {
              this.finishedText = mod(this.finishedText, modParams)
            } else {
              this.errors.push('Missing modifier ' + modName)
              this.finishedText += '((.' + modName + '))'
            }
          })

          // Perform post-actions
          this.postactions.forEach(pa => pa.activate())
          break
        }
        case 2:
          // Just a bare action?  Expand it!
          this.action = new NodeAction(this, this.raw)
          this.action.activate()

          // No visible text for an action
          this.finishedText = ''
          break
        default:

      }
    }
  }

  clearEscapeChars() {
    this.finishedText = this.finishedText.replace(/\\\\/g, 'DOUBLEBACKSLASH').replace(/\\/g, '').replace(/DOUBLEBACKSLASH/g, '\\')
  }
}

module.exports = EpuresNode
