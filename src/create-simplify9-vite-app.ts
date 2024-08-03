#!/usr/bin/env node

import * as fs from 'fs-extra';
import * as path from 'path';

const projectName = process.argv[2];
if (!projectName) {
  console.error('Please specify the project directory:');
  console.log('  npx create-simplify9-vite-app my-app');
  process.exit(1);
}

const targetPath = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, 'template');

fs.copy(templatePath, targetPath)
    .then(() => console.log(`Project created at ${targetPath}`))
    .catch(err => console.error(err));
