var version = require('./package.json').version;
var webpack = require('webpack');
// // Custom webpack loaders are generally the same for all webpack bundles, hence
// // stored in a separate local variable.
// var loaders = [
//     { test: /\.json$/, loader: 'json-loader' },
// ];

const path = require('path');

var rules = [
    // { test: /\.json$/, use: "json-loader" },
];
var externals = ['@jupyter-widgets/base', '@jupyter-widgets/controls', 'jupyter-js-widgets'];
var plugin_name = 'jupyter-webrtc';

var resolve =  {
    extensions: ['.ts', '.js'],
    fallback: {
        util: require.resolve("util/"),
        url: require.resolve("url/"),
        process: require.resolve("process/")
    }
};

var plugins =  [
    new webpack.ProvidePlugin({
           process: 'process/browser',
           Buffer: ['buffer', 'Buffer'],
    }),
];

module.exports = [
    {
        entry: './src/extension.js',
        output: {
            filename: 'extension.js',
            path: path.resolve(__dirname, `../share/jupyter/nbextensions/${plugin_name}`),
            libraryTarget: 'amd',
            publicPath: ''
        },
        mode: 'development',
        resolve: resolve,
        plugins: plugins
    },
    {
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, `../share/jupyter/nbextensions/${plugin_name}`),
            libraryTarget: 'amd',
            publicPath: ''
        },
        devtool: 'source-map',
        module: {
            rules: rules
        },
        externals: externals,
        mode: 'development',
        resolve: resolve,
        plugins: plugins
    },
    {// Embeddable jupyter-webrtc bundle
        entry: './src/embed.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, './dist/'),
            libraryTarget: 'amd',
            publicPath: 'https://unpkg.com/jupyter-webrtc@' + version + '/dist/'
        },
        devtool: 'source-map',
        module: {
            rules: rules
        },
        externals: externals,
        mode: 'development',
        resolve: resolve,
        plugins: plugins
    }
];
