<template>
  <div>
    <p v-for="aNews in news" :key="aNews.id">
      <a :href="aNews.url">{{ aNews.title }}</a>
      <small>
        {{ aNews.time_ago }} by
        <router-link :to="`/users/${aNews.user}`">{{ aNews.user }}</router-link>
      </small>
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
