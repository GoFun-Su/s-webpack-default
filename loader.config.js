const ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = [{
        test: /\.vue/,
        loader: "vue-loader"
    },
    {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
    },
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true, //css压缩
                        importLoaders: 1,
                        　　　　　　　　　　　modules: true
                    }
                },
                {
                    loader: "postcss-loader",
                    options: { // 如果没有options这个选项将会报错 No PostCSS Config found
                        plugins: (loader) => [
                            require('autoprefixer')(), //CSS浏览器兼容
                        ]
                    }
                }
            ]
        })
    },
    {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true, //css压缩
                        importLoaders: 1,
                        　　　　　　　　　　　modules: true
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        minimize: true, //css压缩
                        importLoaders: 1,
                        　　　　　　　　　　　modules: true
                    }
                },
                {
                    loader: "postcss-loader",
                    options: { // 如果没有options这个选项将会报错 No PostCSS Config found
                        plugins: (loader) => [
                            require('autoprefixer')(), //CSS浏览器兼容
                        ]
                    }
                }
            ]

        })
    },
    {
        test: /\.(png|jpe?g|gif|svg|woff2|woff|svg|eot|ttf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000
        }
    }
]