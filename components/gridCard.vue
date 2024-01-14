<template>
    <ul class="o-grid-card">
      <li v-for="valeur in valeurMontres">
        <myCard :valeur="valeur"/>
      </li>
    </ul>
</template>

<style lang="scss">
.o-grid-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap:rem(50);
    max-width: 1200px
}
</style>
  
<script setup>
const props = defineProps({
    valeurMontres : Object,
})
</script>  