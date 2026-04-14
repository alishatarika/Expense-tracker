import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/expenses': 'http://localhost:8000',
      '/summary': 'http://localhost:8000',
      '/categories': 'http://localhost:8000',
    },
  },
})
