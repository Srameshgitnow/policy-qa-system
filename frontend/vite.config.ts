import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3001,
    proxy: {
      '/api': {
        // When running inside Docker, use the backend service name
        // so the frontend container can reach the backend over the compose network.
        target: 'http://backend:3000',
        changeOrigin: true,
      },
    },
  },
})
