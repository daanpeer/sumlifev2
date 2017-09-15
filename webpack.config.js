const path = require('path')
const { NODE_ENV } = process.env
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

const config = {
  entry: [
    NODE_ENV === 'development' ? './local.js' : './index.js'
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}

if (NODE_ENV === 'development') {
  config.output = {
    filename: 'build.js',
    path: path.join(__dirname, './dist')
  }
}

module.exports = config
