<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import 'normalize.css';

export default {
  name: 'App',
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
