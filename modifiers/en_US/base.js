const common = require('../common')

const langRules = {
  a: s => {
    // Beware that this only covers some most common cases
    // https://english.stackexchange.com/questions/152/when-should-i-use-a-vs-an
    if (s.length > 0) {
      if (s.charAt(0).toLowerCase() === 'u') {
        if (s.length > 2) {
          if (s.charAt(2).toLowerCase() === 'i') {
            return 'a ' + s
          }
        }
      }

      if (common.isVowel(s.charAt(0))) {
        return 'an ' + s
      }
    }

    return 'a ' + s
  },

  firstS: s => {
    const s2 = s.split(' ')

    const finished = langRules.s(s2[0]) + ' ' + s2.slice(1).join(' ')
    return finished
  },

  s: s => {
    switch (s.charAt(s.length - 1)) {
      case 's':
        return s + 'es'
      case 'h':
        return s + 'es'
      case 'x':
        return s + 'es'
      case 'y':
        if (!common.isVowel(s.charAt(s.length - 2))) {
          return s.substring(0, s.length - 1) + 'ies'
        }
        return s + 's'
      default:
        return s + 's'
    }
  },

  ed: s => {
    switch (s.charAt(s.length - 1)) {
      case 's':
        return s + 'ed'
      case 'e':
        return s + 'd'
      case 'h':
        return s + 'ed'
      case 'x':
        return s + 'ed'
      case 'y':
        if (!common.isVowel(s.charAt(s.length - 2))) {
          return s.substring(0, s.length - 1) + 'ied'
        }
        return s + 'd'
      default:
        return s + 'ed'
    }
  }
}

module.exports = Object.assign({}, common, langRules)
