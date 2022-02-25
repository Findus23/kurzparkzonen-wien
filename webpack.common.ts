import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

if (!process.env.API_KEY) {
    console.error("no api key specified");
}

let production = process.env.NODE_ENV === "production"

const config: webpack.Configuration = {
    entry: "./src/index.ts",
    output: {
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        crossOriginLoading: "anonymous"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.ejs",
        }),
        // new webpack.IgnorePlugin(/^jquery/),
        new webpack.DefinePlugin({
            "process.env": {
                API_KEY: '"' + process.env.API_KEY + '"'
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "targets": {
                                        "browsers": [">1% in AT"]
                                    }
                                }
                            ]
                        ],
                        "plugins": ["syntax-dynamic-import"]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    !production
                      ? "style-loader"
                      : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require("autoprefixer")()]
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: (production ? [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ] : [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ])
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset'
            },
            {
                test: /\.ejs$/,
                loader: "ejs-webpack-loader"
            }
        ]
    }
};

export default config;
