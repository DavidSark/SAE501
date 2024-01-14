export const useGlobalStore = defineStore("global", {
  state: () => ({
    token: null, // pour la connexion
    userID: null, // identifiant de l'utilisateur
    showRegisterForm: false,
  }),
  actions: {

    toggleRegisterForm() {
      this.showRegisterForm = !this.showRegisterForm;
  },
    setToken(token){
      if (token){
        this.token = token;
        localStorage.setItem('token', JSON.stringify(this.token));
        // Exemple : extraire l'userID du token et le stocker
        // this.userID = extractuserIDFromToken(token);
      }
    },

    setuserID(userID) {
      this.userID = userID;
      localStorage.setItem('userID', JSON.stringify(this.userID));
    },

    clearToken() {
      this.token = null;
      this.userID = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
    },

    logout() {
      this.clearToken(); 
    },


    increment() {
      this.count++
    },

    // vérifie et prend les données enregistées dans le panier stockés en local s'il y en a
    setCart(ids){
      if (ids || Array.isArray(ids)){
        this.cart = ids
        this.count = this.cart.length
      } else {
        this.cart = []
      }
    },

    // ajoute une valeur au panier
    addToCart(id) {
      if (!this.cart.includes(id)){
          this.cart.push(id)
          this.count = this.cart.length
          localStorage.setItem('monPanier', JSON.stringify(this.cart))
      }
    },

    // retire une valeur au panier
    removeFromCart(id){
      // vérifie que la recette à retirer est présente dans le tableau cart
      if (this.cart.includes(id)){
          const index = (i) => i === id
          const indexsup = this.cart.findIndex(index)
          this.cart.splice(indexsup, 1)
          this.count = this.cart.length

          if (this.count === 0){
            localStorage.removeItem("monPanier");
          } else {
            localStorage.setItem('monPanier', JSON.stringify(this.cart))
          }
      }
    },

    // vide le panier
    emptyCart(){
      this.cart = []
      this.count = 0
      localStorage.removeItem("monPanier")
    }

  },
});
