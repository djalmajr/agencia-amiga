const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      './src/overrides.scss',
      './src/index.jsx',
    ],
  },
  output: {
    filename: '[name].js',
    library: ['AgenciaAmiga'],
    libraryTarget: 'umd',
    path: path.join(__dirname, 'public/js'),
    publicPath: 'http://localhost:3000/js/',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise', // https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
  devServer: {
    noInfo: true,
    publicPath: '/js/',
    historyApiFallback: true,
    stats: {
      chunks: false,
      colors: true,
      reasons: true,
    },
  },
};
