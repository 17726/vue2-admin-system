const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
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
