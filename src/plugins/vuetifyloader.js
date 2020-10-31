const { VuetifyProgressiveModule } = require('vuetify-loader')

export default [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      compilerOptions: {
        modules: [VuetifyProgressiveModule]
      }
    }
  },
  {
    test: /\.(png|jpe?g|gif)$/,
    resourceQuery: /vuetify-preload/,
    use: [
      'vuetify-loader/progressive-loader',
      {
        loader: 'url-loader',
        options: { limit: 8000 }
      }
    ]
  }
]