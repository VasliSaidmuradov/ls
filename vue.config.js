module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/main.scss";`
      }
    }
  }
}
