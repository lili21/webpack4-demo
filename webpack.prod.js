const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')

const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: chunk => (
            chunk.resource &&
            /\.js$/.test(chunk.resource) &&
            /node_modules/.test(chunk.resource)
          ),
          chunks: 'initial',
          name: 'vendors',
        },
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          chunks: 'async',
          name: 'async-vendors'
        }
      }
    },
    runtimeChunk: { name: 'runtime' }
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedChunksPlugin(chunk => chunk.name || 'faceless-chunk'), // a chunk has no name!!!
    new ExtractTextPlugin('[name].[contenthash:6].css')
  ]
})
