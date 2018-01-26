module.exports = {
  entry: ['babel-polyfill', './src/index.js'],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader', 'image-webpack-loader'],
      },
    ],
  },

  resolve: {
    modules: ['src', 'node_modules'],
  },
};
