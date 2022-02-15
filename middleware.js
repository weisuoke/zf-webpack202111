/**
 * 我现在在手写 webpack-dev-server
 */

let express = require('express')
// 得到 app 应用对象
const app = express();
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')
// compiler 就是编译大管家
const compiler = webpack(config)

app.get('/api/users', (req, res) => {
  res.json([
    {id: 1, name: '张三'},
    {id: 2, name: '李四'}
  ])
})

// webpackDevMiddleware 会返回一个中间件
// 中间件负责根据配置文件打包当前的项目并且返回打包后的结果
// 1. 负责打包
// 2. 返回打包后的静态文件 index.html main.js
app.use(webpackDevMiddleware(compiler))

app.listen(3001)