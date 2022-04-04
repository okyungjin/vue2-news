// HOC
import ListView from './ListView.vue';
import { bus } from '../utils/bus';

export default (routeName) => ({
  name: routeName,
  created() {
    bus.$emit('start:spinner');
    this.$store.dispatch('FETCH_LIST', this.$route.name)
      .then(() => bus.$emit('end:spinner'))
      .catch((error) => throw new Error(error));
  },
  render(createElement) {
    return createElement(ListView);
  },
});
