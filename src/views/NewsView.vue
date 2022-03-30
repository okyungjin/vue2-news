<template>
  <div>
    <div v-for="aNews in news" :key="aNews.id">{{ aNews.title }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  created() {
    this.$store.dispatch('FETCH_NEWS');
  },
  computed: {
    ...mapState(['news']),
  },
};
</script>
