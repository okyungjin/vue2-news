import VueRouter from 'vue-router';
import Vue from 'vue';
import ItemView from '../views/ItemView.vue';
import UserView from '../views/UserView.vue';
import createListView from '../views/createListView';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../views/NewsView.vue'),
      // component: createListView('NewsView'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue'),
      // component: createListView('NewsView'),
    },
    {
      path: '/ask',
      name: 'ask',
      component: createListView('AskView'), // HOC
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: () => import('../views/JobsView.vue'),
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
