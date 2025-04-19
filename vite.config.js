import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: [], // Remove aos from external
    }
  },
  server: {
    port: 3000,  // Make sure Vite listens on port 3000
    host: true,   // Expose the server to the network
    allowedHosts: [
      'diwakar-frontend.onrender.com',
      '*.onrender.com'
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'aos': path.resolve(__dirname, 'node_modules/aos')
    }
  }
})
