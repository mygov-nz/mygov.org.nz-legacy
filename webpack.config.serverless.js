'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    global: './handlers/global.js',
    'mmp-review-tool': './handlers/mmp-review-tool.js',
    'non-voters-tool': './handlers/non-voters-tool.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/lambda')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      './',
      './node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            ["env", {
              "targets": {
                "node": "6.10.3"
              }
            }],
            'react',
            'typescript'
          ]
        }
      }
    ]
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true
    })
  ]
};
