<template>
    <main>
        <h1>Page Login</h1>
        <div>
            <h2>Connexion</h2>

            <form @submit.prevent="connexion" method="post">
                <input type="text" name="name" id="pesudo" required placeholder="Pseudo" v-model="userCo.pseudo">
                <input type="password" name="password" id="mdp" required placeholder="Mot de Passe" v-model="userCo.mdp">

                <input type="submit" value="Se connecter">
            </form>
            {{ message }}
        </div>     
    </main>
</template>
  
<script setup>
import {client} from '@/utils/axios'
import { useGlobalStore } from '@/stores/global'
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useGlobalStore()
const userCo = ref({})
const message = ref("")

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