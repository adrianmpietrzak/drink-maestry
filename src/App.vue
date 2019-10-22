<template>
  <div id="app">
    <Navbar />
    <router-view />
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
