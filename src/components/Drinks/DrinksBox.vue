<template>
  <ul class="box">
    <div class="box__category">
      <h2 class="box__category-name">{{ drinks.name }}</h2>
    </div>
    <!-- <strong>amount - {{ amount }} </strong> -->
    <template v-for="(drink, index) in drinks.drinks">
      <DrinkCard
        :key="drink.idDrink"
        :data="drink"
        v-if="index < amount"
      ></DrinkCard>
    </template>
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
    drinks: Object,
    amount: { type: Number, default: 4 }
  }
};
</script>

<style lang="scss" scoped>
.box {
  background: $first-color;
  padding: 20px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  margin: 40px 0;
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
  z-index: 1;
}

.box__category-name {
  font-size: 1.25rem;
  margin: 0;
}
</style>
