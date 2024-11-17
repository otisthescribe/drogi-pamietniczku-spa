const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // Change the title here
    config.plugin('html').tap(args => {
      args[0].title = 'Dear Reader...'; // Set your desired title
      return args;
    });
  }
});