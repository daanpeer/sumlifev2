const path = require('path')
const { RUN_ENV } = process.env
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

const plugins = []
plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
}))

const config = {
  entry: [
    RUN_ENV === 'development' ? './local.js' : './index.js'
  ],

  devtool: 'sourcemap',
  externals: [nodeExternals()],
  target: 'node',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: __dirname,
      exclude: /node_modules/
    }]
  },
  plugins
}

if (RUN_ENV === 'development') {
  config.output = {
    filename: 'build.js',
    path: path.join(__dirname, './dist')
  }
}

module.exports = config
