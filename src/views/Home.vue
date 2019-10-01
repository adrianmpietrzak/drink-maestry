<template>
  <div class="home">
    <h1>Welcome to Your Vue.js App</h1>
    <template v-if="drinksLoaded === 4">
      <DrinksBox :drinks="randomDrinks" />
    </template>
    <template v-else>
      <div class="loader"></div>
    </template>
  </div>
</template>

<script>
import DrinksBox from '../components/Drinks/DrinksBox';

export default {
  name: 'Home',
  components: {
    DrinksBox
  },
  data() {
    return {
      randomDrinks: [],
      randomDrinksToShow: 4,
      drinksLoaded: 0
    };
  },
  watch: {
    randomDrinks() {
      this.drinksLoaded++;
    }
  },
  beforeMount() {
    // Get random drinks
    for (let i = 0; i < this.randomDrinksToShow; i++) {
      this.$http
        .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(res => {
          const randomDrink = res.body.drinks[0];
          const ifExist = this.randomDrinks.some(
            drink => drink.idDrink === randomDrink.idDrink
          );
          if (!ifExist) {
            this.randomDrinks.push(randomDrink);
          } else {
            i--;
          }
        });
    }
  }
};
</script>
