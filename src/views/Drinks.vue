<template>
  <div class="container">
    <!-- To do - change this view to display 2 tabs all drinks from owned ingredients / all drinks -->
    <DrinksBox
      v-if="drinks.drinks.length > 0"
      :drinks="drinks"
      :amount="amount"
    ></DrinksBox>
    <h2 v-else>Choose some ingredients (temporary message)</h2>
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
      return {
        name: 'Drinks from owned ingredients',
        drinks: this.$store.state.avilableDrinks
      };
    }
  },

  created() {
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
