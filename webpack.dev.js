const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'development',
  plugins: [
    new ExtractTextPlugin({ disable: true })    
  ]
})
