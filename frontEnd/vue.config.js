module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://10.4.117.248/ims/api/v1/',
          changeOrigin: true,
          pathRewrite: {'^/api': ''},
          logLevel: 'debug'
        },
      }
    }
}