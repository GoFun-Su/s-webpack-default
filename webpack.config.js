 const path = require('path');
 var webpack = require("webpack")
 const HtmlWebpackPlugin = require('html-webpack-plugin')
 const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const loaderConfig = require("./loader.config.js")

 module.exports = {
     entry: {
         	index: './src/main.js'
     },
     output: {
         	filename: "[name].[hash].bundle.js",
         	path: path.resolve(__dirname, 'dist')
     },
    devServer: {
                    hot: true,
                    contentBase: './dist',
                    port : '8085', //设置默认监听端口，如果省略，默认为”8080“
                    inline : true //设置为true，当源文件改变时会自动刷新页面
    },
     devtool: "cheap-eval-source-map",
     module: {
        loaders : loaderConfig
     },
     plugins: [
        // new CleanWebpackPlugin(['dist']),
         new HtmlWebpackPlugin({//输出html
			title: 'index',
			filename: 'index.html',
			template: path.resolve("./test.html"),//模板
			cache: true,
			inject: true,
                                chunks: ['vendor', 'manifest', 'index']
			
		}),
     	new webpack.DefinePlugin({
		'process.env': '"production"' 
	}),
         new webpack.optimize.UglifyJsPlugin(),//对js进行压缩
         new webpack.HotModuleReplacementPlugin(),//热加载
         new webpack.DllReferencePlugin({
                     context: path.join(__dirname, "..", "dll"),  // 这里要和 dll.config.js 中 webpack.DllPlugin 配置的 context 一致
                      manifest: require("./js/dll-manifest.json")      //context 需要跟之前保持一致，这个用来指导 Webpack 匹配 manifest.json 中库的路径；
                                                                                //manifest 用来引入刚才输出的 manifest.json 文件。  
        }),
       new webpack.optimize.CommonsChunkPlugin({
                     name: 'vendor',
                    minChunks: function(module){//最小引用次数
                                 return module.context && module.context.indexOf('node_modules') !== -1;
                        }
         }),
         new webpack.optimize.CommonsChunkPlugin({ //默认会把所有入口节点的公共代码提取出来,生成一个manifest.js
                     name: 'manifest'
        }),
         new webpack.LoaderOptionsPlugin({ //加前缀
              // options: {
              //    postcss: function () {
              //       return [precss, autoprefixer];
              //     }
              // },
               
        }),

         new ExtractTextPlugin({ //将css模块抽离出来
            filename: '[name].css',
            allChunks: true
        })
        

     ],
     resolve: {//解析
	   extensions: ['.js', '.vue', '.css'] //后缀不需要加，比如以后在写hello.vue的时候不需要加.vue，只用hello就可以
	}
 };