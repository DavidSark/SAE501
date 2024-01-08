// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css:['@/assets/main.scss'],


  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: 
          `@import "@/assets/foundations/variables.scss";`
        }
      }
    }
    
  },
})
