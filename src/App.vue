<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import 'normalize.css';
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar
  },
  beforeCreate() {
    this.$store.dispatch('callIngredients');
    this.$store.dispatch('getOwnedIngredients');
  }
};
</script>

<style lang="scss">
body {
  background-color: $second-color;
}

.black {
  color: #000;
}
</style>
