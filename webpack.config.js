const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  cache: true,
  devtool: 'inline-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://localhost:4000/__webpack_hmr',
      // 'webpack-dev-server/client?http://localhost:4000',
      // 'webpack/hot/only-dev-server',
      './src/overrides.scss',
      './src/index.jsx',
    ],
    vendor: [
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
    filename: '[name].js',
    library: ['AgenciaAmiga'],
    libraryTarget: 'umd',
    path: path.join(__dirname, 'public/js'),
    publicPath: 'http://localhost:4000/js/',
  },
  module: {
    noParse: /localforage.js$/,
    preLoaders: [
      { test: /\.jsx?$/, loader: 'eslint', include: /src/ },
    ],
    loaders: [
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, exclude: /node_modules/, loader: 'file' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, exclude: /node_modules/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, exclude: /node_modules/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, exclude: /node_modules/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(jpe?g|png|gif)$/i, exclude: /node_modules/, loader: 'file?name=[name].[ext]' },
      { test: /\.ico$/, exclude: /node_modules/, loader: 'file?name=[name].[ext]' },
      { test: /\.json$/, exclude: /node_modules/, loader: 'json' },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        loaders: [
          'style',
          'css?sourceMap&modules&localIdentName=[name]__[local]__[hash:base64:10]',
          'postcss',
          'sass?sourceMap',
        ],
      },
      {
        test: /\.jsx?$/,
        include: /src/,
        loader: 'babel',
      },
    ],
  },
  postcss: {
    defaults: [autoprefixer],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', './src'],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') } }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise', // https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
  devServer: {
    // noInfo: true,
    publicPath: 'http://localhost:4000/js/',
    historyApiFallback: true,
    hot: true,
    stats: {
      chunks: false,
      colors: true,
      reasons: true,
    },
  },
};
