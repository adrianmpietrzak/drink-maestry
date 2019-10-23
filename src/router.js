import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/drinks',
      name: 'drinks',
      component: () =>
        import(/* webpackChunkName: "drinks" */ './views/Drinks.vue')
    },
    {
      path: '/drinks/:id',
      name: 'Drink',

      component: () =>
        import(/* webpackChunkName: "ingredients" */ './views/Drink.vue')
    }
  ]
});
