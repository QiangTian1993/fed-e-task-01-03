---
title: webpack 基础
date: 2020-06-18
tags:
  - webpack
categories:
  - 前端工程化
---

webpack 是 js 的静态模块打包工具, webpack 借助不同的 loader 就可以加载任何类型的资源

<!-- more -->

# webpack 入门

## 起步

1. 安装 webpack

```zsh
yarn add webpack --dev
```

如果是 4.0 以上的版本还需要安装 webpack-cli

```zsh
yarn add webpack webpack-cli  --dev
```

2. 配置 webpack.config.js 文件

```js
// webpack-config.js
const path = require('path')

module.exports = {
	// 定义入口文件
	entry: './src/index.js',
	// 定义打包后的输出目录为 dist ,文件名为 index.js
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
}
```

入口文件支持多个

```js
// webpack-config.js
const path = require('path')

module.exports = {
	// 定义入口文件
	entry: {
		index: './src/index.js',
		print: './src/print.js',
	},
	// 定义打包后的输出目录为 dist ,文件名为 index.js
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
}
```

3. 编译 css 文件

安装 css-loader 将 css 编译成 js, style-loader 将 css 插入到 head 的 style 标签中

:::tip
loader 默认是从右往左一次执行
:::

```zsh
yarn add css-loader style-loader --dev
```

```js
// webpack-config.js
const path = require('path')

module.exports = {
	// 定义入口文件
	entry: './src/index.js',
	// 定义打包后的输出目录为 dist ,文件名为 index.js
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
	module: {
		// loader 写在 module.rules 下
		rules: [
			{
				// test 属性的值为需要编译的文件，这里是以 .css 结尾的文件
				test: /\.css$/,
				// use 属性告诉编译器在打包前将 .css 文件用 ‘style-loader’和‘css-loader’ 编译下
				use: ['style-loader', 'css-loader'],
			},
		],
	},
}
```

4. 安装 html-webpack-plugin
   `html-webpack-plugin` 生成 HTML 文件

```js
// webpack-config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	// 定义入口文件
	entry: './src/index.js',
	// 定义打包后的输出目录为 dist ,文件名为 index.js
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
	module: {
		// loader 写在 module.rules 下
		rules: [
			{
				// test 属性的值为需要编译的文件，这里是以 .css 结尾的文件
				test: /\.css$/,
				// use 属性告诉编译器在打包前将 .css 文件用 ‘style-loader’和‘css-loader’ 编译下
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	// plugin 都写在 plugins 属性下，它接收一个对象
	plugins: [
		// 将 src 下面的 index.html 打包到 dist目录 下
		new HtmlWebpackPlugin({ template: './src/index.html' }),
	],
}
```

5. 接下还可以安装一个 web server 插件 `webpack-dev-server`

```zsh
yarn add webpack-dev-server -D
```

配置下 webpack.config.js

```js
// webpack-config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	// 定义入口文件
	entry: './src/index.js',
	// 定义 server 服务
	devServer: {
		// 目标文件是 dist 文件下的 index.html
		contentBase: './dist',
	},
	// 定义打包后的输出目录为 dist ,文件名为 index.js
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
	module: {
		// loader 写在 module.rules 下
		rules: [
			{
				// test 属性的值为需要编译的文件，这里是以 .css 结尾的文件
				test: /\.css$/,
				// use 属性告诉编译器在打包前将 .css 文件用 ‘style-loader’和‘css-loader’ 编译下
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	// plugin 都写在 plugins 属性下，它接收一个对象
	plugins: [
		// 将 src 下面的 index.html 打包到 dist目录 下
		new HtmlWebpackPlugin({ template: './src/index.html' }),
	],
}
```

6. 编译 JS

babel loader 可以将 js 新特性编译成通用语法

```
yarn add babel-loader @babel/core @babel/preset-env --dev
```

新建`.babelrc`

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {},
        "useBuiltIns": "usage", //可选项 false 只做了语法转换; entry 引入了所有的es扩展包;usage自动检测代码，动态引入模块
        "corejs": 3 // 可选项 false 只对ES语法进行了转换； 2 不污染全局空间；3 实例化方法，同时不污染变量
      }
    ]
  ]
}

```

或

```js
// webpack-config.js
const path = require('path')

