const common = require('../common')

const isAlphaNum = c => {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')
}

const escapeRegExp = str => {
  // Return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')
  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1')
}

const base = {
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
  }
}

module.exports = Object.assign({}, common, base)
