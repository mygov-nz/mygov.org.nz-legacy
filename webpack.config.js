'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    behaviour: './src/public/js/behaviour.js',
    'mmp-review-tool': './src/public/js/mmp-review-tool.js',
    'non-voters-tool': './src/public/js/non-voters-tool.js',
    vendor: [
      'gallagher',
      'history/createBrowserHistory',
      'prop-types',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'reselect',
      'saintelague',
      './src/data/index',
      './src/data/parties',
      './src/data/elections',
      './src/views/Layout',
      './src/views/utils',
      './src/views/widgets/ComparisonTable',
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/s3/js')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      'src',
      'src/node_modules',
      'node_modules'
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
              "targets": {
                "browsers": ["last 2 versions", "ie >= 11"]
              }
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
        NODE_ENV: JSON.stringify('development')
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
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
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
