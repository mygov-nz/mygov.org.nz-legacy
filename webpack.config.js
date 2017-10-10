'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    behaviour: './src/public/js/behaviour.js',
    'mmp-review-tool': './src/public/js/mmp-review-tool/mmp-review-tool.js',
    'non-voters-tool': './src/public/js/non-voters-tool/non-voters-tool.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/s3/js')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      'node_modules',
      'src',
      'src/node_modules'
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
            /* ['env', {
              //
            }], */
            'react',
            'typescript'
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
      minimize: false,
      debug: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Collapse: "exports-loader?Util!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
    })
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common'
    // }),
    /* new webpack.optimize.UglifyJsPlugin({
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
    }) */
  ]
};
