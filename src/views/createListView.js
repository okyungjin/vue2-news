// HOC
import ListView from './ListView.vue';
import { spinnerMixin } from '../mixins/spinnerMixin';

export default (routeName) => ({
  name: routeName,
  mixins: [spinnerMixin],
  render(createElement) {
    return createElement(ListView);
  },
});
