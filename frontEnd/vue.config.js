module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://10.4.17.122/ims/api/v1/',
          changeOrigin: true,
          pathRewrite: {'^/api': ''},
          logLevel: 'debug'
        },
      }
    }
}