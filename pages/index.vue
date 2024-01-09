<script setup>


const apiData = ref([]);

onBeforeMount(async () => {
  try {
    const response = await client.get('/stones/');
    apiData.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'API', error);
  }
});



</script>

<template>
    <div>
        <h1>Données de l'API</h1>
        <ul>
        <li v-for="item in apiData" :key="item.id">{{ item.name }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>


</style>