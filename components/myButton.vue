<template>
    <div class="">
        <RouterLink v-if="lien" :to="lien" class="o-button-link" :class="className">
            <slot />
        </RouterLink>

        <div v-else class="o-button" :class="className">
            <slot />
        </div>
    </div>
</template>


<style lang="scss">
.o-button {
    display: inline-block;
    font-family: $font-poppins;
    text-transform: uppercase;
    background: transparent;
    color: $black;
    padding: rem(12) rem(30);
    border: 1px solid $black;
    transition: all .4s;
    cursor: pointer;
    font-weight: 200;

    &.-white{
        border: 1px solid $white;
        color: $white;
    }
}
.o-button:hover {
            background:$black;
            border: 1px solid $black;
            color: $white;
            &.-white{
            background:$white;
            border: 1px solid $black;
            color: $black;
        }
        }

.o-button-link {
    display: inline-block;
    font-family: $font-poppins;
    text-transform: uppercase;
    background: transparent;
    padding: rem(12) rem(30);
    border: 1px solid $black;
    color: $black;
    transition: all .4s;
    cursor: pointer;
    text-decoration: none;
    font-weight: 200;

    &.-white{
        border: 1px solid $white;
        color: $white;
    }
  
}
.o-button-link:hover {
            background:$black;
            border: 1px solid $black;
            color: $white;  
            &.-white{
            background:$white;
            border: 1px solid $white;
            color: $black;
        }
}
</style>

<script setup>


const props = defineProps({
    lien: String,
    color: String,
});

const className = computed(() => ({
  " -white": props.color === "white",
}));

</script>