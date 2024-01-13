<template>
    <ul class="grid_card">
      <li v-for="valeur in valeurMontres">
        <myCard :valeur="valeur"/>
      </li>
    </ul>
</template>

<style lang="scss">
.grid_card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
 
}
</style>
  
<script setup>
const props = defineProps({
    valeurMontres : Object,
})
</script>  