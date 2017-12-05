/* eslint no-useless-escape: "off" */

import test from 'ava'

const epures = require('./index')

const grammar = epures.createGrammar({
  deepHash: ['\\#00FF00', '\\#FF00FF'],
  deeperHash: ['#deepHash#'],
  animal: ['bear', 'cat', 'dog', 'fox', 'giraffe', 'hippopotamus'],
  mood: ['quiet', 'morose', 'gleeful', 'happy', 'bemused', 'clever', 'jovial', 'vexatious', 'curious', 'anxious', 'obtuse', 'serene', 'demure'],

  nonrecursiveStory: ['The #pet# went to the beach.'],
  recursiveStory: ['The #pet# opened a book about[pet:#mood# #animal#] #pet.a#. #story#[pet:POP] The #pet# closed the book.'],

  svgColor: ['rgb(120,180,120)', 'rgb(240,140,40)', 'rgb(150,45,55)', 'rgb(150,145,125)', 'rgb(220,215,195)', 'rgb(120,250,190)'],
  svgStyle: ['style="fill:#svgColor#;stroke-width:3;stroke:#svgColor#"'],

  name: ['Cheri', 'Fox', 'Morgana', 'Jedoo', 'Brick', 'Shadow', 'Krox', 'Urga', 'Zelph'],
  story: ['#hero.capitalize# was a great #occupation#, and this song tells of #heroTheir# adventure. #hero.capitalize# #didStuff#, then #heroThey# #didStuff#, then #heroThey# went home to read a book.'],
  monster: ['dragon', 'ogre', 'witch', 'wizard', 'goblin', 'golem', 'giant', 'sphinx', 'warlord'],
  setPronouns: ['[heroThey:they][heroThem:them][heroTheir:their][heroTheirs:theirs]', '[heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers]', '[heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his]'],
  setOccupation: ['[occupation:baker][didStuff:baked bread,decorated cupcakes,folded dough,made croissants,iced a cake]', '[occupation:warrior][didStuff:fought #monster.a#,saved a village from #monster.a#,battled #monster.a#,defeated #monster.a#]'],
  origin: ['#[#setPronouns#][#setOccupation#][hero:#name#]story#']
})

grammar.addModifiers(epures.modifiers.en_US)

test.before(() => {
  grammar.clearState()
})

test('createGrammar', t => {
  t.true(typeof epures.createGrammar === 'function')
})

test('modifiers', t => {
  t.true(typeof epures.modifiers.en_US === 'object')
  t.true(typeof epures.modifiers.fr_FR === 'object')
})

test('EpuresNode', t => {
  t.true(typeof epures.EpuresNode === 'function')
})

test('Grammar', t => {
  t.true(typeof epures.Grammar === 'function')
})

test('Symbol', t => {
  t.true(typeof epures.Symbol === 'function')
})

test('RuleSet', t => {
  t.true(typeof epures.RuleSet === 'function')
})

test('setRng', t => {
  t.true(typeof epures.setRng === 'function')
})

test('Plain text', t => {
  const r = [
    'a',
    'Emma Woodhouse, handsome, clever, and rich, with a comfortable home and happy disposition, seemed to unite some of the best blessings of existence; and had lived nearly twenty-one years in the world with very little to distress or vex her.'
  ].map(x => grammar.expand(x).finishedText)

  t.is(r[0], 'a')
  t.is(r[1], 'Emma Woodhouse, handsome, clever, and rich, with a comfortable home and happy disposition, seemed to unite some of the best blessings of existence; and had lived nearly twenty-one years in the world with very little to distress or vex her.')
})

test('Escape characters', t => {
  const r = [
    '\\#escape hash\\# and escape slash\\\\',
    '#deepHash# [myColor:#deeperHash#] #myColor#',
    '"test" and \'test\'',
    '\\[\\]',
    '\\#',
    '\\\\',
    'An action can have inner tags: \[key:\#rule\#\]',
    'A tag can have inner actions: \"\\#\\[myName:\\#name\\#\\]story\\[myName:POP\\]\\#\"'
  ].map(x => grammar.expand(x).finishedText)

  t.is(r[0], '#escape hash# and escape slash\\')
  console.log(`Escape characters - ${r[1]}`)
  t.is(r[2], `"test" and 'test'`)
  t.is(r[3], '[]')
  t.is(r[4], '#')
  t.is(r[5], '\\')
  console.log(`Escape characters - ${r[6]}`)
  console.log(`Escape characters - ${r[7]}`)
})

