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
  <div class="o-indexContainer">


    <section class="m-sectionLeft">
      
    </section>

    <section class="m-sectionRight">

    </section>




  </div>
</template>

<style lang="scss" scoped>

.o-indexContainer{
  display: flex;
  height: 100vh;
  .m-sectionLeft{
    background: $black;
    width: 50%;
  }
  .m-sectionRight{
    background: $white;
    width: 50%;
  }
  
}

</style>