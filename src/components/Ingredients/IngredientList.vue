<template>
  <div class="ingredients">
    <h2>Ingredients List:</h2>
    <div class="ingredients__search-wrapper">
      <input
        class="ingredients__search"
        type="text"
        name="search-ingredient"
        id="search-ingredient"
        placeholder="Search for ingredient"
        v-model="search"
      />
      <button class="ingredients__search-close" @click="search = ''">x</button>
    </div>
    <ul class="ingredients__list">
      <template v-for="ingredient in ingredients">
        <Ingredient
          :key="ingredient.strIngredient1"
          :ingredient="ingredient.strIngredient1"
          v-if="
            ingredient.strIngredient1
              .toLowerCase()
              .includes(search.toLowerCase())
          "
        />
      </template>
    </ul>
  </div>
</template>

<script>
import Ingredient from './Ingredient';

export default {
  name: 'IngredientsList',
  props: {
    ingredients: Array
  },
  data() {
    return {
      search: ''
    };
  },
  components: {
    Ingredient
  }
};
</script>

<style lang="scss" scoped>
.ingredients {
  padding: 40px;
}

.ingredients__list {
  padding: 0;
  margin: 0;
  margin-top: 10px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

.ingredients__search-wrapper {
  position: relative;
  display: inline-block;
}

.ingredients__search {
  padding: 10px;
  min-width: 300px;
}

.ingredients__search-close {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  color: $first-color;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    color: red;
  }
}
</style>