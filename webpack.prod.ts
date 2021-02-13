import * as webpack from "webpack";
import merge from "webpack-merge";
import common from './webpack.common';
import {LicenseWebpackPlugin} from "license-webpack-plugin";
import { SubresourceIntegrityPlugin } from 'webpack-subresource-integrity';
import CopyWebpackPlugin from "copy-webpack-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";


const config: webpack.Configuration = merge(common, {
    mode: "production",
    optimization: {
        splitChunks: {
            name: "commons"
        },
        minimize: true,
        moduleIds: "deterministic"
    },
    devtool: "source-map",
    plugins: [
        new SubresourceIntegrityPlugin(),
        new LicenseWebpackPlugin({
            // perChunkOutput: false
        }) as any,
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({patterns: [{from: "icon", to: "icon"}]}),
        new CopyWebpackPlugin({patterns: [{from: "licenses.txt", to: "licenses.txt"}]}),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        })
    ]
})

export default config
