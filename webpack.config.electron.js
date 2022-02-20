const path = require('path');

/**
 * Webpack config.
 * @type {import('webpack').Configuration}
 */
const mainConfig = {
  mode: 'development',
  entry: './electron/main',
  target: "electron-main",
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /\.test\.ts/]
      },]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'zxsheets.startup.js'
  }
};


/**
 * Config for preload scripts.
 * @type {import('webpack').Configuration}
 */
const preloadConfig = {
  mode: 'development',
  entry: './electron/renderer',
  target: "electron-renderer",
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /\.test\.ts/]
      },]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'zxsheets.preload.js'
  },
};

module.exports = [
  mainConfig,
  preloadConfig
];