<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<style lang="scss" >

body{
  background: #2B2C30;
  
}
</style>


<script setup>
const store = useGlobalStore()

onMounted(() => {
    // fonction pour vérifié si l'utilisateur était connecté à sa dernière visite
    const token = localStorage.getItem("token")
    store.setToken(JSON.parse(token))
})
</script>