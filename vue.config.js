const path = require('path')

const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/erabbits-client-pc/'
    : '/',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/less/variables.less'),
        path.join(__dirname, './src/assets/styles/less/mixins.less')
      ]
    }
  },

  configureWebpack: {
    plugins: [
      require('unplugin-element-plus/webpack')({
        // options
      })
    ]
  }
})
