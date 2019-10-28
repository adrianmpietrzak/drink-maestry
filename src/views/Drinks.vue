<template>
  <div class="container">
    <div class="tabs">
      <h2 class="tabs__header">From which ingredients list drinks:</h2>
      <input
        class="tabs__selector-input"
        type="radio"
        name="selected-ingredients"
        value="all"
        id="all-ingredients"
        v-model="selector"
      />
      <label class="tabs__selector-label" for="all-ingredients">All</label>
      <input
        class="tabs__selector-input"
        type="radio"
        name="selected-ingredients"
        value="owned"
        id="owned-ingredients"
        v-model="selector"
      />
      <label class="tabs__selector-label" for="owned-ingredients">Owned</label>
    </div>
    <keep-alive>
      <template v-if="selector === 'owned'">
        <DrinksBox
          v-if="possibleDrinks.drinks.length > 0"
          :drinks="possibleDrinks"
          :amount="amount"
          :selector="selector"
        ></DrinksBox>
        <h3 class="placeholder-message" v-else>
          Choose some ingredients (temporary message)
        </h3>
      </template>
    </keep-alive>
    <keep-alive>
      <template v-if="selector === 'all'">
        <DrinksBox
          :drinks="allDrinks"
          :amount="allAmount"
          :selector="selector"
        ></DrinksBox>
      </template>
    </keep-alive>
  </div>
</template>

<script>
import DrinksBox from '../components/Drinks/DrinksBox';
import { mapActions } from 'vuex';

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
      allAmount: 3,
      amountToAdd: 3,
      selector: 'owned',
      letterIndex: 0,
      letters: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'u',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
      ]
    };
  },
  methods: {
    ...mapActions(['loadDrinks']),

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
        if (this.selector === 'all') {
          this.allAmount += this.amountToAdd;
        } else {
          this.amount += this.amountToAdd;
        }

        if (this.letterIndex <= this.letters.length) {
          this.loadDrinks(this.letters[this.letterIndex]);
          this.letterIndex++;
        }
      }

      if (this.selector === 'owned') {
        if (this.amount > this.possibleDrinks.drinks.length) {
          window.removeEventListener('scroll', this.scroll);
        }
      } else {
        if (this.allAmount > this.allDrinks.drinks.length) {
          window.removeEventListener('scroll', this.scroll);
        }
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
    },

    allDrinks() {
      return {
        name: 'All drinks',
        drinks: this.$store.state.allDrinks
      };
    }
  },

  created() {
    this.$store.dispatch('addDrinks');
    this.loadDrinks(this.letters[this.letterIndex]);
    this.letterIndex++;
    window.addEventListener('scroll', this.scroll);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.amount =
      this.window.width < 768 ? 3 : this.window.width < 1024 ? 6 : 12;
    this.allAmount =
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
  text-align: center;
}

.tabs__header {
  color: $first-color;
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

.placeholder-message {
  color: $first-color;
  text-align: center;
}
</style>
