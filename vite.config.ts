import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "node:path"

export const BASE_PATH = process.env.NODE_ENV === "production" ? "/front_5th_chapter2-3/" : "/"

// https://vite.dev/config/
export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],

  build: {
    rollupOptions: {
      input: {
        origin: resolve(__dirname, "index.origin.html"),
        refactoring: resolve(__dirname, "index.refactoring.html"),
      },
    },
  },

  server: {
    proxy: {
      "/api": {
        // target: 'https://jsonplaceholder.typicode.com',
        target: "https://dummyjson.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
