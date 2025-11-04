const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  // GitHub Pages 部署配置
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/vue2-admin-system/" // 仓库名
      : "/",

  // 输出目录
  outputDir: "dist",

  // 不生成 source map (减小构建体积)
  productionSourceMap: false,

  css: {
    loaderOptions: {
      sass: {
        // 自动为所有Sass文件注入全局变量
        // 注意:sass-loader v10+ 使用 'additionalData'
        additionalData: `@import "@/assets/styles/_variables.scss";`,
      },
    },
  },
});
