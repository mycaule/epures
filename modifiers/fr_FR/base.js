const common = require('../common')

const lang = {
  femininize: s => `${s}e`,

  // See http://la-conjugaison.nouvelobs.com/regles/grammaire/les-noms-219.php
  isFeminine: s => {
    const last6 = common.last(s, 6)
    const last5 = common.last(s, 5)
    const last4 = common.last(s, 4)
    const last3 = common.last(s, 3)
    const last2 = common.last(s, 2)
    const last1 = common.last(s, 1)

    if (last6 === 'euille') {
      return false
    } else if (last5 === 'aille') {
      return true
    } else if (last5 === 'eille') {
      return true
    } else if (last4 === 'ueil') {
      return false
    } else if (last4 === 'euil') {
      return false
    } else if (last3 === 'ail') {
      return false
    } else if (last3 === 'tié') {
      return true
    } else if (last3 === 'eil') {
      return false
    } else if (last2 === 'ée') {
      return true
    } else if (last2 === 'té') {
      return true
    } else if (last1 === 'e') {
      return true
    }

    return false
  },

  isPlural: s => {
    const last4 = common.last(s, 4)
    const last3 = common.last(s, 3)
    const last1 = common.last(s, 1)

    if (last4 === 'ails') {
      return true
    } else if (last4 === 'eaux') {
      return true
    } else if (last3 === 'aux') {
      return true
    } else if (last3 === 'eux') {
      return true
    } else if (last3 === 'aux') {
      return true
    } else if (last3 === 'ous') {
      return true
    } else if (last1 === 's') {
      return true
    } else if (last1 === 'x') {
      return true
    } else if (last1 === 'z') {
      return true
    }

    return false
  },

  le: s => {
    const first1 = common.first(s, 1)
    if (common.isVowel(first1)) {
      return `l'${s}`
    } else if (lang.isPlural(s)) {
      return `les ${s}`
    } else if (lang.isFeminine(s)) {
      return `la ${s}`
    }
    return `le ${s}`
  },

  un: s => {
    if (lang.isPlural(s)) {
      return `des ${s}`
    } else if (lang.isFeminine(s)) {
      return `une ${s}`
    }
    return `un ${s}`
  }
}

module.exports = Object.assign({}, common, lang)