test('Web specifics', t => {
  const r = [
    '💻🐋🌙🏄🍻',
    '&\\#x2665; &\\#x2614; &\\#9749; &\\#x2665;',
    '<svg width="100" height="70"><rect x="0" y="0" width="100" height="100" #svgStyle#/> <rect x="20" y="10" width="40" height="30" #svgStyle#/></svg>'
  ].map(x => grammar.expand(x).finishedText)

  t.is(r[0], '💻🐋🌙🏄🍻')
  t.is(r[1], '&#x2665; &#x2614; &#9749; &#x2665;')
  console.log(`Web specifics - ${r[2]}`)
})

test('Push', t => {
  const r = [
    '[pet:#animal#]You have a #pet#. Your #pet# is #mood#.',
    '[pet:#animal#]You have a #pet#. [pet:#animal#]Pet:#pet# [pet:POP]Pet:#pet#',
    '#[pet:#animal#]nonrecursiveStory# post:#pet#',
    '#origin#',
    '#animal.foo#',
    '[pet:#animal#]#nonrecursiveStory# -> #nonrecursiveStory.replace(beach,mall)#',
    '[pet:#animal#]#recursiveStory#'
  ].map(x => grammar.expand(x).finishedText)

  r.map(x => console.log(`Push - ${x}`))
  t.true(true)
})

test('Errors', t => {
  const r = [
    '#unmatched',
    '#unicorns#',
    '[pet:unicorn',
    'pet:unicorn]',
    '[][]][][][[[]]][[]]]]',
    '[][#]][][##][[[##]]][#[]]]]'
  ].map(x => grammar.expand(x).finishedText)

  t.is(r[0], 'unmatched')
  t.is(r[1], '((unicorns))')
  t.is(r[2], 'pet:unicorn')
  console.log(`Errors - ${r[3]}`)
  console.log(`Errors - ${r[4]}`)
  console.log(`Errors - ${r[5]}`)
})

test('Create a grammar that can itself create valid grammars', async t => {
  const makeGrammar = () => {
    const inQuotes = s => '"' + s + '"'

    const keys = 'ABCDEFGH'.split('')

    const ruleGrammar = epures.createGrammar({
      key: keys,

      modifier: ['capitalize', 's', 'ed'],

      character: 'aaabbcccdddddeeeeefffghhhiijklmmnooopqrrrrsssssttttuuvwxyz....,,,!!??'.split(''),
      plaintext: ['#character##plaintext#', '#character#'],

      tagContents: ['#key#', '#key#.#modifier#'],
      section: ['#plaintext#', '#plaintext#', '#tagContents.inTags#'],
      rule: ['#section#', '#section##section#', '#section##section##section#'],
      multiRuleSet: ['#rule.inQuotes#', '#multiRuleSet#,#rule.inQuotes#', '#multiRuleSet#,#rule.inQuotes#'],
      ruleset: ['#rule.inQuotes#', '#multiRuleSet.inBrackets#', '#multiRuleSet.inBrackets#']
    })

    ruleGrammar.modifiers.inQuotes = function (s) {
      return '"' + s + '"'
    }
    ruleGrammar.modifiers.inTags = function (s) {
      return '\\#' + s + '\\#'
    }
    ruleGrammar.modifiers.inBrackets = function (s) {
      return '\\[' + s + '\\]'
    }

    const symbols = keys.map(key => {
      const rules = ruleGrammar.flatten('#ruleset#')
      return inQuotes(key) + ': ' + rules
    })
    const raw = '{' + symbols.join(',\n') + '}'

    const grammar = epures.createGrammar(JSON.parse(raw))
    grammar.addModifiers(epures.modifiers.en_US)

    console.log(`Make Grammar - ${raw}`)
    t.true(raw.length > 0)
    for (let i = 0; i < keys.length; i++) {
      const expansions = []
      for (let j = 0; j < 5; j++) {
        expansions.push(grammar.flatten('#' + keys[i] + '#'))
      }

      console.log(`Make Grammar - ${expansions}`)
      t.true(expansions.length > 0)
    }
  }

  await makeGrammar()
})
