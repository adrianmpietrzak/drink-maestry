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
  name: 'App'
};
</script>

<style lang="scss">
.black {
  color: #000;
}
</style>
