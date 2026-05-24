import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Forward /api calls to the policy service in dev
      '/api/v1/auth':     { target: 'http://localhost:8081', changeOrigin: true },
      '/api/v1/policies': { target: 'http://localhost:8081', changeOrigin: true },
      '/api/v1/claims':   { target: 'http://localhost:8082', changeOrigin: true },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    coverage: { reporter: ['text', 'lcov'] },
  },
})
