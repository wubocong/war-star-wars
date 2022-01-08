const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
          'css-loader',
          { loader: 'postcss-loader'},
          'sass-loader',
        ]
      },
      {
        test: /\.(woff|eot|svg|ttf)$/,
        include: path.resolve(__dirname, 'src/font'),
        type: 'asset/resource',
        generator: {
          filename: 'font/[name][ext]'
        }
      },
      {
        test: /\.(png|svg)$/,
        include: path.resolve(__dirname, 'src/img'),
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.(ogg|mp3)$/,
        include: path.resolve(__dirname, 'src/music'),
        type: 'asset/resource',
        generator: {
          filename: 'music/[name][ext]'
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "css/index.css"
    }),
  ]
};