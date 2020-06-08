# 简答题

## 问题一

谈谈你对工程化的初步认识，结合你之前遇到的问题说出三个以上工程化能够解决的问题或者带来的价值

答：

前端工程化能够增加工作效率，降低工作成本。

- 可以使用工程化帮我们把高级语法转译，比如通过 babel 将 es6+ 语法转译成 e5，将 scss、less 转译成 css
- 可以帮我们解决一些手动操作的体力活，比如 代码压缩、部署等
- 还可以帮我们解决一些重复性、机械性工作

## 问题二

你认为脚手架除了为我们创建项目结构，还有什么更深对的意义

答：

脚手架工具可以为可以减少开发成本，提高工作效率，还可以约定项目结构和规范

# 编程题

## 问题一

概述脚手架实现过程，

答：

设定预设问题，根据回答结果结合模板文件生成项目结构

```js
#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

inquirer
	.prompt([
		{
			type: 'input',
			name: 'name',
			message: '项目名称:',
		},
		{
			type: 'input',
			name: 'author',
			message: '作者:',
		},
	])
	.then(res => {
		const tmpDir = path.join(__dirname, 'templates')
		const destDir = process.cwd()

		fs.readdir(tmpDir, (err, files) => {
			if (err) throw err

			files.forEach(file => {
				ejs.renderFile(path.join(tmpDir, file), res, (err, result) => {
					if (err) throw err

					fs.writeFileSync(path.join(destDir, file), result)
				})
			})
		})
	})
```
