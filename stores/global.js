import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    token: null, // pour la connection
  }),
  actions: {

    // vérifie et prend les données enregistées dans le panier stockés en local s'il y en a
    setToken(token){
      if (token){
        this.token = token
        localStorage.setItem('Token de Connection', JSON.stringify(this.token))
        }
    },

    clearToken() {
      this.token = null;
      localStorage.removeItem('Token de Connection');
    },


    logout() {
      this.clearToken(); 
    },

    }
});