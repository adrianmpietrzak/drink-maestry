<template>
  <div class="nav">
    <div class="nav__menu">
      <router-link class="nav__link" to="/">Home</router-link>
      <router-link class="nav__link" to="/drinks">Drinks</router-link>
    </div>
    <button class="nav__ingrediets" @click="showIngredients">
      Ingredients
      <span class="nav__ingrediets-counter">{{
        $store.state.ownedIngredients.length
      }}</span>
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
  position: relative;
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

.nav__ingrediets-counter {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.625rem;
  background: $third-color;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $second-color;
}
</style>