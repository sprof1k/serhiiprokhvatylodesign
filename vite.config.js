import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main:           resolve(__dirname, 'index.html'),
        'vera-health':  resolve(__dirname, 'vera-health.html'),
        'down-dating':  resolve(__dirname, 'down-dating.html'),
        podlify:        resolve(__dirname, 'podlify.html'),
        bxyz:           resolve(__dirname, 'bxyz.html'),
        voltride:       resolve(__dirname, 'voltride.html'),
        fortytwo:       resolve(__dirname, 'fortytwo.html'),
        vancity:        resolve(__dirname, 'vancity.html'),
        cryptohub:      resolve(__dirname, 'cryptohub.html'),
      },
    },
  },
})
