const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }
  if (isProd) {
    config.minimize = true,
      config.minimizer = [
        new OptimizeCssAssetPlugin(),
        new TerserWebpackPlugin()
      ]
  }
  return config;
}

const babelOptions = () => {

  const babelOptions = {
    presets: [
      '@babel/preset-env',
    ]
  };

  return babelOptions;
};


const jsLoader = () => {
  const loaders = 
  [
    {
      loader: 'babel-loader',
      options: babelOptions()
    }
  ]

  return loaders;
}


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    eyes: [ './index.js']
  },
  // watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
  },
  // выносит скрипты которые были подключены в разные точки входа, на примере jquery
  optimization: optimization(),
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoader()
      },
    ]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
      template: './index.html',
      cache: false
    })
	]
};