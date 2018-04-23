let webpackMerge = require('webpack-merge');
let commonConfig = require('./webpack.config.base.js');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CompressionPlugin = require('compression-webpack-plugin');
let webpack = require('webpack');

let basePath = __dirname;
const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true')),
};

module.exports = webpackMerge(commonConfig, {
  cache: true,
  devtool: 'source-map',
  entry: {
    bundle: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      "./index.js"
    ],
    vendor: ["react", "react-dom"],
  },
  output: {
    filename: 'js/[name].js',
    path: path.join(basePath, '../public/build'),
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: false,
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.js',
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    })
  ],
});
