function * factory(n, fn) {
  for (let i = n; i > 0; --i) {
    yield fn(i)
  }
}

function getSamples(n, fn) {
  return [...factory(10, fn)]
}

module.exports = {getSamples}
