<template>
  <base-spinner v-if="isLoading"></base-spinner>
  <the-header></the-header>
  <router-view></router-view>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from './components/layout/TheFooter.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'App',
  components: { TheHeader, TheFooter },
  setup() {
    const store = useStore();
    store.dispatch('tryLogin');
    store.dispatch('profiles/get');
    store.dispatch('countries/get');
    store.dispatch('fields/get');
    const isLoading = computed(() => store.getters['loading']);

    return {
      isLoading
    }
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Rubik:wght@400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
