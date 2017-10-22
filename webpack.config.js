/*
* @Author: eredaryy
* @Date:   2017-10-22 15:21:13
* @Last Modified by:   eredaryy
* @Last Modified time: 2017-10-22 17:17:27
*/

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
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
    ]
};

module.exports = config