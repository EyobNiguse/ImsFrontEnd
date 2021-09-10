module.exports = {
  assetsDir: "static",
  runtimeCompiler: true,

  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost/ims/api/v1/',
        changeOrigin: true,
        pathRewrite: {'^/api': ''},
        logLevel: 'debug'
      },  
    }
  }
}