module.exports = {
	// 定义入口文件
	entry: './src/index.js',
	// 定义打包后的输出目录为 dist ,文件名为 index.js
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
	module: {
		// loader 写在 module.rules 下
		rules: [
			{
				// test 属性的值为需要编译的文件，这里是以 .css 结尾的文件
				test: /\.css$/,
				// use 属性告诉编译器在打包前将 .css 文件用 ‘style-loader’和‘css-loader’ 编译下
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.js$/
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		],
	},
}
```

:::tip
这里需要注意老版本的 babel 中 @babel/preset-env 会将 esModules 转换为 commonjs, 这样 Tree Sharing 就可能不会生效。这是后可以给 @babel/preset-env 添加配置

<template>
<details>
<summary>详情</summary>

```js
module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
					presets: [
						['@babel/preset-env',{ modules: 'commonjs' }]
					]
				}
			}
		]
	}
}
```

</details>
</template>
:::

7. 编写 script 脚本

```js
// package.json

{
    ...
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      //执行 yarn run build 就可以打包
      "build": "webpack",
      // 执行 yarn run watch 进入观察者模式，这样就不用总是 执行 build 命令了
      "watch": "webpack --watch",
      // 执行 yarn run start 开启 web server
      // --open 可以自动打开浏览器
      // --port 可以指定端口号
      // --hot 热更新
      "start": "webpack-dev-server --open --port 8081"
    },
    ...
}
```

## 常用 loader

1. css-loader

   > 解析 css 文件

```
npm install css-loader -D
```

2. style-loader
   > 将解析后的 css 文件挂载到 html 中

```
npm install css-loader -D
```

```js
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					{
						loader: "style-loader",
						options: {
							injectType: "linkTag", // 转换成 link 的形式插入
							insert: "head",
						},
					},
					{ loader: "file-loader" },
				],
			},
		],
	},
```

3. babel-loader
   > 转译 js 文件

```
npm install babel-loader @babel/core @babel/preset-env -D
```

```js
module: {
	rules: [
		{
			test: /\.js$/i,
			exclude: /(node_modules|bower_components)/,
			use: [
				{
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: ["@babel/plugin-transform-runtime"],
					},
				},
			],
		},
	],
},
```

4. file-loader

> 解析图片资源、字体等

```js
module: {
	rules: [
		{
			test: /\.(png|jpg|jpeg|gjf)$/,
			use: 'file-loader'
		},
	],
},
```

5. url-loader

> 将图片转换为 data:url

```js
module: {
	rules: [
		{
			test: /\.(png|jpg|jpeg|gjf)$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 10 * 1024 // 超过 10KB 后任然使用 file-loader 处理
				}
			}
		},
	],
},


```

:::tip
url-loader 会将超出范围的文件继续交给 file-loader 处理，所以安装 url-loader 后还必须的 安装 file-loader
:::

## 常用加载器类型

常用的 loader 可以分为几种类型

- 编译转换类 css-loader, babel
- 文件操作类 file-loader, url-loader
- 代码检查类 eslint

## 开发自己的 loader

loader 需要导出一个函数，这个函数的返回结果需要可以是 JavaScript 代码，可以一是字符串

导出 js 代码

```js
const marked = require('marked')

module.exports = source => {
	const html = marked(source)
	return `module.default = ${JSON.stringify(html)}`
}
```

导出字符串，当导出字符串时需要要其他 loader 来处理返回的字符串

```js
// loaders/md-loader
const marked = require('marked')

