

<template>
  <div>
    <h1>Création d'une Montre</h1>

    <ul>
            <li v-for="(m, key) in montre" :key="key">{{ key }} : {{ m }} <br/><br/> </li>
        </ul>

        <hr>
    <form @submit.prevent="creerMontre" method="post" >

      <input  type="text" name="nom" id="nom" v-model="montre.nom">

      <input disabled type="text" name="dernier_utilisateur" id="dernier_utilisateur" v-model="montre.dernier_utilisateur">

      <select name="boitier_texture" id="boitier_texture"
      v-model="montre.boitier_texture">
        <option v-for="item in boitier_texture" :key="item.boitierTextureID" :value="item.nom">
          {{ item.nom }}
        </option>
      </select>

      <select name="boitier_forme" id="boitier_forme" v-model="montre.boitier_forme">
        <option v-for="item in boitier_forme" :key="item.boitierFormeID" :value="item.nom">
          {{ item.nom }}
        </option>
      </select>

      <select name="bracelet_texture" id="bracelet_texture" v-model="montre.bracelet_texture">
        <option v-for="item in bracelet_texture" :key="item.braceletTextureID" :value="item.nom">
          {{ item.nom }}
        </option>
      </select>

      <select name="pierre" id="pierre" v-model="montre.pierre_nom">
        <option v-for="item in pierre" :key="item.pierreID" :value="item.nom">
          {{ item.nom }}
        </option>
      </select>

      <input type="color" name="color" id="color" v-model="montre.main_color">

      <!-- <select name="fond_nom" id="fond_nom" v-model="montre.fond_nom">
        <option ></option>
      </select> -->

      <button type="submit">
       Enregistrer la Montre
      </button>

    </form>
    {{ message }}
  </div>
</template>

<style lang="scss" scoped></style>

<script setup>
import { client } from '@/utils/axios.js';
import {useRouter} from "vue-router";

const router = useRouter();

const montre = ref({
        nom : "",
        dernier_utilisateur : "Telmane",
        boitier_texture : "black01",
        boitier_texture_prix  : 9.99,
        boitier_forme : "boitier_carre",
        boitier_forme_prix : 4,
        bracelet_texture : "Métal",
        bracelet_texture_prix  : 5,
        pierre_nom : "Rubis",
        main_color : "#999999",
        pierre_prix : 150,
        prix_montre : 168.99,

});

const boitier_texture = ref([]);
const boitier_forme = ref([]);
const bracelet_texture = ref([]);
const pierre = ref([]);
const message = ref([]);

const getBoitier_Texture = async () => {
    const response = await client.get(`/boitier_texture`);
    boitier_texture.value = response.data;
};

const getBoitier_Forme = async () => {
    const response = await client.get(`/boitier_forme`);
    boitier_forme.value = response.data;
};

const getBracelet_Texture = async () => {
    const response = await client.get(`/bracelet_texture`);
    bracelet_texture.value = response.data;
};

const getPierre = async () => {
    const response = await client.get(`/pierres`);
    pierre.value = response.data;
};

const creerMontre = async () => {
    try {
        const reponse = await client.post(`/montre/add`, montre.value);
        message.value = "Montre créée avec succès";
        
    } catch (error) {
        console.error("Erreur lors de la création de la montre :", error.message);
        message.value = "Erreur lors de la création de la montre";
    };
};


onMounted(async () => {
    await getBoitier_Texture()
    await getBoitier_Forme()
    await getBracelet_Texture()
    await getPierre()
})



</script>