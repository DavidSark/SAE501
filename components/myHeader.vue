<script setup>
import { useGlobalStore } from '@/stores/global'
const store = useGlobalStore()
const route = useRouter()

const isLoggedIn = computed(() => {
    return store.token && store.token !== '';
});

const isLoggedCart = computed(() =>{
    if(store.token == null){
        route.push('/register')
    }else{
        route.push('/profile')
    }
})

</script>

<template>
    <div class="o-container">
        <div class="m-container__left">
            <div class="a-container-logo">
                <nuxt-link to="/">

                    <img src="/icons/logo.svg" alt="logo">
                    <h1>hourglass</h1>
                </nuxt-link>


            </div>
            <div class="a-container-txt">
                <nuxt-link to="/montre">
                    <div>produits</div>
                </nuxt-link>
                <nuxt-link to="/montre/creation" v-if="store.token != null">
                    <div>custimiser</div>
                </nuxt-link>
            
            </div>
        </div>
        <div class="m-container__right">
            
            <div class="a-log" v-if="store.token != null">
                <myButton lien="/profile">Profil</myButton>
            </div>

            <div class="a-cart" v-if="store.token != null">
                <img src="/icons/shopping-bag.svg" alt="">
                <div>
                    <nuxt-link to="/profile">Cart</nuxt-link>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.o-container {
    z-index: 9999;
    background-color: $white;
    font-family: $font-poppins;
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    padding: rem(20) rem(80);
    font-weight: 200;
    .m-container__left {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 50%;
        color: $black;
        text-transform: uppercase;
      
        .a-container-logo {
            a {
                color: inherit;
                text-decoration: none;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                img {
                    width: rem(20);
                    filter: invert(14%) sepia(11%) saturate(405%) hue-rotate(190deg) brightness(96%) contrast(89%);
                }

                h1 {
                    text-transform: uppercase;
                    margin-top: rem(5);
                    font-size: rem(20)
                }
            }


        }

        .a-container-txt {
            display: flex;
            gap: rem(60);
            margin-right: rem(0);

            a {
                color: inherit;
                text-decoration: none;

                * {
                    border-bottom: 1px solid transparent;
                    cursor: pointer;
                    transition: border-color .4s ease;

                }

                :hover {
                    border-color: $black;
                }
            }


        }
    }


    .m-container__right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 50%;
        gap: rem(80);
        text-transform: uppercase;

        .a-cart {
            display: flex;
            align-items: center;
            gap: rem(10);

            padding: rem(8) rem(20);
            cursor: pointer;
            a{
                all: inherit;
            }
        }
    }
}</style>