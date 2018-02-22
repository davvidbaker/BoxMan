const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ip = require('ip');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[name].[hash].js',
  },

  plugins: [
    new webpack.DefinePlugin({
      // this is for how react is told to use production https://facebook.github.io/react/docs/optimizing-performance.html
      'process.env': {
        NODE_ENV: "'production'",
      },
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new HtmlWebpackPlugin({
      template: './index.prod.ejs',
      title: 'Fourth Person',
    }),
  ],
});
