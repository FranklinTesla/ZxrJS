var path = require('path');
module.exports = {
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'vue.js',
        library: 'Vue',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    devtool: 'source-map'
};