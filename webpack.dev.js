const merge = require('webpack-merge')

const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        // mini-css-extract-plugin 暂时不支持hmr
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
})
