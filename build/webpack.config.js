const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin") //独立打包css文件插件 

const htmlPlugin = new HtmlWebpackPlugin({  
    // template: path.join(__dirname,'../template/index.html'),//模板文件  
    filename: 'index.html'//生成文件名  
});  

// const cssPlugin = new MiniCssExtractPlugin({//选项与htmlPlugin类似  
//     filename: "index.css"  
// });

//向外暴露一个配置对象，commonjs规范（因为webpack是基于node构建）  
//webpack默认只能打包处理.js后缀的文件，像.jpg .vue等文件无法主动处理，所以需要配置第三方loader 
module.exports = {
    //webpack打包出来的内容使用在什么环境下
    // target: 'node',
    mode: 'development', //development  production ( 生产环境会将代码压缩 )

    //在webpack4中有一大特性是约定大于配置，默认打包入口路径是'src/index.js'，打包输出路径是'dist/main.js' 
    plugins: [  
        htmlPlugin
    ],  
    //应用入口
    entry: {
        app: path.join(__dirname, '../src/index.js')  // app.js作为打包的入口
    },

    //配置loader
    module: {
        rules: [  
            {  
                test: /\.(js|jsx)$/,  
                use: 'babel-loader',  
                exclude: /node_modules/ // 在使用babel-loader时候一定要加上exclude,排除node_modules文件夹   
            },  
            // 解析css文件    
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                use: [{
                     loader: "style-loader" // creates style nodes from JS strings
                 }, {
                     loader: "css-loader" // translates CSS into CommonJS
                 }, {
                     loader: "less-loader" // compiles Less to CSS
                 }]
            },
            {
                test:/\.(sass|scss)$/,
                use:['style-loader','css-loader','sass-loader']
            }
        ]  
    }
}