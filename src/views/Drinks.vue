<template>
  <!-- <div>
    <h1>Drnks here</h1>
    {{ ownedIngredients }}
    Width: {{ window.width }}, Height: {{ window.height }}
    <ul class="box">
      <template v-for="(drink, index) in drinks">
        <DrinkCard
          :key="drink.idDrink"
          :data="drink"
          v-if="index < amount"
        ></DrinkCard>
      </template>
    </ul>
  </div> -->
  <div class="container">
    <h1>Drnks here</h1>
    {{ ownedIngredients }}
    Width: {{ window.width }}, Height: {{ window.height }}

    <DrinksBox :drinks="drinks" :amount="amount"></DrinksBox>
  </div>
</template>

<script>
import DrinksBox from '../components/Drinks/DrinksBox';

export default {
  name: 'Drinks',
  components: {
    DrinksBox
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0
      },
      amount: 3,
      amountToAdd: 3
    };
  },
  methods: {
    scroll() {
      let bottomOfWindow =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight +
          100 >
        document.documentElement.offsetHeight;
      // console.log(
      //   Math.max(
      //     window.pageYOffset,
      //     document.documentElement.scrollTop,
      //     document.body.scrollTop
      //   ),
      //   window.innerHeight,
      //   document.documentElement.offsetHeight
      // );
      if (bottomOfWindow) {
        this.amount += this.amountToAdd;
      }
      if (this.amount > this.drinks.length) {
        window.removeEventListener('scroll', this.scroll);
      }
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      this.amountToAdd =
        this.window.width < 768 ? 3 : this.window.width < 1024 ? 6 : 12;
    }
  },
  computed: {
    ownedIngredients() {
      return this.$store.state.ownedIngredients;
    },

    drinks() {
      return { name: 'All drinks', drinks: this.$store.state.avilableDrinks };
    }
  },
  created() {
    // this.$store.dispatch("addDrinks");
    this.$store.dispatch('addDrinks');
    window.addEventListener('scroll', this.scroll);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.amount =
      this.window.width < 768 ? 3 : this.window.width < 1024 ? 6 : 12;
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll);
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style lang="scss" scoped>
</style>
