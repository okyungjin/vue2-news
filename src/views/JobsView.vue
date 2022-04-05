<template>
  <div>
    <ListItem></ListItem>
  </div>
</template>

<script>
import ListItem from '../components/ListItem.vue';
import { spinnerMixin } from '../mixins/spinnerMixin';

export default {
  components: {
    ListItem,
  },
  mixins: [spinnerMixin],
};
</script>
