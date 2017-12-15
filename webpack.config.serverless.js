'use strict';

const path = require('path');
const webpack = require('webpack');

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    cloudfront: './handlers/cloudfront.js',
    global: './handlers/global.js',
    'mmp-review-tool': './handlers/mmp-review-tool.js',
    'non-voters-tool': './handlers/non-voters-tool.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/lambda'),
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      './',
      './node_modules'
    ]
  },
  module: {
    rules: [
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
            'react'
          ]
        }
      }
    ]
  },
  target: 'node',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: !debug,
      debug: debug
    })
  ]
};
