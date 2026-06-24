const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
      publicPath: '/assets/'
    },
    allowedHosts: [
      'open-dive-directory.org'
    ]
  },
  entry: {
    index: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Open Dive Directory',
      favicon: 'src/assets/images/favicon.png',
      template: "src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "public/geodata", to: "assets/geodata" },
        { from: "public/icons", to: "assets/icons" },
      ]
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
