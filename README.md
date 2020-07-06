# 简答题

1.  webpack 的构建流程主要有哪些环节？如果可以请尽可能详细的描述 webpack 打包的整个过程？

答：webpack 的构建流程主要通过 loaders 和 plugins 来完成。 webpack 构建过程必须要有一个入口文件，入口文件默认是更目 src 下的 index.js，也可以在 webpack.config.js 中通过配置 entry 属性来之定义打包入口文件， 如果需要多入口打包 entry 属性还可以是一个数组。webpack 打包输出目录默认是 dist，也可以通过配置 output 属性更改。webpack 构建过程中可以通过使用 loader 将 css、scss、js 编译成通用语言插入到 js 文件中。比如如果需要编译 css 就需要 css-loader 与 style-loader, css-loader 负责将 css 编译成 js 代码，style-loader 负责将 css 以 style 标签的形式插入到 html 中。如果需要编译 js 需要使用 babel-loader 将代码中的使用的高级语法转换成通用语法。 图片文件我们就可以使用 url-loader 会 fail-loader。最后还可以通过 plugins 来生成 html 模板与启动一个 server 服务器

2. Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路

答：loader 是负责  转译文件的而 plugin 是用来扩展 webpack 功能的。 开发一个 loader 其实就是编写一个函数，不过需要注意的是 loader 函数返回的需要是一个 JavaScript 代码或字符串，如果返回的是字符串就需要与其他 loader 搭配使用。开发一个 plugin, 需要利用到 webpack 提供的钩子函数，plugin 必须是一个函数或者一个有 apply 方法的对象
