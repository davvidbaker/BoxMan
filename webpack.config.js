module.exports = {
  entry: ['babel-polyfill', './src/index.js'],

  output: {
    filename: 'bundle.js', // use npm run build to build production bundle
  },

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
    ],
  },

  devtool: process.env.NODE_ENV === 'production'
    ? 'source-map'
    : 'cheap-module-source-map',

  // hacky way to view on remote computer (dev machine local IP is 192.168.0.15)
  devServer: {
    public: '192.168.0.15:9000',
  },

  resolve: {
    modules: ['src', 'node_modules'],
  },
};
