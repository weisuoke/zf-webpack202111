const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  // 指定项目打包的入口
  entry: '/src/index.js',
  output: {
    // 指定输出的目录，默认是 dist 目录，目录的配置必须是一个绝对路径
    path: path.resolve(__dirname, 'dist'),
    // 指定的是文件名，默认是 main.js
    filename: "main.js"
  },
  devtool: false,
  devServer: {
    port: 8080, // 配置开发预览服务器的端口号 8080
    open: true, // 打包后会自动打开浏览器
    proxy: {
      // 把访问路径是以 /api 开头的请求都转发到 3000
      '/api': {
        target: 'http://localhost:3000',  // 重定向的域名
        pathRewrite: {  // 重写的路径
          "^/api": ""
        }
      }
    },
    // 在webpack-dev-server 静态资源中间件处理之前，可以用于拦截部分请求返回特定内容，以实现简单的 mock
    onBeforeSetupMiddleware({ app }) {
      app.get('/api/users2', (req, res) => {
        res.json([{ id: 1, name: "张三" }, {id: 2, name: "李四"}])
      })
    }
  },
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },
  // 如果你配置了 external, key 是库的名字，值是全局变量名
  // 以后你再引入这个库的时候，直接从全局变量名上取值即可
  externals: {
    lodash: '_'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              url: true, // 启用/禁用url解析
              import: true,  // 是否允许或者说禁用@import语法处理
              modules: false,  // 是否允许css模块化
              sourceMap: true,  // 是否生成sourcemap
              importLoaders: 0, // 放在CSS兼容性的时候演示
              esModule: true, // 默认情况下，css-loader生成使用ES_Module的模块对象，如果设置成false的话，不包装成ESModules
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|bmp|gif)/,
        type: 'asset/resource',
        generator: {
          filename: '[hash][ext]'
        }
      },
      {
        test: /isarray/,
        use: [
          {
            loader: "expose-loader",
            options: {
              exposes: {
                globalName: 'isarray',
                override: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new webpack.DefinePlugin({
    }),
    // new webpack.ProvidePlugin({
    //   isarray: "isarray"
    // })
  ]
}

//
// module.exports = (env) => {
//   return {
//     mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
//     // 指定项目打包的入口
//     entry: '/src/index.js',
//     output: {
//       // 指定输出的目录，默认是 dist 目录，目录的配置必须是一个绝对路径
//       path: path.resolve(__dirname, 'dist'),
//       // 指定的是文件名，默认是 main.js
//       filename: "main.js"
//     },
//     devtool: 'source-map',
//     module: {
//       rules: [
//         {
//           test: /\.css$/,
//           use: ['style-loader', 'css-loader']
//         }
//       ]
//     },
//     plugins: [
//       new HtmlWebpackPlugin({
//         template: "./src/index.html"
//       }),
//       new webpack.DefinePlugin({
//         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
//       })
//     ]
//   }
// }