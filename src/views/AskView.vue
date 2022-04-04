<template>
  <div>
    <p v-for="ask in asks" :key="ask.id">
      <router-link :to="`items/${ask.id}`">{{ ask.title }}</router-link>
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
