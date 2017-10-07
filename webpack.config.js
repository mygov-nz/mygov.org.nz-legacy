'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    behaviour: './src/public/js/behaviour.js',
    'mmp-review-tool': './src/public/js/mmp-review-tool.js',
    'non-voters-tool': './src/public/js/non-voters-tool.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/s3/js')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            'env',
            // 'react'
          ]
        }
      }
    ]
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        keep_fnames: true,
        screw_ie8: true
      }
    })
  ]
};
