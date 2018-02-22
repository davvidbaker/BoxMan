const webpack = require('webpack');
const ip = require('ip');

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

  plugins: [
    new webpack.DefinePlugin({
      SOCKET_SERVER_ADDRESS: `"${ip.address()}"`,
    }),
  ],

  // resolve: {
  //   modules: ['src', 'node_modules'],
  // },
};
