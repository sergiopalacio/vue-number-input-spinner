const webpack = require('webpack');
const config = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');


config.mode = 'production';
config.output.filename = 'vue-number-input-spinner.min.js';
config.output.libraryTarget = 'umd';
config.output.library = 'NumberInputSpinner';
config.optimization = {
  minimize: true,
  minimizer: [new TerserPlugin()],
};

config.entry = path.resolve(__dirname, '../src/components/NumberInputSpinner.vue');

config.devtool = '#source-map';

config.module.rules.push({
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        mode: 'production',
        // you can specify a publicPath here
        // by default it uses publicPath in webpackOptions.output
        hmr: process.env.NODE_ENV === 'development',
      },
    },
    'css-loader',
  ]
});

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),

  new MiniCssExtractPlugin({
    filename: 'vue-number-input-spinner.min.css',
    chunkFilename: 'test-chunk.css'
  }),

  new webpack.optimize.OccurrenceOrderPlugin(),
]);

module.exports = config;
