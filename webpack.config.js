module.exports = {
  entry: './client.js',
  output: {
    path: './public',
    filename: 'bundle.js' // use npm run build to build production bundle
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}