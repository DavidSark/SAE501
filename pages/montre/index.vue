<template>
    <main class="o-container-montre">
        <div class="m-container-montre-text">
            <h2>Les montres</h2>
            <myButton color="white" lien="/montre/creation">Créer ma montre</myButton>
        </div>


        <div class="m-container-montre-filter">
            <div class="m-container-montre-filter__filtre">
                <label for="boitier_forme">Forme du Boitier</label>
                <select class="montre-select" name="boitier_forme" id="boitier_forme" v-model="selectedForme">
                    <option value="">tous</option>
                    <option v-for="b in boitier_forme" :key="b.id_boitier_forme" :value="b.nom">{{ b.nom }}</option>
                </select>
            </div>

            <div class="m-container-montre-filter__filtre">
                <label for="bracelet_texture">Texture du Bracelet</label>
                <select class="montre-select" name="bracelet_texture" id="bracelet_texture"
                    v-model="selectedBracelet">
                    <option value="">toutes</option>
                    <option v-for="b in bracelet_texture" :key="b.id_bracelet_texture" :value="b.nom">{{ b.nom }}</option>
                </select>
            </div>

            <div class="m-container-montre-filter__filtre">
                <label for="pierre">Pierre Précieuse</label>
                <select class="montre-select" name="pierre" id="pierre" v-model="selectedPierre">
                    <option value="">toutes</option>
                    <option v-for="p in pierres" :key="p.id_pierre" :value="p.nom">{{ p.nom }}</option>
                </select>
            </div>
        </div>

        <gridCard :valeurMontres="listeMontre"/>

        <div class="pagination">
            <myButton color="white" @click="lessMontre()" v-if="montreMin">Moins de Montres</myButton>
            <myButton color="white" @click="moreMontre()" v-if="montreTotal">Plus de Montres</myButton>
        </div>

    </main>
</template>

<style lang="scss">
.o-container-montre {
    margin-bottom:rem(200);
    background: $black;
    height: 100vh;
    padding: rem(100) rem(80);
    text-transform: uppercase;
    .m-container-montre-text {
        display: flex;
        flex-direction: column;
        font-family: $font-poppins;
        font-size: 3vw;
        color: $white;

        :nth-child(2) {
            font-size: rem(16);
            display: flex;
            justify-content: flex-end;
        }
    }
    .m-container-montre-filter{
        display: flex;
        justify-content: space-between;
        margin-top: rem(60);
        gap: rem(50);
        font-family: $font-poppins;
        color: $white;
        &__filtre{
            display: flex;
            flex-direction: column;
            gap: rem(5);

        }
    }

    .pagination{
        display: flex;
        gap:rem(20);
        justify-content: center;
        margin: rem(50) rem(0);
    }
}
</style>
  
<script setup>
import { client } from '@/utils/axios'

const store = useGlobalStore()

const montres = ref([])

const boitier_forme = ref([])
const selectedForme = ref('')

const bracelet_texture = ref([])
const selectedBracelet = ref('')

const pierres = ref([])
const selectedPierre = ref('')

// récupération de toutes les tables nécéessaires à l'affichage des montres et des filtres
const getMontres = async () => {
    const response = await client.get(`/montre`)
    montres.value = response.data
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
    pierres.value = response.data
}

// Filtrer les montres en fonction de la pierre et de la forme sélectionnées
const filteredMontres = computed(() => {
    let filtered = montres.value

    if (selectedForme.value) {
        filtered = filtered.filter(m => m.boitier_forme === selectedForme.value)
    }

    if (selectedBracelet.value) {
        filtered = filtered.filter(m => m.bracelet_texture === selectedBracelet.value)
    }

    if (selectedPierre.value) {
        filtered = filtered.filter(m => m.pierre_nom === selectedPierre.value)
    }

    return filtered
})

// nombre de montre à afficher
const nbrMontre = ref(1)

// augmente le nombre de montre à afficher
const moreMontre = () => {
    nbrMontre.value++
}

// dimunue le nombre de montre à afficher
const lessMontre = () => {
    nbrMontre.value--
}

// fonction pour filtrer le nombre de Montre à affiché
const listeMontre = computed(() => {
    if (filteredMontres.value) {
        return filteredMontres.value.slice(0, 3 * nbrMontre.value)
    } else {
        return []
    }
})

// pour cacher le bouton "plus de montre" si elles sont toutes affichées
const montreTotal = computed(() => {
    return listeMontre.value.length < filteredMontres.value.length
})

// pour cacher le bouton "plus de montre" si elles sont toutes affichées
const montreMin = computed(() => {
    return listeMontre.value.length > + 3
})

// chargement de la base de données
onMounted(async () => {
    await getMontres()
    await getBoitier_Forme()
    await getBracelet_Texture()
    await getPierre()
})
</script>