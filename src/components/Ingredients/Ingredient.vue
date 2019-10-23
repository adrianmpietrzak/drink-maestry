<template>
  <li class="ingredient">
    <input
      type="checkbox"
      :id="ingredient"
      @click="checkIngredient"
      v-model="owned"
    />
    <label class="ingredient__label" :for="ingredient">{{ ingredient }}</label>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Ingredient',
  props: {
    ingredient: String
  },
  data() {
    return {
      owned: false
    };
  },
  created() {
    const ownedIngr = JSON.parse(localStorage.getItem('ownedIngredients'));
    this.owned = ownedIngr ? ownedIngr.includes(this.ingredient) : false;
  },
  methods: {
    ...mapActions(['ingredientHandler']),

    checkIngredient(event) {
      this.ingredientHandler({
        ingredient: this.ingredient,
        checked: event.target.checked
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ingredient {
  flex: 1 0 100%;
  padding: 2px 0;

  &:hover {
    background-color: $second-color;
    color: $first-color;
  }
}

.ingredient__label {
  padding: 0 5px;
  cursor: pointer;
}

@media (min-width: $breakpoint-tablet) {
  .ingredient {
    flex: 1 0 50%;
  }
}

@media (min-width: $breakpoint-desktop) {
  .ingredient {
    flex: 1 0 25%;
  }
}
</style>