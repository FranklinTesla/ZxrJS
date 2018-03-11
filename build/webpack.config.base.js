const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../index'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'component.js',
        library: "Component",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
}