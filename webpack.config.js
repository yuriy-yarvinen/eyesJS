const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoader()
      },
    ]
	},
	plugins: [
		new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/index.html'),
        to: path.resolve(__dirname, 'dist/index.html')
      }]
    }),  
  ]
};