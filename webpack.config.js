/*
* @Author: eredaryy
* @Date:   2017-10-22 15:21:13
* @Last Modified by:   eredaryy
* @Last Modified time: 2017-10-24 22:32:29
*/

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title){
    return {
            template: './src/view/'+name+'.html',
            filename:'view/'+name+'.html',
            inject:true,
            hash:true,
            chunks:['common',name]
    }
}
var config = {
    entry: {
        'common' : ['./src/page/common/index.js'],
        'index'  : ['./src/page/index/index.js'],
        'login'  : ['./src/page/login/index.js']
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery' : 'window.jquery'
    },
    module:{
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' }
        ]
    },
    plugins: [
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        //把css单独打包到文件
        new ExtractTextPlugin("css/[name].css"),
        //html文档的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};

module.exports = config