var path = require('path');
module.exports = {
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'vue.js',
        library: 'Vue',
        libraryTarget: 'umd'
    },
    devtool: 'source-map'
};