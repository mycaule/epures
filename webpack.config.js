const path = require('path')
// Const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  plugins: [
    // New UglifyJsPlugin({
    //   uglifyOptions: {
    //     ecma: 5,
    //     mangle: false,
    //     output: {
    //       comments: false,
    //       beautify: true
    //     },
    //     warnings: false
    //   }
    // })
  ],
  entry: './index.js',
  output: {
    filename: 'epures.webpack.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'epures'
  }
}
