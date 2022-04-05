const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'http://www.liulongbin.top:8000',
    // proxy: 'http://toutiao-app.itheima.net/',
  },
})
