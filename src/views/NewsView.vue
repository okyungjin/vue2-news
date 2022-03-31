<template>
  <div>
    <p v-for="aNews in news" :key="aNews.id">
      <a :href="aNews.url">{{ aNews.title }}</a>
      <small>{{ aNews.time_ago }} {{ aNews.user }}</small>
    </p>
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
