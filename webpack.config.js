const path = require('path');

const APP_PATH = path.join(__dirname, 'app');
const JS_PATH = path.join(APP_PATH, 'js');

module.exports = {
  entry: path.join(JS_PATH, 'index.tsx'),
  output: {
    path: path.join(APP_PATH, 'dist'),
    filename: '36-square.js'
  },

  devtool: 'source-map',

  resolve: {
    extensions: [ '', '.ts', '.tsx', '.js' ]
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ],

    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
};