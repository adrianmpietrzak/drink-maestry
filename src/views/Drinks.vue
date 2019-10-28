<template>
  <div class="container">
    <!-- To do - change this view to display 2 tabs all drinks from owned ingredients / all drinks -->
    <div class="tabs">
      <input
        class="tabs__selector-input"
        type="radio"
        name="selected-ingredients"
        value="all"
        id="all-ingredients"
        v-model="selector"
        @change="changeTab"
      />
      <label class="tabs__selector-label" for="all-ingredients">All</label>
      <input
        class="tabs__selector-input"
        type="radio"
        name="selected-ingredients"
        value="owned"
        id="owned-ingredients"
        v-model="selector"
        @change="changeTab"
      />
      <label class="tabs__selector-label" for="owned-ingredients">Owned</label>
    </div>
    <DrinksBox
      v-if="possibleDrinks.drinks.length > 0"
      :drinks="possibleDrinks"
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
      amountToAdd: 3,
      selector: 'all'
    };
  },
  methods: {
    changeTab() {
      console.log(this.selector);
    },

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
      if (this.amount > this.possibleDrinks.drinks.length) {
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

    possibleDrinks() {
      window.addEventListener('scroll', this.scroll);
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
.tabs {
  margin-top: 30px;
}

.tabs__selector-label {
  background-color: #f2f7f2;
  color: #2a2d34;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.tabs__selector-input {
  display: none;
}

.tabs__selector-input:checked + label {
  background-color: #2a2d34;
  color: #f2f7f2;
}
</style>
