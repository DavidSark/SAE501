<template>
    <div class="o-card">
        <!-- <threejs class="three" v-bind="valeur" /> -->

        <div class="o-card-content">
            <p class="a-card-name">{{ valeur.nom }}</p>
            <div class="m-card-infos">
                <p class="a-user">créateur: {{ valeur.createur }}</p>
                <p class="a-prix">{{ valeur.prix_montre }} €</p>
            </div>
    
            <myButton class="a-card-bouton" color="white" :lien="`/montre/${valeur.montreID}`">Voir</myButton>
           
        </div>
    </div>
</template>

<style lang="scss">

.o-card{
    margin-top: rem(50);
    border: 1px solid $white;

    .three{
        width: 100%;
        height: 100%;
    }


    .o-card-content{
  
        color: $white;
        font-family: $font-poppins;
        display: flex;
        flex-direction: column;
        padding: rem(20) rem(30);

        .a-card-name{
            font-size: 1.3vw;
            text-align: center;
         
        }
        .m-card-infos{
            display: flex;
          flex-direction: column;
          gap:rem(10);
          margin:rem(20) rem(0);
     
        }

        .a-card-bouton{
            margin: 0 auto;
        }
    }
}

</style>

<script setup>

defineProps({
  valeur: Object,
})

</script>