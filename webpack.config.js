var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    devtool: 'inline-source-map',

    entry: {
        todolist: './src/public/app',
    },

    output: {
        path: 'release',
        filename: '[name].js',
        publicPath: ''
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
            fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
    ],
    module: {
        loaders: [{
            test: /\.jsx$/,
            loaders: ['babel'],
            exclude: /node_modules/
        }, {
            test: /\.css?$/,
            loaders: ['style', 'raw']
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }]
    }
};
