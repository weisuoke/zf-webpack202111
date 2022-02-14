## 核心概念

- webpack默认配置文件是 `webpack.config.js`
- 入口 指示 webpack 应该从哪个文件开始打包，用来作为内部依赖的图构建的起点。
  - 在 webpack5 里，如果没有额外配置的话，入口文件就是 `src\index.js`
- loader
  - webpack默认情况下只能处理和理解 javascript 和 json 文件
  - 如果要想引入其它类型的文件，比如css，需要对源文件进行加载和转换，转成JS
  - 比如说处理 css 文件 ['style-loader', 'css-loader']，从右向左执行的
    1. 先读取源文件 `index.css`
    2. 把文件内容传递给 css-loader，css-loader 可以处理css中的@import和url语法，处理完之后会把内容传递给style-loader
    3. style-loader的作用是把CSS转换成style标签插入页面中
- 插件 插件可以执行范围更广的任务
- mode 代表当前编译的环境
  - none 未指定
  - production 生产环境 webpack 会针对构建结果进行生成环境的优化。
  - development 开发环境 webpack不会对代码压缩
  - 日常项目开发中，我们会有两套环境
  - 一套是开发环境 用于开发时使用，构建结果用于本地的开发调试，不压缩代码，打印日志，包含 sourcemap 文件
  - 一套是构建后直接上线的，代码一般都是压缩后，不打印 LOG，静态文件不包含 sourcemap
  - webpack4 之后引入 mode 概念
  - mode 中的优先级
    - 高：package.json 中 --mode 的配置
    - 中：配置文件 `webpack.config.js` 里的 mode
    - 低：默认优先级
- 如何动态设置不同的环境
  - --mode用来设置模块内的process.env.NODE_ENV
  - --env用来设置webpack配置文件的函数参数
  - cross-env用来设置node环境的process.env.NODE_ENV
  - DefinePlugin用来设置模块内的全局变量