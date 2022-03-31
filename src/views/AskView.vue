<template>
  <div>
    <p v-for="ask in asks" :key="ask.id">
      <a :href="ask.url">{{ ask.title }}</a>
      <small>{{ ask.time_ago }} {{ ask.user }}</small>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  created() {
    this.$store.dispatch('FETCH_ASKS');
  },
  computed: {
    ...mapState(['asks']),
  },
};
</script>
