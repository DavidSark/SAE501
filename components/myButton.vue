<template>
    <div>
        <RouterLink v-if="lien" :to="lien" class="my_button" >
            <slot/>
        </RouterLink>
        
        <div v-else class="my_button" >
            <slot/> 
        </div>
    </div>
</template>

<style lang="scss">

</style>

<script setup>

const props = defineProps({
  lien: String,

});


</script>