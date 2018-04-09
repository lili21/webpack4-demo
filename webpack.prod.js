const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssPlugin = require('mini-css-extract-plugin')

const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssPlugin.loader,
          'css-loader'
        ]
      }
    ]
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
    new MiniCssPlugin({
      filename: '[name].[contenthash:6].css',
      chunkFilename: '[name].[contenthash:6].css'
    })
  ]
})
