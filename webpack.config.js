const path = require('path')
const { RUN_ENV } = process.env

const config = {
  entry: [
    RUN_ENV === 'local' ? './local.js' : './index.js'
  ],

  devtool: 'source-map',

  target: 'node',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: __dirname,
      exclude: /node_modules/
    }]
  }
}

if (RUN_ENV === 'local') {
  config.output = {
    filename: 'build.js',
    path: path.join(__dirname, './dist')
  }
}

module.exports = config
