module.exports = {
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
    loaders: [{
      test: /\.styl$/,
      loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
    }]
  },
  plugins: {
    autoprefixer: {}
  }
}
