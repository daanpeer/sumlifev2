const path = require('path')
const { RUN_ENV } = process.env
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')

const plugins = []
plugins.push(new webpack.DefinePlugin({
  'process.env.RUN_ENV': JSON.stringify(RUN_ENV || 'local')
}))
plugins.push(new MinifyPlugin())

const config = {
  entry: [
    RUN_ENV === 'local' ? './local.js' : './index.js'
  ],

  devtool: 'sourcemap',
  externals: [nodeExternals()],
  target: 'node',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  },
  plugins
}

if (RUN_ENV === 'local') {
  config.output = {
    filename: 'build.js',
    path: path.join(__dirname, './dist')
  }
}

module.exports = config
