<template>
  <li class="drink">
    <router-link :to="`/drinks/${data.idDrink}`" class="drink__link">
      <strong class="drink__name">{{ data.strDrink }}</strong>
      <img
        class="drink__image"
        :src="data.strDrinkThumb"
        :alt="data.strDrink"
      />
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'DrinkCard',
  props: {
    data: Object
  }
};
</script>

<style lang="scss" scoped>
.drink {
  flex: 1 0 calc(100% - 20px);
  padding: 20px;
  margin: 10px;
  background: $second-color;
}

.drink__link {
  display: flex;
  position: relative;
}

.drink__link:hover .drink__name {
  max-height: 100%;
}

.drink__name {
  position: absolute;
  bottom: 0;
  color: #fff;
  background-color: rgba($color: #000000, $alpha: 0.75);
  width: 100%;
  height: 100%;
  max-height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  padding: 10px;
}

.drink__image {
  max-height: 300px;
  width: 100%;
  object-fit: cover;
}

@media (min-width: 768px) {
  .drink {
    flex: 1 0 calc(50% - 20px);
  }
}

@media (min-width: 1024px) {
  .drink {
    flex: 1 0 calc(25% - 20px);
  }
}
</style>
