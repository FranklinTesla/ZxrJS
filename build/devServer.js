const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const extraConfig = require('./webpack.config.dev')
const WebpackDevServer = require('webpack-dev-server')

const compiler = webpack(Object.assign({}, baseConfig, extraConfig), (err, status) => {
    if (err || status.hasErrors()) {
        err = err || status.toJson().errors
        throw err
    }
    console.log(`listening at localhost: http://127.0.0.1:${extraConfig.devServer.port}`)
})

const server = new WebpackDevServer(compiler)

server.listen(extraConfig.devServer.port, '127.0.0.1', function (err) {
    if (err) throw err
})