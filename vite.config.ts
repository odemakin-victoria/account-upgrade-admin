/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    testTimeout: 60_000,
    hookTimeout: 60_000,
    passWithNoTests: false
    ,
    environment:'jsdom',
    setupFiles: './src/config/test-setup.ts',
    globals:true
  },
  resolve: {
    alias: {
        "@": path.resolve(__dirname, "./src")
    },
   
},

})
