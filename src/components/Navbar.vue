<template>
  <div class="nav">
    <div class="nav__menu">
      <router-link class="nav__link" to="/">Home</router-link>
      <router-link class="nav__link" to="/about">About</router-link>
    </div>
    <button class="nav__ingrediets" @click="showIngredients">
      Ingredients
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'Navbar',
  methods: {
    ...mapMutations(['showIngredients'])
  }
};
</script>

<style lang="scss">
.nav {
  background-color: $first-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav__menu {
  display: flex;
}

.nav__link {
  color: $second-color;
  text-decoration: none;
  padding: 20px;

  &:hover {
    background-color: $second-color;
    color: $first-color;
  }
}

.nav__ingrediets {
  display: flex;
  padding: 20px;
  border: none;
  background: none;
  color: $second-color;
  cursor: pointer;

  &:hover {
    background-color: $second-color;
    color: $first-color;
  }
}
</style>