#!/usr/bin/env ts-node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs-extra';

const targetDir = process.argv[2] || 'my-vite-app';
const templateDir = path.join(__dirname);

fs.copySync(templateDir, targetDir, {
  filter: (src, dest) => {
    const ignore = [
      'node_modules',
      'dist',
      '.git',
      'create-simplify9-vite-app.ts',
      'package-lock.json'
    ];
    return !ignore.some((ignoreItem) => src.includes(ignoreItem));
  }
});

console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit', cwd: targetDir });

console.log('Template created successfully! To get started:');
console.log(`cd ${targetDir}`);
console.log('npm run dev');
