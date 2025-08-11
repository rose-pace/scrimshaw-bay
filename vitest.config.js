/// <reference types="vitest/config" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from 'vite'
import path from 'path';
import { fileURLToPath } from 'url';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.js'],
  },
  resolve: {
    alias: [
      {
        find: new RegExp('^@/(.*)$'),
        replacement: path.resolve(__dirname, './src/$1'),
      },
      {
        find: 'data',
        replacement: path.resolve(__dirname, './data/data.js'),
      },
    ],
  },
});
