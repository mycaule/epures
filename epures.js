let epures = (() => {
  const EpuresNode = (parent, childIndex, settings) => {
    this.errors = []

    // No input? Add an error, but continue anyways
    if (settings.raw === undefined) {
      this.errors.push('Empty input for node')
      settings.raw = ''
    }

    // If the root node of an expansion, it will have the grammar passed as the 'parent'
    // set the grammar from the 'parent', and set all other values for a root node
    if (parent instanceof epures.Grammar) {
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

  EpuresNode.prototype.toString = () => {
    return 'Node(\'' + this.raw + '\' ' + this.type + ' d:' + this.depth + ')'
  }

  // Expand the node (with the given child rule)
  // Make children if the node has any
  EpuresNode.prototype.expandChildren = (childRule, preventRecursion) => {
    this.children = []
    this.finishedText = ''

    // Set the rule for making children,
    // and expand it into section
    this.childRule = childRule
    if (this.childRule !== undefined) {
      const sections = epures.parse(childRule)

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
    } else {
      // In normal operation, this shouldn't ever happen
      this.errors.push('No child rule provided, can\'t expand children')
      console.warn('No child rule provided, can\'t expand children')
    }
  }

  // Expand this rule (possibly creating children)
  EpuresNode.prototype.expand = preventRecursion => {
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
        case 1:
          // Parse to find any actions, and figure out what the symbol is
          this.preactions = []
          this.postactions = []

          var parsed = epures.parseTag(this.raw)

          // Break into symbol actions and modifiers
          this.symbol = parsed.symbol
          this.modifiers = parsed.modifiers

          // Create all the preactions from the raw syntax
          for (var i = 0; i < parsed.preactions.length; i++) {
            this.preactions[i] = new NodeAction(this, parsed.preactions[i].raw)
          }

          // Make undo actions for all preactions (pops for each push)
          for (var i = 0; i < this.preactions.length; i++) {
            if (this.preactions[i].type === 0) {
              this.postactions.push(this.preactions[i].createUndo())
            }
          }

          // Activate all the preactions
          for (var i = 0; i < this.preactions.length; i++) {
            this.preactions[i].activate()
          }

          this.finishedText = this.raw

          // Expand (passing the node, this allows tracking of recursion depth)
          var selectedRule = this.grammar.selectRule(this.symbol, this, this.errors)

          this.expandChildren(selectedRule, preventRecursion)

          // Apply modifiers
          for (var i = 0; i < this.modifiers.length; i++) {
            let modName = this.modifiers[i]
            var modParams = []
            if (modName.indexOf('(') > 0) {
              const regExp = /\(([^)]+)\)/

              const results = regExp.exec(this.modifiers[i])
              if (!results || results.length < 2) {
              } else {
                var modParams = results[1].split(',')
                modName = this.modifiers[i].substring(0, modName.indexOf('('))
              }
            }

            const mod = this.grammar.modifiers[modName]

            // Missing modifier?
            if (!mod) {
              this.errors.push('Missing modifier ' + modName)
              this.finishedText += '((.' + modName + '))'
            } else {
              this.finishedText = mod(this.finishedText, modParams)
            }
          }

          // Perform post-actions
          for (var i = 0; i < this.postactions.length; i++) {
            this.postactions[i].activate()
          }
          break
        case 2:

          // Just a bare action?  Expand it!
          this.action = new NodeAction(this, this.raw)
          this.action.activate()

          // No visible text for an action
          this.finishedText = ''
          break

      }
    } else {
      // Console.warn("Already expanded " + this);
    }
  }

  EpuresNode.prototype.clearEscapeChars = () => {
    this.finishedText = this.finishedText.replace(/\\\\/g, 'DOUBLEBACKSLASH').replace(/\\/g, '').replace(/DOUBLEBACKSLASH/g, '\\')
  }

  // An action that occurs when a node is expanded
  // Types of actions:
  // 0 Push: [key:rule]
  // 1 Pop: [key:POP]
  // 2 function: [functionName(param0,param1)] (TODO!)
  const NodeAction = (node, raw) => {
    this.node = node

    const sections = raw.split(':')
    this.target = sections[0]

    // No colon? A function!
    if (sections.length === 1) {
      this.type = 2
    }

    // Colon? It's either a push or a pop
    else {
      this.rule = sections[1]
      if (this.rule === 'POP') {
        this.type = 1
      } else {
        this.type = 0
      }
    }
  }

  NodeAction.prototype.createUndo = () => {
    if (this.type === 0) {
      return new NodeAction(this.node, this.target + ':POP')
    }

    return null
  }

  NodeAction.prototype.activate = () => {
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
    }
  }

  NodeAction.prototype.toText = () => {
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

  const Grammar = require('./utils/grammar')

    // Parses a plaintext rule in the epures syntax
  epures = {

    createGrammar(raw) {
      return new Grammar(raw)
    },

        // Parse the contents of a tag
    parseTag(tagContents) {
      const parsed = {
        symbol: undefined,
        preactions: [],
        postactions: [],
        modifiers: []
      }
      const sections = epures.parse(tagContents)
      let symbolSection
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].type === 0) {
          if (symbolSection === undefined) {
            symbolSection = sections[i].raw
          } else {
            throw new Error('multiple main sections in ' + tagContents)
          }
        } else {
          parsed.preactions.push(sections[i])
        }
      }

      if (symbolSection === undefined) {
                //   Throw ("no main section in " + tagContents);
      } else {
        const components = symbolSection.split('.')
        parsed.symbol = components[0]
        parsed.modifiers = components.slice(1)
      }
      return parsed
    },

    parse(rule) {
      let depth = 0
      let inTag = false
      var sections = []
      let escaped = false

      const errors = []
      let start = 0

      let escapedSubstring = ''
      let lastEscapedChar

      if (rule === null) {
        var sections = []
        sections.errors = errors

        return sections
      }

      function createSection(start, end, type) {
        if (end - start < 1) {
          if (type === 1) {
            errors.push(start + ': empty tag')
          }
          if (type === 2) {
            errors.push(start + ': empty action')
          }
        }
        let rawSubstring
        if (lastEscapedChar !== undefined) {
          rawSubstring = escapedSubstring + '\\' + rule.substring(lastEscapedChar + 1, end)
        } else {
          rawSubstring = rule.substring(start, end)
        }
        sections.push({
          type,
          raw: rawSubstring
        })
        lastEscapedChar = undefined
        escapedSubstring = ''
      }

      for (let i = 0; i < rule.length; i++) {
        if (!escaped) {
          const c = rule.charAt(i)

          switch (c) {
            // Enter a deeper bracketed section
            case '[':
              if (depth === 0 && !inTag) {
                if (start < i) {
                  createSection(start, i, 0)
                }
                start = i + 1
              }
              depth++
              break

            case ']':
              depth--

              // End a bracketed section
              if (depth === 0 && !inTag) {
                createSection(start, i, 2)
                start = i + 1
              }
              break

            // Hashtag
            // ignore if not at depth 0, that means we are in a bracket
            case '#':
              if (depth === 0) {
                if (inTag) {
                  createSection(start, i, 1)
                  start = i + 1
                } else {
                  if (start < i) {
                    createSection(start, i, 0)
                  }
                  start = i + 1
                }
                inTag = !inTag
              }
              break

            case '\\':
              escaped = true
              escapedSubstring += rule.substring(start, i)
              start = i + 1
              lastEscapedChar = i
              break
          }
        } else {
          escaped = false
        }
      }
      if (start < rule.length) {
        createSection(start, rule.length, 0)
      }

      if (inTag) {
        errors.push('Unclosed tag')
      }
      if (depth > 0) {
        errors.push('Too many [')
      }
      if (depth < 0) {
        errors.push('Too many ]')
      }

      // Strip out empty plaintext sections
      sections = sections.filter(section => {
        if (section.type === 0 && section.raw.length === 0) {
          return false
        }
        return true
      })
      sections.errors = errors
      return sections
    }
  }

  epures.baseEngModifiers = require('./modifiers/base-eng')

  epures.EpuresNode = require('./utils/epures-node')
  epures.Grammar = require('./utils/grammar')
  epures.Symbol = require('./utils/symbol')
  epures.RuleSet = require('./utils/rule-set')
  return epures
})()

module.exports = epures
