#!/usr/bin/env node
import { execSync } from 'child_process';
const projectName = '.';

execSync(`git clone https://github.com/AliShiyyab/Simplify9-React-Vite-Template.git ${projectName}`);
execSync(`rm -rf ${projectName}/.git`);
console.log('Project created successfully!');
