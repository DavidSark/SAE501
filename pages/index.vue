<script setup>


const router = useRouter();
const apiData = ref([]);

onBeforeMount(async () => {
  try {
    const response = await client.get('/stones/');
    apiData.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'API', error);
  }
});


//Connexion utilisateur
const formData = ref({
  username: '',
  password: '',
});


const login = async () => {
  try {
    const response = await client.post('/login', formData.value);
    console.log('Utilisateur connecté:', response.data.name);

    // Redirection côté client vers la page de profil après une connexion réussie
    router.push('/profile'); // Remplacez '/profile' par le chemin réel de votre page de profil
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
  }
};
</script>

<template>
    <div>
        <div class="container">
            <label for="uname"><b>Username</b></label>
            <input v-model="formData.username" type="text" placeholder="Enter Username" name="username" required>




            <label for="psw"><b>Password</b></label>
            <input v-model="formData.password" type="password" placeholder="Enter Password" name="password" required>

            <button @click="login" type="submit">Login</button>
        </div>
        <ul>
        <li v-for="item in apiData" :key="item.id">
            
            {{ item.name }}

        </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>


</style>