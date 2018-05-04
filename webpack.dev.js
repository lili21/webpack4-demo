const merge = require('webpack-merge')

const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        // mini-css-extract-plugin 暂时不支持hmr
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
})
