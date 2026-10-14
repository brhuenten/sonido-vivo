import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // En dev sirve desde `/`; en build usa subruta de GitHub Pages salvo VITE_APP_BASE.
  base:
    process.env.VITE_APP_BASE ??
    (command === 'serve' ? '/' : '/sonido-vivo/'),
  plugins: [react(),
    tailwindcss()
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
  },
}))
