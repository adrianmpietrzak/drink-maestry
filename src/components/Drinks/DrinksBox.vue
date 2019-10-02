<template>
  <ul class="box">
    <div class="box__category">
      <h2 class="box__category-name">{{ drinks.name }}</h2>
    </div>
    <DrinkCard
      v-for="drink in drinks.drinks"
      :key="drink.idDrink"
      :data="drink"
    ></DrinkCard>
  </ul>
</template>

<script>
import DrinkCard from './DrinkCard';

export default {
  name: 'DrinksBox',
  components: {
    DrinkCard
  },
  props: {
    drinks: Object
  }
};
</script>

<style lang="scss" scoped>
.box {
  background: $first-color;
  padding: 20px;
  position: relative;
  display: flex;
  list-style: none;
}

.box__category {
  color: $first-color;
  background: $second-color;
  position: absolute;
  top: -28px;
  padding: 10px;
  left: 50%;
  margin: 0;
  transform: translateX(-50%);
}

.box__category-name {
  font-size: 1.25rem;
}
</style>
