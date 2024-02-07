<template>
    <header>
        <div class="navbar">
            <div class="logo"><router-link :to="{ name: 'home' }"><img src="@/assets/logo.jpg"></router-link></div>
            <ul class="links">
                <li> <router-link class="link" :to="{ name: 'home' }">Home</router-link></li>
                <li> <router-link class="link" :to="{ name: 'contact' }">Contact</router-link></li>
            </ul>
            <router-link class="action_btn" :to="{ name: 'login' }"><i
                    class="fa-solid fa-right-to-bracket"></i>Login</router-link>
            <div class="toggle_btn" @click="toggleOpenMobileNav">
                <i :class="[isOpenMobileNav ? 'fa-solid fa-xmark' : 'fa-solid fa-bars']"></i>
            </div>
        </div>

        <transition name="dropdown_menu">
            <div class="dropdown_menu" v-if="isOpenMobileNav">
                <div class="logo"><router-link :to="{ name: 'home' }"><img src="@/assets/logo.jpg"></router-link></div>
                <li> <router-link class="link" :to="{ name: 'home' }">Home</router-link></li>
                <li> <router-link class="link" :to="{ name: 'contact' }">Contact</router-link></li>
                <li> <router-link class="link" :to="{ name: 'login' }">Login</router-link></li>
            </div>
        </transition>
    </header>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {

        const isOpenMobileNav = ref(false);

        function toggleOpenMobileNav() {
            isOpenMobileNav.value = !isOpenMobileNav.value;
        }

        return {
            isOpenMobileNav,
            toggleOpenMobileNav
        }
    }
}
</script>

<style scoped>
li {
    list-style: none;
}

a {
    text-decoration: none;
    color: #0A1229;
    font-weight: 500;
    font-size: 1rem;
    font-family: "Rubik", sans-serif;
}

.link:hover {
    color: #1F9F96;
}

/* HEADER */
header {
    position: relative;
    padding: 0 2rem;
}

.navbar {
    width: 100%;
    height: 100px;
    padding: 1rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.logo {
    height: 60px;
}

.logo a {
    height: 100%;
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
}

.logo img {
    height: 100%;
    transition: 0.5s ease all;
}

.navbar .links {
    display: flex;
    gap: 2rem;
}

.navbar .toggle_btn {
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
}

.navbar .toggle_btn i {
    color: #1F9F96;
}

.action_btn {
    background-color: #1F9F96;
    color: #fff;
    width: 10rem;
    height: 3rem;
    padding: 0.5rem 1rem;
    border: none;
    outline: none;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
}

/* DROP MENU */
.dropdown_menu {
    position: fixed;
    top:0;
    left:0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 300px;
    overflow: hidden;
    background-color: white;
    box-shadow: 0.5px 0 0.5rem #888888;
    padding-top: 2rem;
}

.dropdown_menu-enter-from,
.dropdown_menu-leave-to {
    transform: translateX(-100%);
}

.dropdown_menu-enter-active {
    transition: 0.8s ease all;
}

.dropdown_menu-leave-active {
    transition: 0.8s ease all;
}

.dropdown_menu-enter-to,
.dropdown_menu-leave-from {
    transform: translateX(0);
}

.dropdown_menu li {
    padding: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width:100%;
   border-bottom: 1px solid #ececec;
}

.dropdown_menu .action_btn {
    width: 100%;
    display: flex;
    justify-content: center;
}

/* RESPONSIVE DESIGN */
@media (max-width: 992px) {

    .navbar .links,
    .navbar .action_btn {
        display: none;
    }

    .navbar .toggle_btn {
        display: block;
    }

}

section#hero {
    height: calc(100vh - 60px);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #fff;
}

#hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}
</style>