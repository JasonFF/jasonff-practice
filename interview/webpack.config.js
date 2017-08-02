var path = require('path')
var webpack = require('webpack')

var ExtractTextPlugin = require('extract-text-webpack-plugin')

var sourcePath = path.join('./src')
var nodeModules = path.join('./node_modules')

module.exports = {
  entry: './src/main.js',
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
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      }
    ]
  },
  resolve: {
    extensions: [
      '.js'
    ],
    modules: [
      sourcePath,
      nodeModules
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 7777
  },
  devtool: '#source-map',
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
}
