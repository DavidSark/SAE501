<template>
    <div>
      <h2>Connexion</h2>
      <input v-model="name" type="text" placeholder="Nom d'utilisateur" />
      <input v-model="password" type="password" placeholder="Mot de passe" />
      <button @click="login">Se connecter</button>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { loginUser } from '~/utils/axios';

const name = ref('');
const password = ref('');

const login = async () => {
  try {
    const response = await loginUser(name.value, password.value);
    console.log('Connexion réussie:', response);
    // Traiter la réponse, par exemple enregistrer le token JWT
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
  }
};
  </script>
  