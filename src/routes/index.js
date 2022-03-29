import VueRouter from 'vue-router';
import Vue from 'vue';
import NewsView from '../views/NewsView.vue';
import AskView from '../views/AskView.vue';
import JobsView from '../views/JobsView.vue';
import ItemsView from '../views/ItemsView.vue';
import UsersView from '../views/UsersView.vue';

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
      component: NewsView,
    },
    {
      path: '/ask',
      component: AskView,
    },
    {
      path: '/jobs',
      component: JobsView,
    },
    {
      path: '/items',
      component: ItemsView,
    },
    {
      path: '/users',
      component: UsersView,
    },
  ],
});
