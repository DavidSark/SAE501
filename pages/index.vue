<script setup>


/////////////////////////////////////////////////////////////////
//Ajout de ref + vérification de la connexion entre le client et la bdd
const apiData = ref([]);
const apiData2 = ref([]);
onBeforeMount(async () => {
  try {
    const response = await client.get('/pierres');
    apiData.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'API', error);
  }
});
onBeforeMount(async () => {
  try {
    const response = await client.get('/montre');
    apiData2.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'API', error);
  }
});
///////////////////////////////////////////////////////////////


</script>

<template>
  <div>
    <Header></Header>


    
    <!-- Appel des données dans le html pour tester-->
    <br>
    pierres:
    <br>
    <ul>
      <li v-for="item in apiData" :key="item.id">
        {{ item.nom }}
        {{ item.prix }}€
      </li>
    </ul>
    <br>
    Montres :
    <ul>
      <li v-for="item in apiData2" :key="item.id">
       <pre>{{ item }}</pre>
      </li>
    </ul>
     <!-- Fin de l'appel des données dans le html pour tester-->




  </div>
</template>

<style lang="scss" scoped></style>