const webpack = require('webpack')
const config = require('./webpack.config.base')

webpack(config, (err, status) => {
    if (err || status.hasErrors()) {
        err = err || status.toJson().errors
        throw err
    }
    console.log('Build complete!')
})
