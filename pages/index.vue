<script setup>



const apiData = ref([]);
const apiData2 = ref([]);

onBeforeMount(async () => {
  try {
    const response = await client.get('/stones');
    apiData.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'API', error);
  }
});

onBeforeMount(async () => {
  try {
    const response = await client.get('/watches');
    apiData2.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'API', error);
  }
});

//Connexion utilisateur

</script>

<template>
    <div>
        <Header></Header>
        <br>
        pierres: 
        <br>
        <ul>
        <li v-for="item in apiData" :key="item.id">
            
            {{ item.stoneName }}
            {{ item.stonePrice }}€
       

        </li>
        </ul>
<br>
        Montres : 
        <ul>
          <li v-for="item in apiData2" :key="item.id">
            
            {{ item}}
         
       

        </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>


</style>