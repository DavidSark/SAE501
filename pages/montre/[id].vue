

<template>
    <div>
      <h1>Les montres</h1>
  
      <ul>
        <li v-for="(m, key) in montre" :key="key">{{ key }} : {{ m }} <br/><br/> </li>
    </ul>
  
          <hr>
    
    </div>
  </template>
  
  <style lang="scss" scoped></style>
  
  <script setup>

  
  const getMontre = async () => {
    const response = await client.get(`/montre/${route.params.id}`)
    montre.value = response.data[0]
    montrePreview.value = response.data[0]
}
  
  
  </script>