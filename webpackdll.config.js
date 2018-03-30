const webpack = require("webpack");
const path = require("path");
const loaderConfig = require("./loader.config.js")

module.exports = {
    resolve: {
        extensions: [".js", ".css"]

    },
    entry: {
        dll: ["vue"] //进行缓存的文件
    },
    output: {
        path: path.join(__dirname, "js"),
        filename: "MyDll.[name].js",
        library: "[name]_[hash]" // 这里跟 webpack.DllPlugin 里的 name 保持一致
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "js", "[name]-manifest.json"),
            name: "[name]_[hash]" //path 是 manifest.json 文件的输出路径，这个文件会用于后续的业务代码打包；
            //name 是 dll 暴露的对象名，要跟 output.library 保持一致；
            //context 是解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致。    
        }),
    ],
    module: {
        loaders: loaderConfig
    }
}