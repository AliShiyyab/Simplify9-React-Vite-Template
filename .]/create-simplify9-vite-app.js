#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var targetDir = process.argv[2] || 'my-vite-app';
var templateDir = path_1.default.join(__dirname);
fs_extra_1.default.copySync(templateDir, targetDir, {
    filter: function (src, dest) {
        var ignore = [
            'node_modules',
            'dist',
            '.git',
            'create-simplify9-vite-app.ts',
            'package-lock.json'
        ];
        return !ignore.some(function (ignoreItem) { return src.includes(ignoreItem); });
    }
});
console.log('Installing dependencies...');
(0, child_process_1.execSync)('npm install', { stdio: 'inherit', cwd: targetDir });
console.log('Template created successfully! To get started:');
console.log("cd ".concat(targetDir));
console.log('npm run dev');
