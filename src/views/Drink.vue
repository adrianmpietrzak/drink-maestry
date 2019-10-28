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
          `${process.env.VUE_APP_APIURL}lookup.php?i=${this.$route.params.id}`
        )
        .then(
          res => {
            const data = res.body.drinks[0];
            const ingredients = [];
            const instructions = data.strInstructions;
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
              instructions,
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