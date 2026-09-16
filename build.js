#!/usr/bin/env node

// Custom build script to avoid permission issues in Vercel
const { execSync } = require('child_process');
const path = require('path');

async function build() {
  try {
    console.log('Building application...');
    
    const fs = require('fs');
    const viteBin = path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');

    if (fs.existsSync(viteBin)) {
      console.log(`Using Vite at: ${viteBin}`);
      execSync(`node "${viteBin}" build`, {
        stdio: 'inherit',
        cwd: __dirname
      });
    } else {
      console.log('Vite bin not found, falling back to npx vite build...');
      execSync('npx vite build', {
        stdio: 'inherit',
        cwd: __dirname
      });
    }
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

build();
