

<template>
    <div class="o-creation">
        <h2>Créez votre montre !</h2>
        <div class="canvas">
            <threejs v-bind="montre"/>
        </div>
        <div class="o-creation-content">
            <div class="o-creation-content-rendu">
                <ul class="o-creation-content-rendu__infos">
                    <li>Nom : {{ montre.nom }}</li>
                    <li>
                        Bracelet Texture : <span>{{ montre.bracelet_texture }}</span>
                    </li>
                    <li>
                        Boitier Texture : <span>{{ montre.boitier_texture }}</span>
                    </li>
                    <li>
                        Boitier Forme : <span>{{ montre.boitier_forme }}</span>
                    </li>
                    <li>
                        Pierre : <span>{{ montre.pierre_nom }}</span>
                    </li>
                    <li>
                        <p v-if="message">{{ message }}</p>
                    </li>
                </ul>
            </div>

            <form @submit.prevent="creerMontre" method="post">
                <div class="m-creation-form">
                    <label for="nom">Nom: </label>
                    <input type="text" name="nom" id="nom" required v-model="montre.nom">
                </div>

                <div class="m-creation-form">
                    <label for="dernier_modifieur">Créateur: </label>
                    <input disabled type="text" name="dernier_modifieur" id="dernier_modifieur" required
                        v-model="montre.createur">
                </div>

                <div class="m-creation-form">
                    <label for="boitier_texture">Texture du boitier:</label>
                    <select class="m-creation-form-select" name="boitier_texture" id="boitier_texture"
                        v-model="montre.boitier_texture">
                        <option v-for="b in boitier_texture" :key="b.boitierTextureID" :value="b.nom" @click="updatePrice">
                            {{
                                b.nom }}</option>
                    </select>
                </div>

                <div class="m-creation-form">
                    <label for="boitier_forme">Forme du boitier: </label>
                    <select class="m-creation-form-select" name="boitier_forme" id="boitier_forme"
                        v-model="montre.boitier_forme">
                        <option v-for="b in boitier_forme" :key="b.boitierFormeID" :value="b.nom" @click="updatePrice">{{
                            b.nom
                        }}</option>
                    </select>
                </div>

                <div class="m-creation-form">
                    <label for="bracelet_texture">Texture du bracelet: </label>
                    <select class="m-creation-form-select" name="bracelet_texture" id="bracelet_texture"
                        v-model="montre.bracelet_texture">
                        <option v-for="b in bracelet_texture" :key="b.braceletTextureID" :value="b.nom"
                            @click="updatePrice">{{
                                b.nom }}</option>
                    </select>
                </div>

                <div class="m-creation-form">
                    <label for="pierre">Pierre Préciseuse: </label>
                    <select class="m-creation-form-select" name="pierre" id="pierre" v-model="montre.pierre">
                        <option v-for="p in pierre" :key="p.pierreID" :value="p.nom" @click="updatePrice">{{ p.nom }}
                        </option>
                    </select>
                </div>

                <div class="m-creation-form">
                    <label for="main_color">Couleur: </label>
                    <input type="color" class="color" name="main_color" id="main_color" v-model="montre.main_color">
                </div>

                <input class="form-button" type="submit" value="Enregistrer cette Montre" />

            </form>
        </div>
        {{ message }}
    </div>
</template>



<style lang="scss">
.o-creation {
    display: flex;
    flex-direction: column;
    align-items: center;

    .canvas {
        width: rem(1000);
    }

    font-family: $font-poppins;
    color: $white;
    padding: rem(40) rem(80);

    h2 {
        font-size: 3vw;
    }

    &-content {
        margin: rem(50) rem(0);
        display: flex;

        gap: rem(300);

        &-rendu {

            &__infos {
                display: flex;
                flex-direction: column;
                gap: rem(10);
                white-space: nowrap;
            }
        }
        form {
            display: flex;
            flex-direction: column;
            gap: rem(10);
            .m-creation-form {
                input {
                    padding: rem(6) rem(5);
                    background: $white;
                }
                &-select {
                    background: $white;
                    padding: rem(6) rem(5);
                }
                .color{
                    padding: 0;
                }
            }
            .form-button{
                display: inline-block;
                font-family: $font-poppins;
                text-transform: uppercase;
                background: transparent;
                color: $white;
                padding: rem(12) rem(30);
                border: 1px solid $white;
                transition: all .4s;
                cursor: pointer;
                font-weight: 200;
            }
            .form-button:hover {
            background:$white;
            border: 1px solid $white;
            color: $black;
        }
    }
}
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
        nom: "",
        createur: user.value.pseudo,
        boitier_texture: boitier_texture.value[0].nom,
        boitier_texture_prix: boitier_texture.value[0].prix,
        boitier_forme: boitier_forme.value[0].nom,
        boitier_forme_prix: boitier_forme.value[0].prix,
        bracelet_texture: bracelet_texture.value[0].nom,
        bracelet_texture_prix: bracelet_texture.value[0].prix,
        pierre_nom: pierre.value[0].nom,
        pierre_couleur: pierre.value[0].couleur,
        pierre_prix: pierre.value[0].prix,
        main_color: "#999999",
        prix_montre: boitier_texture.value[0].prix + boitier_forme.value[0].prix + bracelet_texture.value[0].prix + pierre.value[0].prix,
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