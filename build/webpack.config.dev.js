const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../src/devEntry'),
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        compress: true,
        port: 9000,
        hot: true,
        noInfo: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/devEntry.html'),
            filename: 'index.html',
            inject: true
        })
    ]
}