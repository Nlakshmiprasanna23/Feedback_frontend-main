import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Feedback_frontend-main/'   // 👈 adjust base path for Tomcat
})
