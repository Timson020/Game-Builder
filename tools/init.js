// import
import fs from 'fs'
// import path from 'path'

const { process } = global

// cmd arguments
const argvs = process.argv

// folder path
const root_path = __dirname.split('tools')[0]

// file path
// const indexJS = `${root_path}index.js`
// const packageJSON = `${root_path}package.json`
const md_path = `${root_path}README.md`

const appName = argvs[2]

// function for rename the app
function rename(name, reg, path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach((file) => {
			const curPath = `${path}/${file}`
			if (fs.statSync(curPath).isFile()) {
				const contents = fs.readFileSync(curPath).toString()
				const newContents = contents.replace(reg, name)
				fs.writeFileSync(curPath, newContents)
			}
		})
	}
}

// start
function start() {
	const new_root_path = root_path.replace(/Game-Builder/ig, appName)
	// file rename
	rename(appName, /{{Game-Builder}}/g, md_path)
	rename(appName, /{{快速搭建活动类 小游戏类型的H5}}/g, md_path)

	fs.renameSync(`${root_path}`, `${new_root_path}`)

	console.info('\x1B[36m', '----- file rename is complete -----')

	console.info('\x1B[32m', '----- success, It is all complete -----')
	console.info('\x1B[33m', '***** please run step by step on cmd *****')
	console.info('\x1B[40m\x1B[90m%s\x1B[39m\x1B[49m', `>>>>>>> cd ./${appName}`)
	console.info('\x1B[40m\x1B[90m%s\x1B[39m\x1B[49m', '>>>>>>> npm i && npm run release && npm run dev')
}

start()
