const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  /**
   * Setting target as 'web' is important
   * Without this, webpack-dev-server does not work with .browserslistrc file
   */
  target: 'node',
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    compress: true,
    port: 3000,
  },
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {
      assets: path.join(__dirname, 'src/assets'),
    },
  },
  node: {
    global: false,
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new NodemonPlugin(),
    new ESLintPlugin({
      exclude: 'node_modules',
      failOnWarning: true,
    }),
  ],
};
