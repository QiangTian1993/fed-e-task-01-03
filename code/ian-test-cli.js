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
		// 模板目标
		const tmpDir = path.join(__dirname, 'templates')
		// 目标目录
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
