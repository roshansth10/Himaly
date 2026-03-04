import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Conditionally load kimi-plugin-inspect-react only when available (local development)
let plugins = [react()]

try {
  const { inspectAttr } = require('kimi-plugin-inspect-react')
  plugins.unshift(inspectAttr())
} catch (e) {
  // Plugin not available (e.g., in production build environments like Vercel)
  console.log('kimi-plugin-inspect-react not available, skipping...')
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
