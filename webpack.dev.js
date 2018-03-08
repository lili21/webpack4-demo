const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')

const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin()
  ]
})
