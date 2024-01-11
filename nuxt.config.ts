// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css:['@/assets/main.scss'],


  runtimeConfig: {
    public: {
      apiUrl: "",
    },
  },

 
  modules: [
    "@pinia/nuxt"
  ],

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
