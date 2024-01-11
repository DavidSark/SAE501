<template>
    <div>
      <h1>Page de Profil</h1>
      <p>Bienvenue! </p>
      
      <p>{{ logoutMessage }}</p>
        <button @click="logout">Déconnexion</button>
    </div>
  </template>
  
  <script setup lang="ts">
import { useGlobalStore } from '@/stores/global'
const store = useGlobalStore()
import { useRouter } from 'vue-router';
const router = useRouter();
const logoutMessage = ref('');
definePageMeta({
  middleware: [
    function (to, from) {
    },
    'auth',
  ],
});

const logout = () => {
  store.logout();
 alert('Déconnecté avec succès')
 router.push('/')
};

</script>
