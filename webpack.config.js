const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
    mode: 'development',
    entry: './src/entry/main.ts',
    target:'electron-renderer',
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
                rules: [
                    {
                        test: /\.css$/,
                        use: ['style-loader', {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                            }
                        }]
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'zxsheet.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/entry/index.html"
        })
    ]
};

module.exports = config;