module.exports = source => {
	const html = marked(source)
	return html
}
```

```js
// webpack.config.js
module.exports = {
	module: {
		rules: [
			{
				test: /\.md$/,
				use: ['html-loader', './loaders/md-loader'],
			},
		],
	},
}
```

## webpack 生产环境优化

在开发环境中有很多配置是为了开发效率并没有开启，但是生产环境需要开启。这是时候可以使用 mode 属性

```js
module.exports = (env, argv) => {
	const config = {
		/* webpack 配置 */
	}

	if (env === 'production') {
		config.mode = 'production'
		config.devtool = 'none'
		config.plugins = [
			...config.plugins,
			new CleanWebpackPlugin(),
			new CopyWebpackPlugin(['public']),
		]
	}

	return config
}
```

通过判断环境名参数返回不同的配置，只适用于中下型项目，因为项目负责后配置文件会变得相对复杂。这时候我们可以为不同环境新建不同的配置文件

:::tip
我们可以使用 webpack-merge, 合并配置
使用这种方式脚本文件中需要加入 --config 的参数

```js
"scripts": {
	"build": "webpack --config webpack.prod.js"
}
```

:::

```js
// webpack.prod.js
const common = require('./webpack.common') // 通用配置
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
	mode: 'production'
	plugins: [
		new CleanWebpackPlugin()
		new CopyWebpackPlugin(['public'])
	]
})
```

## tree-shaking

`tree-shaking` 意思是去除代码中未引用的代码，在 webpack 中生产模式下回自动开启 `tree-shaking`

如果想在其他模式下开启 `tree-shaking` 需要配置 webpack 中的 `optimization` 属性

```js
module.exports = {
	mode: 'none',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
	},
	optimization: {
		usedExports: true,
		minimize: true,
		concatenateModules: true, // 将所有模块放到一个函数中进行导出
	},
}
```

## sideEffects

在 webpack4 中新加入了 `sideEffects` , 它可以用来标识我们的代码中是否有副作用（除了导出是否还做了其他事情）, 如果 `sideEffects` 标识为 false
表示我们代码有没有副作用，这样模块中副作用代码就会被 `tree-shaking`

先在 webpack 中开启 sideEffects

```js
// webpack.config.js
module.exports = {
	mode: 'none',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
	},
	optimization: {
		sideEffects: true,
	},
}
```

然后在 package.json 中声明 `sideEffects` 为 false 表示当前项目没有副作用

```json
// package.json
{
	"sideEffects": false
}
```

## 代码分割

因为 webpack 会将所有的代码全部打包到一个 js 文件中，如果项目很大最后打包出的 js 文件就会很大。其实程序在开始工作时并不是每个模块都需要启动的时候加载，那如何实现按需加载呢？

有两种方式可以实现按需加载

- 多入口打包
- 动态导入

多入口打包

假如我们项目结构如下

```
|-- src
|--|--| album.css
|--|--| album.html
|--|--| album.js
|--|--| fetch.js
|--|--| index.css
|--|--| index.html
|--|--| index.js
|-- webpack.config.js
|-- package.json
```

```js
module.exports = {
	entry: {
		index: './src/index.js',
		album: './src/album.js',
	},
	output: {
		filename: '[name].bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/album.js',
			chunks: ['album'],
		}),
		new HtmlWebpackPlugin({
			template: './src/index.js',
			chunks: ['index'],
		}),
	],
}
```

## 提取公共代码

多入口打包存在一个问题，如果多个模块使用了同一个模块怎么弄呢？
这时候我们可以利用 webpack 提供到的 splitChunks 将公共代码单独提取到一个模块中,

```js
module.exports = {
	entry: {
		index: './src/index.js',
		album: './src/album.js',
	},
	output: {
		filename: '[name].bundle.js',
	},
	optimization: {
		splitChunks: {
			chunks: 'all' // 将所有的公共代码提取到一个模块中
		}
	}
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/album.js',
			chunks: ['album'],
		}),
		new HtmlWebpackPlugin({
			template: './src/index.js',
			chunks: ['index'],
		}),
	],
}
```

## 动态导入

```js
if(/**/){
	import('./post/post').then(({ default: post })=>{
		/**/
	})
}else if(/**/){
	import('./album/album').then(({ default: album })=>{
		/**/
	})
}
```

## MiniCssExtractPlugin

之前我们可以使用 css-loader 和 style-loader 将 css 转换为 js 再通过 style 标签的方式插入到 html 中
现在可以使用插件 `MiniCssExtractPlugin` 单独提取 css 文件以 link 的方式插入 html

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js'
	output: {
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: {
					loader: [MiniCssExtractPlugin.loader,'css-loader']
				}
			}
		]
	},
	plugins: [new HtmlWebpackPlugin(), new MiniCssExtractPlugin()]
}
```

## OptimizeCssAssetsWebpackPlugin

插件 `OptimizeCssAssetsWebpackPlugin` 可以对 css 文件进行压缩

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
	entry: './src/index.js'
	output: {
		filename: 'bundle.js' // 添加 hash
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: {
					loader: [MiniCssExtractPlugin.loader,'css-loader']
				}
			}
		]
	},
	plugins: [new HtmlWebpackPlugin(), new MiniCssExtractPlugin(), new OptimizeCssAssetsWebpackPlugin()]
}
```

## 输出文件 hash

前端静态文件一般会设置缓存，如果缓存时间过长资源文件更新后，因为有缓存页面静态资源并不会更新。这时候我们可以为文件名添加 hash，

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
	entry: './src/index.js'
	output: {
		filename: '[contenthash:8].bundle.js' // 添加 hash
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: {
					loader: [MiniCssExtractPlugin.loader,'css-loader']
				}
			}
		]
	},
	plugins: [new HtmlWebpackPlugin(), new MiniCssExtractPlugin({
		filename: '[name]-[contenthash:8].css'
	}), new OptimizeCssAssetsWebpackPlugin()]
}
```

hash 分为几种类型

- hash
- chunkhash
- contenthash

`contenthash` 当文件发生变化 hash 就会发生变化
