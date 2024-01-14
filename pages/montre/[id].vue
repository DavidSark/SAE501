

<template>
    <main class="o-creation">
        <h2>Modifier de la Montre</h2>
            <div class="canvas">
                <threejs v-bind="montre" />
            </div>

        <div class="o-creation-content">
            <div class="o-creation-content-rendu">
                <ul class="o-creation-content-rendu__infos">
                    <li> Nom : {{ montrePreview.nom }}</li>
                    <li>
                        Bracelet Texture (<span>{{ montrePreview.bracelet_texture }}</span>) :
                        <span >{{ montrePreview.bracelet_texture_prix }} €</span>
                    </li>
                    <li>
                        Boitier Texture (<span>{{ montrePreview.boitier_texture }}</span>) :
                        <span>{{ montrePreview.boitier_texture_prix }} €</span>
                    </li>
                    <li>
                        Boitier Forme (<span>{{ montrePreview.boitier_forme }}</span>) :
                        <span>{{ montrePreview.boitier_forme_prix }} €</span>
                    </li>
                    <li>
                        Pierre (<span>{{ montrePreview.pierre_nom }}</span>) :
                        <span>{{ montrePreview.pierre_prix }} €</span>
                    </li>
                    <li>
                        Prix total : <span>{{ montrePreview.prix_montre }} €</span>
                    </li>

                    <li v-if="store.token">

                        <myButton color="white" v-if="!isMontreInPanier && store.token" @click="ajouterPanier">Ajouter au Panier
                        </myButton>


                        <myButton color="white" v-if="isMontreInPanier && store.token" @click="supprimerPanier">Supprimer du Panier
                        </myButton>

                    </li>

                    <li>{{ message }}</li>
                </ul>
            </div>

            <form v-if="store.token && memeUser" @submit.prevent="modifierMontre">
                <div class="m-creation-form">
                    <label for="nom">Nom de la Montre</label>
                    <input type="text" name="nom" id="nom" v-model="montrePreview.nom">
                </div>

                <div class="m-creation-form">
                    <label for="dernier_modifieur">Pseudo du créateur</label>
                    <input disabled type="text" name="dernier_modifieur"
                        id="dernier_modifieur" v-model="montrePreview.createur">
                </div>

                <div class="m-creation-form">
                    <label for="boitier_texture">Texture du Boitier</label>
                    <select class="m-creation-form-select" name="boitier_texture" id="boitier_texture"
                        v-model="montrePreview.boitier_texture">
                        <option v-for="b in boitier_texture" :key="b.boitierTextureID" :value="b.nom" @click="updatePrice">
                            {{ b.nom }}</option>
                    </select>
                </div>

                <div class="m-creation-form">
                    <label for="boitier_forme">Forme du Boitier</label>
                    <select class="m-creation-form-select" name="boitier_forme" id="boitier_forme"
                        v-model="montrePreview.boitier_forme">
                        <option v-for="b in boitier_forme" :key="b.boitierFormeID" :value="b.nom" @click="updatePrice">{{
                            b.nom }}</option>
                    </select>
                </div>

                <div class="m-creation-form">
                    <label for="bracelet_texture">Texture du Bracelet</label>
                    <select class="m-creation-form-select" name="bracelet_texture" id="bracelet_texture"
                        v-model="montrePreview.bracelet_texture">
                        <option v-for="b in bracelet_texture" :key="b.braceletTextureID" :value="b.nom"
                            @click="updatePrice">{{ b.nom }}</option>
                    </select>
                </div>

                <div class="m-creation-form">
                    <label for="pierre">Pierre Préciseuse</label>
                    <select class="m-creation-form-select" name="pierre" id="pierre" v-model="montrePreview.pierre">
                        <option v-for="p in pierre" :key="p.pierreID" :value="p.nom" @click="updatePrice">{{ p.nom }}
                        </option>
                    </select>
                </div>

                <div class="m-creation-form">
                    <label for="main_color">Couleur</label>
                    <input type="color"  class="color" name="main_color" id="main_color" v-model="montrePreview.main_color">
                </div>

         
                    <input class="form-button" v-if="memeUser"  type="submit" value="Enregistrer les Modifications" />
                    <myButton color="white" v-if="store.token"  @click="supp = true">Supprimer</myButton>
       
            </form>



            <div v-if="!store.token" class="fiche_montre__login">
                <p>Pour modifier cette montre où l'ajouter à votre panier, veuillez vous connecter ou vous inscrire.</p>
                <br>
                <myButton color="white" class="fiche_montre__bouton" lien="/">Connexion</myButton>

            </div>

            <div v-if="supp" class="fiche_montre__popup-supp">
                <p>Vous êtes sur de vouloir supprimer cette montre ? Cette action est irréversible.</p>
                <p>Cette montre disparaitra de votre panier et de ceux des autres utilisateurs.</p>

                <myButton color="white" @click="supp = false">Non, je la laisse</myButton>
                <myButton color="white" @click="supprimerMontre">Oui, je veux la supprimer</myButton>
            </div>
        </div>
    </main>
</template>
  
<style lang="scss" scoped>

.canvas {
        width: rem(1000);
    }
</style>
  
<script setup>
import { client } from '@/utils/axios.js'

const store = useGlobalStore()

const route = useRoute()
const router = useRouter()
const montre = ref([])
const montrePreview = ref({})

