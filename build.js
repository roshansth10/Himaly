#!/usr/bin/env node

// Custom build script to avoid permission issues in Vercel
const { execSync } = require('child_process');
const path = require('path');

async function build() {
  try {
    console.log('Building application...');
    
    // Try multiple possible Vite entry points
    const possiblePaths = [
      path.join(__dirname, 'node_modules', 'vite', 'dist', 'index.js'),
      path.join(__dirname, 'node_modules', 'vite', 'dist', 'node', 'index.js'),
      path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js'),
      path.join(__dirname, 'node_modules', 'vite', 'out', 'index.js')
    ];
    
    let vitePath = null;
    
    // Find the correct Vite path
    for (const testPath of possiblePaths) {
      try {
        require.resolve(testPath);
        vitePath = testPath;
        break;
      } catch (e) {
        // Path doesn't exist, try next one
      }
    }
    
    if (!vitePath) {
      console.log('Vite path not found, trying direct require...');
      // Fallback to using require directly
      try {
        const vite = require('vite');
        if (vite.build) {
          await vite.build({
            configFile: path.join(__dirname, 'vite.config.mts'),
            mode: 'production'
          });
          console.log('Build completed successfully!');
          return;
        }
      } catch (e) {
        console.error('Could not load Vite module:', e.message);
      }
    }
    
    if (vitePath) {
      console.log(`Using Vite at: ${vitePath}`);
      // Run the build using node directly
      execSync(`node "${vitePath}" build`, {
        stdio: 'inherit',
        cwd: __dirname
      });
    } else {
      console.error('Could not find Vite installation');
      process.exit(1);
    }
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

build();
