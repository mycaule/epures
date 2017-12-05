const common = require('../common')

const langRules = {
  femininize: s => {
    return s
  }
}

module.exports = Object.assign({}, common, langRules)
