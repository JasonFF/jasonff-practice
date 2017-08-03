var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.js'
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 7777
  },
  devtool: '#source-map',
}
