<template>
  <div>
    <div v-for="news in newsList" :key="news.id">{{ news.title }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  created() {
    this.$store.dispatch('FETCH_NEWS');
  },
  computed: {
    ...mapState(['newsList']),
  },
};
</script>
