'use strict';

const path = require('path');
const webpack = require('webpack');

const debug = process.env.NODE_ENV !== 'production';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(debug ? 'development' : 'production')
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: !debug,
    debug: debug
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
  })
];

if (!debug) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
      screw_ie8: true,
      warnings: false
    },
    mangle: {
      screw_ie8: true
    }
  }));
}

module.exports = {
  entry: {
    behaviour: './src/public/js/behaviour.js',
    'mmp-review-tool': './src/public/js/mmp-review-tool.js',
    'non-voters-tool': './src/public/js/non-voters-tool.js',
    vendor: [
      'history/createBrowserHistory',
      'prop-types',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'reselect',
      'saintelague',
      './src/data',
      './src/lib/tools/common/render',
      './src/lib/tools/common/selectors',
      './src/views/Layout',
      './src/views/widgets/ComparisonTable',
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/public/js')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      './src',
      './node_modules'
    ],
    alias: {
      atob$: path.resolve(__dirname, './src/lib/tools/common/atob.js'),
      btoa$: path.resolve(__dirname, './src/lib/tools/common/btoa.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loaders:  [
          {
            loader: 'babel-loader',
            query: {
              presets: [
                ['env', {
                  targets: {
                    browsers: ['last 2 versions', '> 1%', 'ie >= 11']
                  }
                }],
                'react'
              ]
            }
          },
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  target: 'web',
  plugins: plugins
};
