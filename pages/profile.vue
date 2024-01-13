<template>
    <main class="compte">
        <myTitle>Mon Espace</myTitle>

        <section class="compte__section">
            <h2>Mes Montres</h2>
            <gridCard :valeurMontres="mesMontres"/>
            <p v-if="mesMontres.length == 0" class="compte__section--texte">Vous n'avez créé aucune montre.</p>

            <myButton class="compte__bouton" lien="/montre/creation">Créer une montre</myButton>
        </section>

        <hr class="compte__deco"/>
        
        <section class="compte__section">
            <h2>Mon Panier</h2>
            <gridCard :valeurMontres="monPanier"/>
            <p v-if="monPanier.length == 0" class="compte__section--texte">Votre panier est vide.</p>
            
            <myButton v-if="monPanier.length != 0" class="compte__bouton" @click="suppPanier = 'acheter'">Acheter mon panier</myButton>
            <myButton v-if="monPanier.length != 0" color="black" class="compte__bouton"  @click="suppPanier = 'vider'">Vider mon panier</myButton>

            <div v-if="suppPanier.length != 0" class="compte__popup compte__popup--acheter">
                <p v-if="suppPanier == 'acheter'">Votre commande a été passée avec succès.</p>
                <p v-if="suppPanier == 'acheter'">Merci de votre commande !</p>

                <p v-if="suppPanier == 'vider'">Votre panier a été vidé avec succès.</p>

                <myButton @click="videPanier()">Ok</myButton>
            </div>
        </section>

        <hr class="compte__deco"/>

        <p>{{ logoutMessage }}</p>
        <button @click="logout">Déconnexion</button>
    </main>
    
  </template>
  
  <script setup lang="ts">
import { useGlobalStore } from '@/stores/global'
import { useRouter } from 'vue-router';
import {client} from '@/utils/axios'

const store = useGlobalStore()
const router = useRouter();



const mesMontres = ref([])
const monPanier = ref([])
const suppPanier = ref("")
const logoutMessage = ref('');
const message = ref('');



// récupérations des tables pour afficher la montre et tous les paramètres
const getMontres = async () => {
    const response = await client.get(`/user/${store.token}`)
    mesMontres.value = response.data
}

// récupérations des tables pour afficher la montre et tous les paramètres
const getPanier = async () => {
    const response = await client.get(`/user/${store.token}/panier`)
    monPanier.value = response.data
}


// vider le panier
const videPanier = async () => {
    try {
        await client.delete(`/user/panier/supp/${store.token}`);
        await getPanier()
        suppPanier.value = ""
    } catch (error) {
        console.error("Erreur lors de la suppression du panier :", error.message)
        message.value = "Erreur lors de la suppression du panier."
    }
}


const logout = () => {
  store.logout();
 alert('Déconnecté avec succès')
 router.push('/')
};

onMounted(async () => {
    await getMontres()
    await getPanier()
})

definePageMeta({
  middleware: [
    function (to, from) {
    },
    'auth',
  ],
});


</script>
