const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    host: '0.0.0.0',
    port: 9000,
    hot: true,
    historyApiFallback: true,
    https: true,
    contentBase: path.join(__dirname, 'dist'),
  },

  plugins: [
    new webpack.DefinePlugin({
      // SERVER: "'http://0.0.0.0:4000'",
      NODE_ENV: "'development'",
    }),
    new webpack.HotModuleReplacementPlugin({}),
    // This plugin will cause the relative path of the module to be displayed when HMR is enabled.
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './index.dev.ejs',
      title: 'Dev-Fourth Person',
    }),
  ],
});
