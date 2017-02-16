const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEV = process.env.NODE_ENV !== 'production';

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify(DEV ? 'development' : 'production'),
  },
  __DEV__: JSON.stringify(DEV),
};

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoErrorsPlugin(),
];

const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      screw_ie8: true,
      warnings: false,
    },
    mangle: {
      screw_ie8: true,
    },
    output: {
      comments: false,
      screw_ie8: true,
    },
  }),
];

const plugins = [
  new webpack.DefinePlugin(GLOBALS),
  new webpack.ProvidePlugin({
    Promise: 'es6-promise', // https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602
    fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
  }),
  new HtmlWebpackPlugin({
    inject: 'body',
    filename: '../index.html',
    template: path.resolve(__dirname, './src/www/index.html'),
  }),
].concat(DEV ? devPlugins : prodPlugins);

if (fs.existsSync('./vendor.manifest.json')) {
  plugins.push(new webpack.DllReferencePlugin({ context: __dirname, manifest: require('./vendor.manifest.json') }));
}

module.exports = {
  plugins,
  cache: true,
  devtool: DEV ? 'inline-source-map' : 'cheap-source-map',
  entry: {
    app: (DEV ? [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:4000',
      'webpack/hot/only-dev-server',
    ] : []).concat(['./src/overrides.scss', './src/index.jsx']),
  },
  output: {
    filename: '[name].js',
    library: ['AgenciaAmiga'],
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist/js'),
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
      { test: /\.jsx?$/, include: /src/, loader: 'babel' },
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
    ],
  },
  postcss: {
    defaults: [autoprefixer],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', './src'],
  },
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
