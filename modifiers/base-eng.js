const isVowel = c => {
  const c2 = c.toLowerCase()
  return (c2 === 'a') || (c2 === 'e') || (c2 === 'i') || (c2 === 'o') || (c2 === 'u')
}

const isAlphaNum = c => {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')
}

const escapeRegExp = str => {
  // Return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')
  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1')
}

const baseEngModifiers = {
  replace(s, params) {
    // http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
    return s.replace(new RegExp(escapeRegExp(params[0]), 'g'), params[1])
  },

  capitalizeAll(s) {
    let s2 = ''
    let capNext = true
    for (let i = 0; i < s.length; i++) {
      if (!isAlphaNum(s.charAt(i))) {
        capNext = true
        s2 += s.charAt(i)
      } else if (capNext) {
        s2 += s.charAt(i).toUpperCase()
        capNext = false
      } else {
        s2 += s.charAt(i)
      }
    }
    return s2
  },

  capitalize(s) {
    return s.charAt(0).toUpperCase() + s.substring(1)
  },

  a(s) {
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

      if (isVowel(s.charAt(0))) {
        return 'an ' + s
      }
    }

    return 'a ' + s
  },

  firstS(s) {
    const s2 = s.split(' ')

    const finished = baseEngModifiers.s(s2[0]) + ' ' + s2.slice(1).join(' ')
    return finished
  },

  s(s) {
    switch (s.charAt(s.length - 1)) {
      case 's':
        return s + 'es'
      case 'h':
        return s + 'es'
      case 'x':
        return s + 'es'
      case 'y':
        if (!isVowel(s.charAt(s.length - 2))) {
          return s.substring(0, s.length - 1) + 'ies'
        }
        return s + 's'
      default:
        return s + 's'
    }
  },

  ed(s) {
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
        if (!isVowel(s.charAt(s.length - 2))) {
          return s.substring(0, s.length - 1) + 'ied'
        }
        return s + 'd'
      default:
        return s + 'ed'
    }
  }
}

module.exports = baseEngModifiers
