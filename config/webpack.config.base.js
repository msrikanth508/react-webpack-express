var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
var basePath = __dirname;

module.exports = {
  context: path.join(basePath, '../src'),
  resolve: {
    modules: [
      path.join(basePath, '../src'),      
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.scss'],
  },
  output: {
    filename: 'js/[name].js',
    path: path.join(basePath, '../public/build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      { 
        test: /\.css$/, 
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use:[{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'images/[name].[ext]?[hash]'
          }
        }],        
      },      
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use:[{
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: 'fonts/[name].[ext]?[hash]'
          }
        }]        
      },
    ],
  },
  plugins: [
    new WebpackNotifierPlugin()
  ],
};