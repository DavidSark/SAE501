<template>
    <div class="my_card">
        <sceneMontre v-bind="valeur" />

        <div class="my_card__content">
            <p class="my_card__content--nom">{{ valeur.nom }}</p>
            <div class="my_card__content--infos">
                <p class="user">{{ valeur.createur }}</p>
                <p class="prix">{{ valeur.prix_montre }} €</p>
            </div>
    
            <myButton class="my_card__content--bouton" :lien="`/montre/${valeur.montreID}`">Voir</myButton>
           
        </div>
    </div>
</template>

<style lang="scss">

</style>

<script setup>

defineProps({
  valeur: Object,
})

</script>