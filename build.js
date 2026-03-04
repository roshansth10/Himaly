#!/usr/bin/env node

// Custom build script to avoid permission issues in Vercel
const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('Building application...');
  
  // Use node directly to run vite instead of relying on the bin symlink
  const vitePath = path.join(__dirname, 'node_modules', 'vite', 'dist', 'index.js');
  
  // Run the build using node directly
  execSync(`node "${vitePath}" build`, {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}