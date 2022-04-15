// PostCSS 配置文件
module.exports = {
  // 配置要使用的 postCSS插件
  plugins: {
    // 配置使用autoprefixer 插件
    // autoprefixer: {
    // autoprefixer 插件配置
    // 配置要兼容到的环境信息
    // VueCLI 内部已经配置了 autoprefixer
    // 所有又配置了，所以不需要配置了
    //   browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },
    // 配置使用postcss-pxtorem插件
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的css属性
      // * 表示所有
      propList: ['*'],
      // 配置不要转换的样式资源
      exclude: 'github-markdown',
    },
  },
}