const boitier_texture = ref([])
const boitier_forme = ref([])
const bracelet_texture = ref([])
const pierre = ref([])


const users = ref([])
const user = ref([])
const actuelUser = ref([])
const memeUser = ref(false)

const message = ref("")
const supp = ref(false)

// récupérations des tables pour afficher la montre et tous les paramètres
const getMontre = async () => {
    const response = await client.get(`/montre/${route.params.id}`)
    montre.value = response.data[0]
    montrePreview.value = response.data[0]
}

const getBoitier_Texture = async () => {
    const response = await client.get(`/boitier_texture`)
    boitier_texture.value = response.data
}

const getBoitier_Forme = async () => {
    const response = await client.get(`/boitier_forme`)
    boitier_forme.value = response.data
}

const getBracelet_Texture = async () => {
    const response = await client.get(`/bracelet_texture`)
    bracelet_texture.value = response.data
}

const getPierre = async () => {
    const response = await client.get(`/pierres`)
    pierre.value = response.data
}

const getUser = async () => {
    const response = await client.get(`/user`)
    users.value = response.data
    user.value = users.value.find(u => u.pseudo === montre.value.createur)
    actuelUser.value = users.value.find(u => u.userID === store.token)
    console.log("token", store.token, "user", user.value.userID)
    memeUser.value = store.token == user.value.userID ? true : false
}

// modification des prix en fonction des noms de chaque élément
const updatePrice = async () => {
    const BoitierTextureSelect = boitier_texture.value.find(bot => bot.nom === montre.value.boitier_texture)
    const BoitierFormeSelect = boitier_forme.value.find(bot => bot.nom === montre.value.boitier_forme)
    const BraceletTextureSelect = bracelet_texture.value.find(brt => brt.nom === montre.value.bracelet_texture)
    const PierreSelect = pierre.value.find(p => p.couleur === montre.value.pierre_couleur)

    montre.value.boitier_texture_prix = BoitierTextureSelect.prix
    montre.value.boitier_forme_prix = BoitierFormeSelect.prix
    montre.value.bracelet_texture_prix = BraceletTextureSelect.prix
    montre.value.pierre_prix = PierreSelect.prix

    montre.value.prix_montre = BoitierTextureSelect.prix + BoitierFormeSelect.prix + BraceletTextureSelect.prix + PierreSelect.prix
}

// enregistrement de la montre modifiée dans la base de données
const modifierMontre = async () => {
    console.log("Données envoyées pour ajouter une montre:", montre.value);
    try {
        if (memeUser.value) {
            await client.put(`/montre/${route.params.id}/modif`, montrePreview.value);
            message.value = "Montre modifiée avec succès."
        } else {
            montre.value.createur = actuelUser.value.pseudo
            const response = await client.post(`/montre/add`, montre.value);

            if (response.data.message != "Cette montre existe déjà pour cet user") {
                message.value = "Montre créée avec succès."
                router.push(`/montre/${response.data.id_montre}`)
            } else {
                message.value = "Vous avez déjà copié cette montre !"
            }
        }
    } catch (error) {
        console.error("Erreur lors de la modification de la montre :", error.message)
        message.value = "Erreur lors de la modification de la montre."
    }
}

// suppression de la montre dans la base de données
const supprimerMontre = async () => {
    try {
        await client.delete(`/montre/${route.params.id}/supp/${store.token}`);
        message.value = "Montre supprimée avec succès.";
        router.push('/montre')
    } catch (error) {
        console.error("Erreur lors de la suppression de la montre :", error.message)
        message.value = "Erreur lors de la suppression de la montre."
    }
}

const panier = ref([])
const newPanier = ref({})

// récupérations du panier
const getPanier = async () => {
    const response = await client.get(`/user/${store.token}/panier`)
    panier.value = response.data
}

// fonction qui vérifie si la montre est dans le panier
const isMontreInPanier = computed(() => {
    if (montre.value && panier.value) {
        const montresInPanier = panier.value.map(item => item.montreID)
        return montresInPanier.includes(montre.value.montreID)
    }
    return false
})

// enregistrement de la montre dans le panier
const ajouterPanier = async () => {
    newPanier.value.id_montre = montre.value.montreID
    newPanier.value.id_user = store.token
    console.log("Ajout au panier", newPanier.value);
    try {
        await client.post(`/user/panier/add`, newPanier.value);
        message.value = "Montre mis dans le panier avec succès."
        // rappelle de la fonction pour mettre à jour le bouton
        getPanier()
    } catch (error) {
        console.error("Erreur lors de la mise dans le panier :", error.message)
        message.value = "Erreur lors de la mise dans le panier."
    }
}

// retire la montre du panier
const supprimerPanier = async () => {
    newPanier.value.id_montre = montre.value.montreID
    newPanier.value.id_user = store.token

    try {
        await client.delete(`/user/panier/supp/${newPanier.value.id_user}/${newPanier.value.id_montre}`);
        message.value = "Montre retiré du panier avec succès."
        // rappelle de la fonction pour mettre à jour le bouton
        getPanier()
    } catch (error) {
        console.error("Erreur lors de la supprimession du panier :", error.message)
        message.value = "Erreur lors de la supprimession du panier."
    }
}

onMounted(async () => {
    await getMontre()
    await getBoitier_Texture()
    await getBoitier_Forme()
    await getBracelet_Texture()
    await getPierre()
    await getUser()
    await getPanier()
})
</script>