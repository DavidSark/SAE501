<template>
    <main class="o-profile">
        <h2>Mon Espace</h2>
        <section class="o-profile-montres">

            <div class="o-profile-montres-title-button">
                <h2>Vos Montres</h2>
                <myButton color="white" lien="/montre/creation">Créer une montre</myButton>
            </div>

            <gridCard class="o-profile-center" :valeurMontres="mesMontres" />
            <p v-if="mesMontres.length == 0">Vous n'avez créé aucune montre.</p>


        </section>

        <hr />

        <section class="o-profile-panier">
            <h2>Mon Panier</h2>
            <gridCard class="o-profile-center" :valeurMontres="monPanier" />
            <p v-if="monPanier.length == 0">Votre panier est vide.</p>

            <div class="o-profile-panier-space">
                <myButton v-if="monPanier.length != 0" color="white" @click="suppPanier = 'acheter'">Acheter mon panier
                </myButton>
                <myButton v-if="monPanier.length != 0" color="white" @click="suppPanier = 'vider'">Vider mon panier
                </myButton>
            </div>
            <div v-if="suppPanier.length != 0">
                <p v-if="suppPanier == 'acheter'">Votre commande a été passée avec succès.</p>
                <p v-if="suppPanier == 'acheter'">Merci de votre commande !</p>

                <p v-if="suppPanier == 'vider'">Votre panier a été vidé avec succès.</p>

                <myButton color="white" @click="videPanier()">Ok</myButton>
            </div>
        </section>

        <hr />

        <p>{{ logoutMessage }}</p>
        <myButton @click="logout">Déconnexion</myButton>
    </main>
</template>

<style lang="scss" scoped>
.o-profile {
    margin-bottom: rem(200);
    background: $black;
    height: 100vh;
    padding: rem(100) rem(80);
    text-transform: uppercase;
    color: $white;
    font-family: $font-poppins;
    &-center {
        margin: 0 auto rem(60) auto;
    }

    h2 {
        margin-top: rem(20);
        font-size: 3vw;
    }

   &-panier{
    &-space {
        display: flex;
        gap: rem(50);
        margin-bottom: rem(50) ;
    }
   }

    .o-profile-montres {
        h2 {
            font-size: 1.5vw
        }

        &-title-button {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>
  
<script setup lang="ts">
import { useGlobalStore } from '@/stores/global'
import { useRouter } from 'vue-router';
import { client } from '@/utils/axios'

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
