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

## webpack-dev-server 开发服务器原理

- 也是会用 webpack 从入口文件进行打包，然后输出到输出目录，这个输出是输出到内存文件系统里去了
- 然后会启动一个 http 服务器，去预览我们的项目

less 用于把 less 编译成 CSS
less-loader
node-sass 用于把 sass 编译成 CSS
sass-loader

为了引入 node_modules 下面的资源文件，可以添加 `~`前缀

### css兼容性

postcss
postcss-loader

- css-loader中的options配置项`importLoaders`
  - `importLoaders` 允许或者说启用几个数量的`loaders`应用在import的文件

### 图片资源加载

- webpack4 关于图片需要 使用 file-loader url-loader
- webpack5 不再需要 
  - file-loader => asset/resource 把图片拷贝到输出目录里去，返回一个输出后的路径，包括文件
  - url-loader => asset/inline 不拷贝文件，直接把源文件变成 base64 字符串。内嵌到输出结果。

## 加载第三方库
1. 直接引入
   - 每次使用都需要手工导入
2. 插件引入
   - 如果使用 `webpack.Provide` 插件引入的话，则不再需要你在模块手工引入。
   - 缺点：
     - 不会放到全局变量上，模块外是无法访问的。
     - 如果想再任何地方访问变量，需要把此变量设置为环境变量 `window.isarray`
3. expose-loader 可以把模块添加到全局对象上
以上三种方式，都需要打包库的代码，不能使用 CDN
   