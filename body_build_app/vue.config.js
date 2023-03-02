const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭语法检查
  lintOnSave: false,
  // 配置vant定制主题
 /*  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "@/assets/less/resetVant.less";`,
          },
        },
      },
    },
  }, */
  // 配置代理
  devServer: {
    proxy: 'http://localhost:3007'
  },
})
