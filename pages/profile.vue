<template>
    <div>
      <h1>Page de Profil</h1>
      <p>Bienvenue, {{ username }} !</p>
      <button @click="logout">Déconnexion</button>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();
const username = ref('');
import { definePageMeta } from 'nuxt/app';

definePageMeta({
  middleware: 'auth'
});

onMounted(() => {
  username.value = localStorage.getItem('username');
});

const logout = () => {
  authStore.logout();
  if (process.client) {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }
  router.push('/login');
};
</script>
