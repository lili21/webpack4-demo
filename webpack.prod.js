const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: '[name]-[contenthash].js',
    chunkFilename: '[name]-[contenthash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      // 如果支持http2的话，可以把下面两个注释去掉
      // maxAsyncRequests: Infinity,
      // maxInitialRequests: Infinity,
      cacheGroups: {
        // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/85
        styles: {
          name: 'styles',
          test: module => module.nameForCondition &&
            /\.(css|s[ac]ss)$/.test(module.nameForCondition()) &&
            !/^javascript/.test(module.type),
          chunks: 'all',
          enforce: true,
        },
        vendors: {
          test: chunk => (
            chunk.resource &&
            /\.js$/.test(chunk.resource) &&
            /node_modules/.test(chunk.resource)
          ),
          chunks: 'initial',
          name: 'vendors',
        },
      }
    },
    runtimeChunk: { name: 'runtime' }
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),

    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name;
      }

      // eslint-disable-next-line no-underscore-dangle
      return [...chunk._modules]
        .map(m => path.relative(
          m.context,
          m.userRequest.substring(0, m.userRequest.lastIndexOf('.')),
        ))
        .join('_');
    }),

    new MiniCssPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css'
    }),

    new OptimizeCSSPlugin({}),

    new ScriptExtHtmlWebpackPlugin({
      inline: [
        // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/85
        /styles.*\.js$/, // temporary fix style.js issue
        /runtime/
      ],
      prefetch: {
        test: /\.js$/,
        chunks: 'async',
      },
      preload: {
        test: /\.js$/,
        chunks: 'initial'
      }
    })
  ]
})
