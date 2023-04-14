import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
      '@data': path.resolve(__dirname, './src/mockData'),
      '@components': path.resolve(__dirname, './src/components'),
      '@icons': path.resolve(__dirname, './src/components/icons'),
      '@types': path.resolve(__dirname, './src/types')
    },
  },
  plugins: [vue()],
})
