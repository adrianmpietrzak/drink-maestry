<template>
  <div class="ingredients">
    <h1>Checked - {{ checked }}</h1>
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
    <div class="filters">
      <h3>Search in:</h3>
      <div class="filter">
        <input
          type="radio"
          name="search-in"
          value="all"
          id="all"
          v-model="searchIn"
        />
        <label class="filter__label" for="all">all</label>
      </div>
      <div class="filter">
        <input
          type="radio"
          name="search-in"
          value="owned"
          id="owned"
          v-model="searchIn"
        />
        <label class="filter__label" for="owned">owned</label>
      </div>
      <div class="filter">
        <input
          type="radio"
          name="search-in"
          value="notowned"
          id="notowned"
          v-model="searchIn"
        />
        <label class="filter__label" for="notowned">not owned</label>
      </div>
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
      search: '',
      searchIn: 'all'
    };
  },
  components: {
    Ingredient
  },
  computed: {
    checked() {
      this.$store.state.ownedIngredients;
    }
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
  // display: inline-block;
}

.ingredients__search {
  padding: 10px;
  // min-width: 300px;
  width: 100%;
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
    color: $third-color;
  }
}

.filters {
  display: flex;
  align-items: center;
}

.filter {
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.filter__label {
  padding-left: 5px;
  font-size: 0.875rem;
  cursor: pointer;
}
</style>