<template>
  <div>
    <DrinkDetails :drink="drink"></DrinkDetails>
  </div>
</template>

<script>
import DrinkDetails from '../components/Drinks/DrinkDetails';

export default {
  name: 'Drink',
  components: {
    DrinkDetails
  },
  data() {
    return {
      drink: {
        id: this.$route.params.id
      }
    };
  },
  created() {
    const savedDrinks = localStorage.getItem('drinks')
      ? JSON.parse(localStorage.getItem('drinks'))
      : [];
    let exist = false;
    savedDrinks.map(savedDrink => {
      if (savedDrink.id === this.drink.id) {
        exist = true;
        this.drink = savedDrink;
      }
    });
    if (!exist) {
      this.$http
        .get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.$route.params.id}`
        )
        .then(
          res => {
            console.log(res.body.drinks[0]);
            const data = res.body.drinks[0];
            const ingredients = [];
            const incstructions = data.strInstructions;
            for (let i = 1; i <= 15; i++) {
              const name = data[`strIngredient${i}`];
              const measure = data[`strMeasure${i}`];
              if (name) ingredients.push({ name, measure });
            }

            this.drink = {
              id: data.idDrink,
              name: data.strDrink,
              image: data.strDrinkThumb,
              glass: data.strGlass,
              ingredients,
              incstructions,
              alcoholic: data.strAlcoholic,
              category: data.strCategory
            };

            savedDrinks.push(this.drink);
            localStorage.setItem('drinks', JSON.stringify(savedDrinks));
          },
          err => console.log(err)
        );
    }
  }
};
</script>

<style>
</style>