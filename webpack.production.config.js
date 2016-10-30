const WebpackStripLoader = require("strip-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const devConfig = require("./webpack.config");
const webpack = require("webpack");

devConfig.entry.comunica = ["./src/router.jsx"];
devConfig.devtool = "cheap-source-map";
devConfig.output.filename = "[name].min.js";

devConfig.module.loaders.push({
    test: [/\.jsx?$/],
    exclude: /node_modules/,
    loader: WebpackStripLoader.loader("console.log"),
});

devConfig.plugins = [
    new webpack.DefinePlugin({"process.env": {NODE_ENV: JSON.stringify("production")}}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
    new webpack.ProvidePlugin({
        Promise: "imports?this=>global!exports?global.Promise!es6-promise",
        fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch",
    }),
];

module.exports = devConfig;
