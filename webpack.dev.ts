import * as webpack from "webpack";
import {Configuration} from "webpack";
import merge from "webpack-merge";
import common from './webpack.common';

const config: Configuration = merge(common, {
    mode: "development",
    devtool: "eval-cheap-source-map",
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        port: 8087
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]

} as Configuration)

export default config
console.log("http://localhost:8087/")
