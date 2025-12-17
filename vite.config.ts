import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/application': 'http://localhost:8081',
      '/api/loan-applications': 'http://localhost:8080',
      '/api/scoring': 'http://localhost:8082',
      '/users': 'http://localhost:8080',
      '/loans': 'http://localhost:8080',
      // Добавь другие префиксы по необходимости
    },
  },
});