<script setup>



const apiData = ref([]);

onBeforeMount(async () => {
  try {
    const response = await client.get('/stones');
    apiData.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'API', error);
  }
});


//Connexion utilisateur

</script>

<template>
    <div>
        <Header></Header>
        <ul>
        <li v-for="item in apiData" :key="item.id">
            
            {{ item.stoneName }}
            {{ item.stonePrice }}€
       

        </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>


</style>