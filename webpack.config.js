const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 6,
        mangle: false,
        output: {
          comments: false,
          beautify: false
        },
        warnings: false
      }
    })
  ],
  entry: './index.js',
  output: {
    filename: 'epures.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'epures'
  }
}
