<script setup>

</script>

<template>
    <div class="o-container">
        <div class="m-container__left">
            <div>home</div>
            <div>products</div>
            <div>customize</div>
        </div>

        <div class="m-container__middle">
            <img src="/icons/logo.svg" alt="logo">
            <h1>hourglass</h1>
        </div>

        <div class="m-container__right">
           <div class="a-log">
                
            <nuxt-link to="/login">login</nuxt-link>
           </div>
           <div class="a-cart">
            <img src="/icons/shopping-bag.svg" alt="">
                <div>
                    Cart
                </div>
           </div>
           
        </div>
    </div>
</template>

<style lang="scss" scoped>


.o-container{
  background-color: $brown;
  color: $orange;
  font-family: $font-poppins;
  display: flex;
  padding:rem(20) rem(80);
    font-weight: 200;

    .m-container__left{
        display:flex;
        align-items: center;
        justify-content: space-between;
        width: rem(300);
      
    }

  .m-container__middle{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    img{
        width: rem(20)
    }
    h1{
        text-transform: uppercase;
        margin-top: rem(15);
        font-size: rem(25)
    }
  }

  .m-container__right{
    display: flex;
    align-items: center;
    width: rem(300);
    justify-content: space-evenly;

    .a-log{
        background-color: $orange;
        padding: rem(12) rem(30);
        border: 1px solid $orange;
        transition: all .4s;
        cursor: pointer;
        a{
            text-decoration: none;
            color: white;
            transition: all .4s;
        }
    }

    .a-log:hover {
            background-color: transparent;
            border: 1px solid $orange;
          
            a{
                color: $orange;
            }
    }
    .a-cart{
        display: flex;
        align-items: center;
        gap: rem(10);
        img{
            filter: invert(100%) sepia(4%) saturate(190%) hue-rotate(229deg) brightness(114%) contrast(100%);
        }
    }
  }
}
</style>