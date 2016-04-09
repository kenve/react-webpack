var path = require('path');
var webpack = require('webpack');


var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: {
        app: path.resolve(APP_PATH, 'index.jsx')
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    //enable dev source map
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: APP_PATH
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }]
    },
    plugins: [


    ]
}
