<template>
  <div class="drink">
    <div class="drink__image-wrapper">
      <img class="drink__image" :src="drink.image" :alt="drink.name" />
    </div>
    <div class="drink__information">
      <h1>{{ drink.name }}</h1>
      <span class="drink__subtitle">Ingredients:</span>
      <ul>
        <li
          v-for="ingredient in drink.ingredients"
          :key="ingredient.ingredientName"
        >
          {{ ingredient.name }} - {{ ingredient.measure }}
        </li>
      </ul>
      <span class="drink__subtitle">Instruction:</span>
      <p>{{ drink.incstructions }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DrinkDetails',
  props: {
    drink: Object
  }
};
</script>

<style lang="scss">
.drink {
  max-width: 1170px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}

.drink__image-wrapper {
  display: flex;
  flex: 1 0 100%;
  max-height: 300px;
}

.drink__image {
  width: 100%;
  object-fit: cover;
  object-position: top;
}

.drink__information {
  flex: 1 0 100%;
  bottom: 0;
  padding: 40px;
  // background-color: rgba($color: $second-color, $alpha: 0.75);
  // color: $first-color;
  // background-color: rgba($color: $first-color, $alpha: 0.75);
  // color: $second-color;
  background-color: $first-color;
  color: $second-color;
}

.drink__subtitle {
  font-size: 1.25rem;
}

@media (min-width: $breakpoint-tablet) {
  .drink__image-wrapper,
  .drink__information {
    flex: 1 0 50%;
  }

  .drink__image-wrapper {
    max-height: 100%;
  }
}

@media (min-width: $breakpoint-desktop) {
  .drink {
    margin-top: 20px;
  }
}
</style>