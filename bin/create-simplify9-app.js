#!/usr/bin/env node

import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import inquirer from 'inquirer'

const runCommand = (command) => {
	try {
		execSync(command, { stdio: 'inherit' })
	} catch (error) {
		console.error(`Error executing command: ${command}`, error)
		process.exit(1)
	}
}

const createProject = async () => {
	const { projectType, styling, useRedux, faviconPath, logoPath } = await inquirer.prompt([
		{
			type: 'list',
			name: 'projectType',
			message: 'Select the type of project you want to create:',
			choices: ['React Vite App TS', 'Next App TS'],
		},
		{
			type: 'list',
			name: 'styling',
			message: 'Select the styling you want to use:',
			choices: ['Material UI', 'Tailwind CSS'],
		},
		{
			type: 'confirm',
			name: 'useRedux',
			message: 'Do you need Redux and Redux Toolkit?',
		},
		{
			type: 'input',
			name: 'faviconPath',
			message: 'Enter the path to your favicon file:',
		},
		{
			type: 'input',
			name: 'logoPath',
			message: 'Enter the path to your logo file:',
		}
	])
	
	const projectName = '.'
	switch (projectType) {
		case 'React Vite App JS':
			runCommand(`npm create vite@latest ${projectName} -- --template react`)
			break
		case 'React Vite App TS':
			runCommand(`npm create vite@latest ${projectName} -- --template react-ts`)
			break
		case 'Next App JS':
			runCommand(`npx create-next-app ${projectName}`)
			break
		case 'Next App TS':
			runCommand(`npx create-next-app ${projectName} --ts`)
			break
		default:
			console.error('Unknown project type')
			process.exit(1)
	}
	
	process.chdir(projectName)
	
	if (useRedux) {
		runCommand('npm install @reduxjs/toolkit react-redux redux-persist')
		const fileType = projectType.includes('TS') ? 'ts' : 'js'
		const baseDir = path.join('src', 'application')
		const reduxDirs = ['api', 'reducers', 'store']
		reduxDirs.forEach(dir => fs.mkdirSync(path.join(baseDir, dir), { recursive: true }))
		const storePath = path.join(baseDir, 'store', `store.${fileType}`)
		fs.writeFileSync(storePath, `import {combineReducers, configureStore} from "@reduxjs/toolkit";\nimport storage from "redux-persist/lib/storage";\nimport {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";\n\nconst reducers = combineReducers({});\nconst persistConfig = { key: "root", whitelist: [] as string[], storage };\nconst persistedReducer = persistReducer(persistConfig, reducers);\nconst store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(
            []
        )
});\n\nexport default store;\n`)
	}
	
	const componentsDir = path.join('src', 'components')
	fs.mkdirSync(componentsDir, { recursive: true })
	const sharesDir = path.join(componentsDir, 'shares')
	fs.mkdirSync(sharesDir, { recursive: true })
	const componentFileType = projectType.includes('TS') ? 'tsx' : 'js';
	['niceSelect', 'niceButton', 'niceInputField', 'niceText'].forEach(file => {
		const filePath = path.join(sharesDir, `${file}.${componentFileType}`)
		const fileContent = `\n\nconst ${file} = () => (\n  <div className="${styling === 'Material UI' ? '' : 'tailwind-class'}">\n    {/* Component code here */}\n  </div>\n);\n\nexport default ${file};\n`
		fs.writeFileSync(filePath, fileContent)
	})
	
	if (faviconPath) fs.copyFileSync(faviconPath, path.join('public', 'favicon.ico'))
	if (logoPath) fs.copyFileSync(logoPath, path.join('public', 'logo.png'))
	
	if (styling === 'Material UI') {
		runCommand('npm install @mui/material @emotion/react @emotion/styled')
		const themeProviderContent = `import { createTheme, ThemeProvider } from '@mui/material/styles';\nimport CssBaseline from '@mui/material/CssBaseline';\n\nconst theme = createTheme();\n\nconst ThemeProviderWrapper = ({ children }: any) => (\n  <ThemeProvider theme={theme}>\n    <CssBaseline />\n    {children}\n  </ThemeProvider>\n);\n\nexport default ThemeProviderWrapper;\n`
		
		const appFilePath = path.join('src', `App.${componentFileType}`)
		const appContent = fs.readFileSync(appFilePath, 'utf8')
		fs.writeFileSync(appFilePath, `${appContent.replace('<React.StrictMode>', '<React.StrictMode><ThemeProviderWrapper>').replace('</React.StrictMode>', '</ThemeProviderWrapper></React.StrictMode>')}`)
		fs.writeFileSync(path.join('src', `ThemeProviderWrapper.${componentFileType}`), themeProviderContent)
	}
	
	const tsconfigNodeJsonFile = fs.readFileSync("tsconfig.node.json", 'utf8')
	fs.writeFileSync("tsconfig.node.json", `${tsconfigNodeJsonFile.replace('"strict": true,', '"strict": true, "allowSyntheticDefaultImports": true,')}`)
	
	console.log('Project setup complete!')
}

createProject()
