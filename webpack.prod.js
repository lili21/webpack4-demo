const webpack = require('webpack')
const MiniCssWebpackPlugin = require('mini-css-extract-plugin')
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
          test: /[\\/]node_modules[\\/]/,
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
    runtimeChunk: {
      name: 'runtime'
    },
    // namedModules: true,
    // namedChunks: true
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedChunksPlugin(chunk => {
      return chunk.name || 'john-chunk'
    }),
    // 暂时不支持contenthash
    new MiniCssWebpackPlugin({
      filename: '[name].[chunkhash:6].css',
      chunkFilename: '[name].[chunkhash:6].css'
    })
  ]
})
