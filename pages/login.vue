<template>
    <main>
        <h1>Page Login</h1>
        <div>
            <h2>Connexion</h2>

            <form @submit.prevent="connexion" method="post">
                <input type="text" name="name" id="pesudo" required placeholder="Pseudo" v-model="userCo.name">
                <input type="password" name="password" id="mdp" required placeholder="Mot de Passe" v-model="userCo.password">

                <input type="submit" value="Je me connect">
            </form>
            
        </div>     
    </main>
</template>
  
<script setup>
import {client} from '@/utils/axios'
import { useGlobalStore } from '@/stores/global'
const store = useGlobalStore()
import { useRouter } from 'vue-router';

const router = useRouter();

const userCo = ref({})
const message = ref("")
// enregistrement de la montre modifiée dans la base de données
const connexion = async () => {
    try {
        const response = await client.post(`/login`, userCo.value)
        const { token } = response.data // Récupérer le token depuis la réponse client
        store.setToken(token) // Enregistrer le token dans le store Pinia
        message.value = "Vous êtes bien connecté";
      router.push('/profile');
    } catch (error) {
        console.error("Erreur lors de la connexion :", error.message)
        message.value = "Erreur lors de la connexion"
    }
    
}

</script>