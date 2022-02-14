const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
    mode: 'development',
    entry: {
        main: './src/entry/main.ts',
        dialog: './src/entry/dialog.tsx'
    },
    target: 'electron-renderer',
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
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: "./src/entry/index.html",
            chunks: ['manifest', 'vendor', 'main']
        }),
        new HtmlWebpackPlugin({
            filename: 'dialog.html',
            template: "./src/entry/dialog.html",
            chunks: ['manifest', 'vendor', 'dialog']
        })
    ]
};

module.exports = config;