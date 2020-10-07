const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
   context: __dirname,
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: '/',
   },
   devServer: {
      historyApiFallback: true
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            use: 'babel-loader',
         },
         {
            test: /\.(png|j?g|svg|gif)?$/,
            use: 'file-loader'
         },
         {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: [
               MiniCssExtractPlugin.loader,
               'css-loader', 'sass-loader'
            ]
         }
      ]
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.resolve(__dirname, 'public/index.html'),
         filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
         filename: "./styles/main.css"
      })
   ]
};