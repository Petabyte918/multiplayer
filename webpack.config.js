const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
 
const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: {
    'client/javascript/client': './client/javascript/index.js',
    'app': './app.js'
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
  target: 'node',
  node: {
    fs: 'empty',
    net: 'empty'
  },
  externals: nodeModules
};