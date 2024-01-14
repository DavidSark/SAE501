<template>
    <div class="o-card">
        <threejs v-bind="valeur" />

        <div class="o-card-content">
            <p class="a-card-name">{{ valeur.nom }}</p>
            <div class="m-card-infos">
                <p class="a-user">{{ valeur.createur }}</p>
                <p class="a-prix">{{ valeur.prix_montre }} €</p>
            </div>
    
            <myButton class="a-card-bouton" :lien="`/montre/${valeur.montreID}`">Voir</myButton>
           
        </div>
    </div>
</template>

<style lang="scss">

.o-card{
    margin-top: rem(50);
    border: 1px solid red;

}

</style>

<script setup>

defineProps({
  valeur: Object,
})

</script>