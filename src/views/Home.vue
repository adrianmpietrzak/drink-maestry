<template>
  <div class="home">
    <div class="random-drinks">
      <template v-if="drinksLoaded === 4">
        <DrinksBox :drinks="randomDrinks" />
      </template>
      <template v-else>
        <div class="loader__wrapper">
          <div class="loader"></div>
        </div>
      </template>
    </div>

    <template v-if="ingredientDrinks">
      <DrinksBox :drinks="ingredientDrinks" />
    </template>
    <!-- <div class="popup" v-show="popupVisibile">
      <IngredientsList :ingredients="allIngredients" />
      <button class="popup__close" @click="hideIngredients">x</button>
    </div> -->
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
      randomDrinks: {
        name: 'Random Drinks',
        drinks: []
      },
      randomDrinksToShow: 4,
      drinksLoaded: 0,
      ingredientDrinks: null
    };
  },
  watch: {
    randomDrinks: {
      handler() {
        this.drinksLoaded++;
      },
      deep: true
    }
  },
  created() {
    // Get random drinks
    for (let i = 0; i < this.randomDrinksToShow; i++) {
      this.$http
        .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(res => {
          const randomDrink = res.body.drinks[0];
          const ifExist = this.randomDrinks.drinks.some(
            drink => drink.idDrink === randomDrink.idDrink
          );
          if (!ifExist) {
            this.randomDrinks.drinks.push(randomDrink);
          } else {
            i--;
          }
        });
    }

    if (this.ownedIngredients.length > 0) {
      const randomIngredient = this.ownedIngredients[
        Math.floor(Math.random() * this.ownedIngredients.length)
      ];
      const randomIngredientDrinks = [];
      console.log(randomIngredient);
      const drinks = JSON.parse(localStorage.getItem([randomIngredient]));
      const drinksToShow = drinks.length > 4 ? 4 : drinks.length;
      for (let i = 0; i < drinksToShow; i++) {
        const drink = drinks[Math.floor(Math.random() * drinks.length)];
        let exist = false;
        randomIngredientDrinks.map(el => {
          if (el.idDrink === drink.idDrink) {
            exist = true;
          }
        });
        if (!exist) {
          randomIngredientDrinks.push(drink);
        } else {
          i--;
        }
      }
      this.ingredientDrinks = {
        name: randomIngredient,
        drinks: randomIngredientDrinks
      };
    }
  },
  computed: {
    // allIngredients() {
    //   return this.$store.state.ingredients;
    // },

    ownedIngredients() {
      return this.$store.state.ownedIngredients;
    }

    // popupVisibile() {
    //   return this.$store.state.displayIngredients;
    // }

    // Get drinks from owned ingredients
    // ingredientDrinks() {
    //   if (this.ownedIngredients.length > 0) {
    //     const randomIngredient = this.ownedIngredients[
    //       Math.floor(Math.random() * this.ownedIngredients.length)
    //     ];
    //     const randomIngredientDrinks = [];
    //     console.log(randomIngredient);
    //     const drinks = JSON.parse(localStorage.getItem([randomIngredient]));
    //     const drinksToShow = drinks.length > 4 ? 4 : drinks.length;
    //     for (let i = 0; i < drinksToShow; i++) {
    //       const drink = drinks[Math.floor(Math.random() * drinks.length)];
    //       let exist = false;
    //       randomIngredientDrinks.map(el => {
    //         if (el.idDrink === drink.idDrink) {
    //           exist = true;
    //         }
    //       });
    //       if (!exist) {
    //         randomIngredientDrinks.push(drink);
    //       } else {
    //         i--;
    //       }
    //     }
    //     return {
    //       name: randomIngredient,
    //       drinks: randomIngredientDrinks
    //     };
    //   } else {
    //     return null;
    //   }
    // }
  }
  // methods: {
  //   ...mapMutations(['hideIngredients'])
  // }
};
</script>

<style lang="scss">
.home {
  max-width: 1170px;
  margin: 0 auto;
}
</style>
