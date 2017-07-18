process.env.NODE_ENV = 'production'

module.exports = {
  entry: [
    './index.js'
  ],

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
