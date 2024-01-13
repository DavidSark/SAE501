<template>
    <div class="my_title">
        <h1 class="my_title__texte"><slot class="my_title__texte-valeur"/></h1>
    </div>
</template>

<style lang="scss">
.my_title{
  

    &__texte{
      color: red;
    }
}
</style>