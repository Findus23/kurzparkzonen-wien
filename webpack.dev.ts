import * as webpack from "webpack";
import merge from "webpack-merge";
import path from "path";
import common from './webpack.common';

const config: webpack.Configuration = merge(common, {
    mode: "development",
    devtool: "eval-cheap-source-map",
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        contentBase: path.join(__dirname, 'dist'),

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]

})

export default config
