const merge = require('webpack-merge')

const base = require('./webpack.base')

module.exports = merge(base, {
  stats: 'errors-warnings',
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
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    hot: true
  }
})
