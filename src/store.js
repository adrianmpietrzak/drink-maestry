import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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

export default new Vuex.Store({
  state: {
    ingredients: [],
    ownedIngredients: [],
    avilableDrinks: [],
    displayIngredients: false,
    allDrinks: []
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
      state.avilableDrinks.push(...drinks);
    },

    hideIngredients: state => {
      state.displayIngredients = false;
    },

    showIngredients: state => {
      state.displayIngredients = true;
    }
  },

  actions: {
    checkStatus: () => {
      return new Promise(resolve => {
        if (!JSON.parse(localStorage.getItem('ingredients'))) {
          Vue.http.get(`${process.env.VUE_APP_APIURL}list.php?i=list`).then(
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

    ingredientHandler: (
      { commit, state, dispatch },
      { ingredient, checked }
    ) => {
      commit(checked ? 'addIngredient' : 'removeIngredient', ingredient);

      if (!localStorage.getItem([ingredient])) {
        dispatch('addDrinks');
      }

      localStorage.setItem(
        'ownedIngredients',
        JSON.stringify(state.ownedIngredients)
      );
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

      state.ownedIngredients.map(ingredient => {
        const promise = new Promise(resolve => {
          if (!localStorage.getItem([ingredient])) {
            Vue.http
              .get(`${process.env.VUE_APP_APIURL}filter.php?i=${ingredient}`)
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
        state.avilableDrinks = uniqueDrinks;
      });
    },

    loadDrinks: ({ state }, letter) => {
      if (
        localStorage.getItem([letter]) &&
        localStorage.getItem([letter]) !== 'null'
      ) {
        state.allDrinks.push(...JSON.parse(localStorage.getItem([letter])));
      } else {
        Vue.http
          .get(`${process.env.VUE_APP_APIURL}search.php?f=${letter}`)
          .then(res => {
            localStorage.setItem([letter], JSON.stringify(res.body.drinks));
            if (res.body.drinks) {
              state.allDrinks.push(...res.body.drinks);
            }
          });
      }
    }
  }
});
