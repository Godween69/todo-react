import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // ← добавляем Tailwind плагин

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← подключаем Tailwind
  ],
  base: '/todo-react/', // имя репозитория в нижнем регистре + слеш
})
