const path = require('path')
const { RUN_ENV, NODE_ENV } = process.env
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const slsw = require('serverless-webpack')

const plugins = []
plugins.push(new webpack.DefinePlugin({
  'process.env.RUN_ENV': JSON.stringify(RUN_ENV || 'local'),
  'process.env.NODE_ENV': JSON.stringify(NODE_ENV || 'development'),
}))

const config = {
  entry: RUN_ENV === 'local' ? './local.js' : slsw.lib.entries,
  mode: NODE_ENV || 'production',
  optimization: {
    minimize: false
  },
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
