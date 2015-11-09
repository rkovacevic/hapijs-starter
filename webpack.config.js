var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: ['./frontend/index'],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    module: {
        loaders: [{
            test: /bootstrap\/js\//,
            loader: 'imports?jQuery=jquery'
        }, {
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'frontend')
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml'
        }]
    }
};