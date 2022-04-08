const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'http://toutiao.itheima.net',
    // proxy: 'http://toutiao-app.itheima.net/',
  },
})
