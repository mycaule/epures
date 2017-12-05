const voca = require('voca')

const methods = {
  isVowel: c => {
    const c2 = c.toLowerCase()
    return (c2 === 'a') || (c2 === 'e') || (c2 === 'i') || (c2 === 'o') || (c2 === 'u')
  }
}

module.exports = Object.assign({}, methods, voca)
