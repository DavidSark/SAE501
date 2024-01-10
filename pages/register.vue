<template>
    <div>
      <input v-model="name" type="text" placeholder="Nom">
      <input v-model="password" type="password" placeholder="Mot de passe">
      <button @click="register">Créer un compte</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { registerUser } from '~/utils/axios';
  
  const name = ref('');
  const password = ref('');
  
  const register = async () => {
    try {
      const user = await registerUser(name.value, password.value);
      console.log('Compte utilisateur créé avec succès:', user);
    
    } catch (error) {
      console.error('Erreur lors de l’inscription:', error);
    }
  };
  </script>
  