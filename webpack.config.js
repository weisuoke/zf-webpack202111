const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

console.log(process.env.NODE_ENV)
module.exports = (env) => {
  return {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    // 指定项目打包的入口
    entry: '/src/index.js',
    output: {
      // 指定输出的目录，默认是 dist 目录，目录的配置必须是一个绝对路径
      path: path.resolve(__dirname, 'dist'),
      // 指定的是文件名，默认是 main.js
      filename: "main.js"
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
  }
}