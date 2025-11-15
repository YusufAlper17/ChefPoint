import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ChefPoint/advenced_qr_menu/',
  server: {
    port: 5177,
    host: '0.0.0.0', // Ağdaki tüm cihazlardan erişim için
    open: false
  }
})



