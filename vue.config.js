module.exports = {
  assetsDir: "static",
  runtimeCompiler: true,

  devServer: {
    proxy: {
      '^/api': {
<<<<<<< HEAD
        target: 'http://localhost/ims/api/v1/',
=======
        target: 'http://10.4.117.168/ims/api/v1/',
>>>>>>> 6aa67f9 (Prototype Done)
        changeOrigin: true,
        pathRewrite: {'^/api': ''},
        logLevel: 'debug'
      },  
    }
  }
}