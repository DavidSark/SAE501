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
                    <div>products</div>
                </nuxt-link>
                <nuxt-link to="/montre/creation">
                    <div>customize</div>
                </nuxt-link>
                 <nuxt-link to="">
                    <div>contact</div>
                </nuxt-link>
            </div>
        </div>
        <div class="m-container__right">
            <div class="a-log" v-if="store.token == null">
                <nuxt-link to="/login">S'inscrire</nuxt-link>
            </div>
            <div class="a-log" v-if="store.token != null">
                <nuxt-link to="/profile">Profile</nuxt-link>
            </div>

            <div class="a-cart" >
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
    background-color: transparent;
    font-family: $font-poppins;
    display: flex;
    justify-content: space-between;
    position: absolute;
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
        color: $white;
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
                    width: rem(20)
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
            margin-right: rem(120);

            a {
                color: inherit;
                text-decoration: none;

                * {
                    border-bottom: 1px solid transparent;
                    cursor: pointer;
                    transition: border-color .4s ease;

                }

                :hover {
                    border-color: $white;
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

        .a-log {
            background: transparent;
            padding: rem(12) rem(30);
            border: 1px solid $black;

            transition: all .4s;
            cursor: pointer;

            a {
                text-decoration: none;
                color: $black;
                transition: all .4s;

            }
        }

        .a-log:hover {
            background-color: $black;
            border: 1px solid $black;

            a {
                color: $white;
            }
        }

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