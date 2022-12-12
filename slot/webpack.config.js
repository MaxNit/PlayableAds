var path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resources } = require("./src/scripts/core/ResourceLoader");

const resourses = resources();

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    devtool: "eval-source-map",
    devServer: {
        open: true,
        static: {
            directory: path.join(__dirname, './'),
        },
        compress: true,
        port: 8080,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: ['base64-inline-loader'],
            },
            {
                test: /\.(mp3|mp4)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            encoding: true,
                        },
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        inject: true,
        resourses,
        template: __dirname + "/index.html",
    })]
};