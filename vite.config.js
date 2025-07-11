import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { Component } from 'react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      //src: "/src",
      Components: "/src/Components",
      Pages: "/src/Pages",
      Assets: "/src/Assets",
      Layouts: "/src/Layouts",
      Redux: "/src/Redux",
      Configs: "/src/Configs",
      Helpers: "/src/Helpers",
      Routes: "/src/Routes"
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3005',
        changeOrigin: true,
      },
    },
  },
});
