import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  plugins: [react()],
  server:{
    proxy:{
     "/api":{
        target: "https://payment-getway-2o97.onrender.com", // Updated backend URL
        changeOrigin:true,
        secure:false
      }
    }
  }
})
