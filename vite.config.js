// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/todo-react/',  // ← ТОЛЬКО ЭТО ИСПРАВЬ! Имя репозитория в нижнем регистре + слеш в конце
})