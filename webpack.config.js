var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
    'webpack-dev-server/client?https://' + process.env.IP + ':' + process.env.PORT,
    'webpack/hot/only-dev-server',
    './frontend/index'
  ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
    module: {
        loaders: [
            {
                test: /bootstrap\/js\//,
                loader: 'imports?jQuery=jquery'
            },
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel?presets[]=es2015'],
                include: path.join(__dirname, 'frontend')
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
    ]
    }
};