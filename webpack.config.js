const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { DefinePlugin } = require('webpack');

const targetStr = process.env['ZXSHEETS_TARGET'] === 'electron' ? 'electron' : 'web';


const definePlugin = new DefinePlugin({
  ZXSHEETS_PLATFORM: JSON.stringify(targetStr)
});

/**
 * Webpack config.
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'development',
  entry: './src/entry/main.ts',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /\.test\.ts/]
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[path][name]-[local]-[hash:base64]'
            },
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 1024 * 8
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'zxsheets.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/entry/index.html"
    }),
    definePlugin
  ]
};


module.exports = config;