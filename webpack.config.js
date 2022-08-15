const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

module.exports = {
  cache: false,
  entry: './src/App.ts',
  output: {
    //path: path.resolve(__dirname, './build/webpack/'),
    path: path.resolve(__dirname, '../hc-back/dist/public/'),
    filename: 'static/js/[name].[fullhash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        include: /src/
      },
      {
        test: /\.d.ts?$/,
        use: 'ts-loader',
        include: /src/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.d.ts' ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery/src/jquery'
      //jQuery: 'jquery/src/jquery'
    }),
    new CleanWebpackPlugin({
      verbose: true
    }),
    new CopyWebpackPlugin({
      patterns : [
        { from: 'public/manifest.json', to: './' },
        { from: 'src/static', to: 'static/' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[fullhash].bundle.css'
    }),
    new HtmlWebpackPlugin({
      title: 'Home Control',
      template: "public/index.html",
      favicon: "public/favicon.ico",
      templateParameters: {
        title: "Home Control"
      }
    }),
    new webpack.DefinePlugin({
      "process.env.DEFA": JSON.stringify("aCoolValue"),
      "process.env.ServerURL": JSON.stringify("/"),
      "process.env.SiteTitle": JSON.stringify("Home Control"),
      "process.env.SiteTitleShort": JSON.stringify("HC")
    })
  ]
};