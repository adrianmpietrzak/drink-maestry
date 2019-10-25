<template>
  <div id="app">
    <Navbar />
    <keep-alive include="Drinks" v-if="ownedIngredients.length > 0">
      <router-view />
    </keep-alive>

    <router-view v-else />

    <div class="popup" v-show="popupVisibile">
      <IngredientsList :ingredients="allIngredients" />
      <button class="popup__close" @click="hideIngredients">x</button>
    </div>
  </div>
</template>

<script>
import 'normalize.css';
import Navbar from './components/Navbar';
import IngredientsList from './components/Ingredients/IngredientList';
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar,
    IngredientsList
  },
  beforeCreate() {
    this.$store.dispatch('callIngredients');
    this.$store.dispatch('getOwnedIngredients');
  },
  computed: {
    allIngredients() {
      return this.$store.state.ingredients;
    },

    ownedIngredients() {
      return this.$store.state.ownedIngredients;
    },

    popupVisibile() {
      return this.$store.state.displayIngredients;
    }
  },
  methods: {
    ...mapMutations(['hideIngredients'])
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

.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.9);
  color: $second-color;
  overflow: scroll;
  z-index: 999;
}

.popup__close {
  position: fixed;
  right: 40px;
  top: 40px;
  color: $second-color;
  border: none;
  background: none;
  font-size: 1.25rem;
  cursor: pointer;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;

  &:hover {
    // color: $first-color;
    // background-color: $second-color;
    color: $third-color;
  }
}
</style>
