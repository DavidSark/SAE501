

<template>
  <div>
    <h1>Création d'une Montre</h1>

    <div class="canvas">
                <three v-bind="montre"/>
            </div>

        <!-- <ul>
            <li v-for="(m, key) in montre" :key="key">{{ key }} : {{ m }} <br/><br/> </li>
        </ul> -->

        <br>
        <hr>
        <br>
        <div class="crea_montre__rendu">
        
            <ul class="crea_montre__rendu--infos">
                <li class="info info__nom">{{ montre.nom }}</li>

                <li class="info">
                    Bracelet Texture (<span class="info__valeur">{{ montre.bracelet_texture }}</span>) :
                    <span class="info__prix">{{ montre.bracelet_texture_prix }} €</span>
                </li>
                <li class="info">
                    Boitier Texture (<span class="info__valeur">{{ montre.boitier_texture }}</span>) :
                    <span class="info__prix">{{ montre.boitier_texture_prix }} €</span>
                </li>
                <li class="info">
                    Boitier Forme (<span class="info__valeur">{{ montre.boitier_forme }}</span>) :
                    <span class="info__prix">{{ montre.boitier_forme_prix }} €</span>
                </li>
                <li class="info">
                    Pierre (<span class="info__valeur">{{ montre.pierre_nom }}</span>) :
                    <span class="info__prix">{{ montre.pierre_prix }} €</span>
                </li>
                <li class="info">
                    Prix total : <span class="info__prix">{{ montre.prix_montre }} €</span>
                </li>

                <li class="info info__message">
                    <p v-if="message">{{ message }}</p>
                    <p v-else>(Enregistrez cette montre pour pouvoir l'ajouter à votre panier)</p>
                </li>
            </ul>
        </div>
        <br>
        <hr>
        <br>
        <form @submit.prevent="creerMontre" method="post" class="crea_montre__form">

            <div class="crea_montre__form--input">
                <label for="nom">Nom de la Montre</label>
                <input class="crea_montre__form--input" type="text" name="nom" id="nom" required v-model="montre.nom">
            </div>

            <div class="crea_montre__form--input">
                <label for="dernier_modifieur">Pseudo du créateur</label>
                <input class="crea_montre__form--input" disabled type="text" name="dernier_modifieur" id="dernier_modifieur" required v-model="montre.createur">
            </div>

            <div class="crea_montre__form--input">
                <label for="boitier_texture">Texture du Boitier</label>
                <select class="crea_montre__form--select" name="boitier_texture" id="boitier_texture" v-model="montre.boitier_texture">
                    <option v-for="b in boitier_texture" :key="b.boitierTextureID" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
                </select>
            </div>

            <div class="crea_montre__form--input">
                <label for="boitier_forme">Forme du Boitier</label>
                <select class="crea_montre__form--select" name="boitier_forme" id="boitier_forme" v-model="montre.boitier_forme">
                    <option v-for="b in boitier_forme" :key="b.boitierFormeID" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
                </select>
            </div>

            <div class="crea_montre__form--input">
                <label for="bracelet_texture">Texture du Bracelet</label>
                <select class="crea_montre__form--select" name="bracelet_texture" id="bracelet_texture" v-model="montre.bracelet_texture">
                    <option v-for="b in bracelet_texture" :key="b.braceletTextureID" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
                </select>
            </div>

            <div class="crea_montre__form--input">
                <label for="pierre">Pierre Préciseuse</label>
                <select class="crea_montre__form--select" name="pierre" id="pierre" v-model="montre.pierre">
                    <option v-for="p in pierre" :key="p.pierreID" :value="p.nom" @click="updatePrice">{{ p.nom }}</option>
                </select>
            </div>

            <div class="crea_montre__form--input">
                <label for="main_color">Couleur</label>
                <input type="color" name="main_color" id="main_color" v-model="montre.main_color">
            </div>

            <input class="crea_montre__form--bouton" type="submit" value="Enregistrer cette Montre"/>

        </form>
    {{ message }}
  </div>
</template>

<style lang="scss" scoped>

.canvas{
    width: 600px;
}

</style>

<script setup>
import { client } from '@/utils/axios.js'

const store = useGlobalStore()

const router = useRouter()

const boitier_texture = ref([])
const boitier_forme = ref([])
const bracelet_texture = ref([])
const pierre = ref([])
const user = ref([])

const message = ref("")
const montre = ref({})

const getMontre = async () => {
    montre.value = {
        nom : "",
        createur : user.value.pseudo,
        boitier_texture : boitier_texture.value[0].nom,
        boitier_texture_prix  : boitier_texture.value[0].prix,
        boitier_forme : boitier_forme.value[0].nom,
        boitier_forme_prix : boitier_forme.value[0].prix,
        bracelet_texture : bracelet_texture.value[0].nom,
        bracelet_texture_prix : bracelet_texture.value[0].prix,
        pierre_nom : pierre.value[0].nom,
        pierre_couleur : pierre.value[0].couleur,
        pierre_prix : pierre.value[0].prix,
        main_color : "#999999",
        prix_montre : boitier_texture.value[0].prix + boitier_forme.value[0].prix + bracelet_texture.value[0].prix + pierre.value[0].prix,
    }
    console.log(user.value.pseudo)
    console.log(user.value)

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
    user.value = response.data.find(u => u.userID === store.token)
}

// modification des prix en fonction des noms de chaque élément
const updatePrice = async () => {
    const BoitierTextureSelect = boitier_texture.value.find(bot => bot.nom === montre.value.boitier_texture )
    const BoitierFormeSelect = boitier_forme.value.find(bot => bot.nom === montre.value.boitier_forme )
    const BraceletTextureSelect = bracelet_texture.value.find(brt => brt.nom === montre.value.bracelet_texture )
    const PierreSelect = pierre.value.find(p => p.couleur === montre.value.pierre_couleur)

    montre.value.boitier_texture_prix = BoitierTextureSelect.prix
    montre.value.boitier_forme_prix = BoitierFormeSelect.prix
    montre.value.bracelet_texture_prix = BraceletTextureSelect.prix 
    montre.value.pierre_prix = PierreSelect.prix

    montre.value.prix_montre = BoitierTextureSelect.prix + BoitierFormeSelect.prix + BraceletTextureSelect.prix + PierreSelect.prix
}

// enregistrement de la montre modifiée dans la base de données
const creerMontre = async () => {
    try {
        const reponse = await client.post(`/montre/add`, montre.value);
        message.value = "Montre créée avec succès"
        router.push(`/montre/${reponse.data.id_montre}`)
    } catch (error) {
        console.error("Erreur lors de la création de la montre :", error.message)
        message.value = "Erreur lors de la création de la montre"
    }
}

onMounted(async () => {
    await getBoitier_Texture()
    await getBoitier_Forme()
    await getBracelet_Texture()
    await getPierre()
    await getUser()
    await getMontre()
})

definePageMeta({
  middleware: [
    function (to, from) {
    },
    'auth',
  ],
});

</script>