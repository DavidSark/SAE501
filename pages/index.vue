<script setup>
import {client} from '@/utils/axios'
import { useGlobalStore } from '@/stores/global'
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useGlobalStore()
const userCo = ref({})
const name = ref('');
const password = ref('');
const message = ref('')
const isLoginForm = ref(true);

const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value;
};

const register = async () => {
    try {
      const user = await registerUser(name.value, password.value);
      console.log('Compte utilisateur créé avec succès:', user);
      message.value = 'votre compte a été créer avec succès';
    } catch (error) {
      console.error('Erreur lors de l’inscription:', error);
    }
  };
const connexion = async () => {
    try {
        const response = await client.post(`/login`, userCo.value)
        const { token } = response.data // Récupérer le token depuis la réponse client
        store.setToken(token) // Enregistrer le token dans le store Pinia
        message.value = "Vous êtes bien connecté";
      router.push('/profile');
    } catch (error) {
       
        message.value = "Erreur lors de la connexion"
    }
}



</script>

<template>
  <div class="o-indexContainer">

    <section class="m-sectionLeft">
      <div class="a-section-text">
        <div>
          Bienvenue sur Hourglass
        </div>
        <div>
          Créez une montre à votre image
        </div>
      </div>

  
      <div class="a-section-buttons">
        <myButton color="white" lien="/montre"> découvrir</myButton>
      </div>
    </section>

    <section class="m-sectionRight">
      <div class="m-login"  v-if="isLoginForm">
        <h2>Connectez vous pour créer votre montre</h2>
        <form @submit.prevent="connexion" method="post">
                <input type="text" name="name" id="pesudo" required placeholder="Pseudo" v-model="userCo.pseudo">
                <input type="password" name="password" id="mdp" required placeholder="Mot de Passe" v-model="userCo.mdp">
                <input class="a-login-input" type="submit" value="Se connecter">
            </form>
           <p> pas de compte? cliquez <span @click="toggleForm">ici</span></p>
      </div>

      <div class="m-login" v-else>
        <h2>Inscrivez-vous, pour créer votre montre</h2>
        <form @submit.prevent="register" method="post">
          <input v-model="name" type="text" placeholder="Nom">
          <input v-model="password" type="password" placeholder="Mot de passe">
          <input class="a-login-input" type="submit" value="Crée un compte"/>
          <p> déjà un compte? cliquez <span @click="toggleForm">ici</span> pour se connecter</p>
          <p>{{ message }}</p>
        </form>
   
    </div>

    </section>


  </div>
</template>

<style lang="scss" scoped>

.o-indexContainer{
  display: flex;
  height: 100vh;
  font-family: $font-poppins;
  .m-sectionLeft{
    background: $black;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: rem(0) rem(80);
    background-image: url('@/images/watch.jpg');
    background-position: center;
    background-size: cover;
  
    .a-section-text{
      font-size: 3vw;
      line-height: 1.5;
      color: $white;
      text-transform: uppercase;
      margin-bottom: rem(50) ;
      :nth-child(2){
        font-size: 2vw;
      }
    }
  }
  .m-sectionRight{
    background: $white;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .m-login{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: rem(20);

    p{
      font-size: rem(12);
      text-transform: uppercase;
    }
     form{
      ::placeholder{
        font-family: $font-poppins;
        text-transform: uppercase;
      }
      display: flex;
      flex-direction: column;
      gap: rem(10);
      width: 200px;
      input{
        padding: rem(12) rem(30);
      }
      .a-login-input{
        display: inline-block;
        text-transform: uppercase;
        background: transparent;
        color: $black;
        border: 1px solid $black;
        transition: all .4s;
        cursor: pointer
      }

      .a-login-input:hover{
        background: $black;
        color: $white;
      }
     }
    }
  }

}

</style>