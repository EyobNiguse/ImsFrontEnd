module.exports = {
  assetsDir: "static",
  runtimeCompiler: true,

  devServer: {
    proxy: {
      '^/api': {
        target: 'http://10.4.17.201/ims/api/v1/',
        changeOrigin: true,
        pathRewrite: {'^/api': ''},
        logLevel: 'debug'
      },  
    }
  }
}