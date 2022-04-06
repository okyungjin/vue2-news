import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import { store } from './store/index';
import chartPlugin from './plugins/chartPlugin';

Vue.config.productionTip = false;

Vue.use(chartPlugin);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
