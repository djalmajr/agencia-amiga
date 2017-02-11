const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const config = require('./webpack.config');

const LIBRARY_NAME = '___AGENCIA_AMIGA___';

delete config.entry;
delete config.plugins;

module.exports = webpackMerge.smart(baseConfig, {
  entry: {
    'vendor': [
      'classnames',
      'faker',
      'fbjs',
      'firebase',
      'html-entities',
      'latinize',
      'localforage',
      'lodash',
      'moment',
      'normalizr',
      'react',
      'react-custom-scrollbars',
      'react-datepicker',
      'react-dom',
      'react-hot-loader',
      'react-images',
      'react-notification-system',
      'react-prop-types',
      'react-redux',
      'react-router',
      'redux',
      'redux-actions',
      'redux-async-initial-state',
      'redux-devtools',
      'redux-devtools-log-monitor',
      'redux-devtools-dock-monitor',
      'redux-immutable-state-invariant',
      'redux-saga',
      'reselect',
      'semantic-ui-react',
      'uuid',
    ],
  },
  output: {
    library: LIBRARY_NAME,
    path: path.join(__dirname, 'public/js'),
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '[name].manifest.json'),
      name: LIBRARY_NAME,
    }),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
});
