<template>
    <div>
      <h1>Page de Profil</h1>
      <p>Bienvenue!</p>
      
    </div>
  </template>
  
  <script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    'auth',
  ],
});

</script>
