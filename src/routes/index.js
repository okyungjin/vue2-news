import VueRouter from 'vue-router';
import Vue from 'vue';
import ItemView from '../views/ItemView.vue';
import UserView from '../views/UserView.vue';
import createListView from '../views/createListView';
import NewsView from '../views/NewsView.vue';
import JobsView from '../views/JobsView.vue';
import { START_SPINNER } from '../utils/spinner';
import { bus } from '../utils/bus';
import { store } from '../store';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: NewsView,
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView,
      beforeEnter: (to, _, next) => {
        bus.$emit(START_SPINNER);
        store.dispatch('FETCH_LIST', to.name)
          .then(() => next())
          .catch((error) => throw new Error(error));
      },
    },
    {
      path: '/ask',
      name: 'ask',
      component: createListView('AskView'), // HOC
      beforeEnter: (to, _, next) => {
        bus.$emit(START_SPINNER);
        store.dispatch('FETCH_LIST', to.name)
          .then(() => next())
          .catch((error) => throw new Error(error));
      },
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsView,
      beforeEnter: (to, _, next) => {
        bus.$emit(START_SPINNER);
        store.dispatch('FETCH_LIST', to.name)
          .then(() => next())
          .catch((error) => throw new Error(error));
      },
    },
    {
      path: '/items/:id',
      component: ItemView,
    },
    {
      path: '/users/:id',
      component: UserView,
    },
  ],
});
