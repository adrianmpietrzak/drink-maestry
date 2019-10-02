import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ingredients: [],
    ownedIngredients: [],
    avilableDrinks: []
  },
  mutations: {
    setIngredients: (state, ingredients) => {
      state.ingredients = ingredients;
    },

    addIngredient: (state, ingredient) => {
      state.ownedIngredients.push(ingredient);
    },

    removeIngredient: (state, ingredient) => {
      const updatedIngredients = state.ownedIngredients.filter(
        ownedIngredient => ownedIngredient !== ingredient
      );
      state.ownedIngredients = updatedIngredients;
    },

    setOwnedIngredients: (state, ingredients) => {
      state.ownedIngredients = ingredients;
    },

    addDrink: (state, drinks) => {
      console.log(drinks);
      state.avilableDrinks.push(...drinks);
      // const filteredDrinks = [...new Set(state.avilableDrinks)];
      // state.avilableDrinks = filteredDrinks;
    }
  },
  actions: {
    checkStatus: () => {
      return new Promise(resolve => {
        if (!JSON.parse(localStorage.getItem('ingredients'))) {
          Vue.http
            .get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
            .then(
              res => {
                localStorage.setItem('ingredients', JSON.stringify(res.body));
                resolve();
              },
              err => {
                console.log('error', err);
              }
            );
        } else {
          resolve();
        }
      });
    },

    callIngredients: ({ state, dispatch, commit }) => {
      dispatch('checkStatus').then(() => {
        if (state.ingredients.length === 0) {
          commit(
            'setIngredients',
            JSON.parse(localStorage.getItem('ingredients')).drinks
          );
        }
      });
    },

    ingredientHandler: ({ commit }, { ingredient, checked }) => {
      commit(checked ? 'addIngredient' : 'removeIngredient', ingredient);
    },

    saveOwnedIngredients: ({ state }) => {
      localStorage.setItem(
        'ownedIngredients',
        JSON.stringify(state.ownedIngredients)
      );
      // dispatch("addDrinks");
    },

    getOwnedIngredients: ({ commit }) => {
      const ownedIngredient = JSON.parse(
        localStorage.getItem('ownedIngredients')
      );

      if (ownedIngredient) {
        commit('setOwnedIngredients', ownedIngredient);
      }
    },

    addDrinks: ({ state }) => {
      const tempDrinks = [];
      const promises = [];

      function getUnique(arr, comp) {
        const unique = arr
          .map(e => e[comp])

          // store the keys of the unique objects
          .map((e, i, final) => final.indexOf(e) === i && i)

          // eliminate the dead keys & store unique objects
          .filter(e => arr[e])
          .map(e => arr[e]);

        return unique;
      }

      state.ownedIngredients.map(ingredient => {
        const promise = new Promise(resolve => {
          if (!localStorage.getItem([ingredient])) {
            Vue.http
              .get(
                `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
              )
              .then(res => {
                localStorage.setItem(
                  [ingredient],
                  JSON.stringify(res.body.drinks)
                );
                tempDrinks.push(...res.body.drinks);
                resolve();
              });
          } else {
            tempDrinks.push(...JSON.parse(localStorage.getItem([ingredient])));
            resolve();
          }
        });
        promises.push(promise);
      });
      Promise.all(promises).then(() => {
        const uniqueDrinks = getUnique(tempDrinks, 'strDrink');
        console.log('addDrinks prmise');
        state.avilableDrinks = uniqueDrinks;
      });
    }
  }
});
