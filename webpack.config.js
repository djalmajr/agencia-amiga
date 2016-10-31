/* global __dirname */

var autoprefixer = require("autoprefixer"),
    webpack = require("webpack"),
    path = require("path");

module.exports = {
    devtool: "eval",

    entry: {
        app: [
            "react-hot-loader/patch",
            "webpack-dev-server/client?http://localhost:9090",
            "webpack/hot/only-dev-server",
            "./src/router.jsx",
        ],
    },

    output: {
        filename: "[name].js",
        library: ["AgenciaAmiga"],
        libraryTarget: "umd",
        path: path.join(__dirname, "public/js"),
        publicPath: "http://localhost:9090/js/",
    },

    module: {
        preLoaders: [
            {test: /\.jsx?$/, loader: "eslint", include: /src/},
        ],

        loaders: [
            {
                test: /\.jsx?$/,
                include: /src/,
                loader: "babel",
            },
            {
                include: /src/,
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: "url?name=fonts/[name].[ext]&limit=10000",
            },
            {
                test: /\.scss$/,
                include: /src/,
                loaders: [
                    "style?sourceMap",
                    "css?modules&localIdentName=[name]__[local]__[hash:base64:10]",
                    "postcss",
                    "sass?sourceMap",
                ],
            },
        ],
    },

    postcss: {
        defaults: [autoprefixer],
    },

    resolve: {
        extensions: ["", ".js", ".jsx"],
        modulesDirectories: ["node_modules", "./src"],
    },

    plugins: [
        new webpack.DefinePlugin({"process.env": {NODE_ENV: JSON.stringify("development")}}),
        new webpack.ProvidePlugin({
            Promise: "imports?this=>global!exports?global.Promise!es6-promise",
            fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch",
        }),
    ],
};
