<template>
  <div>
    <div v-for="ask in asks" :key="ask.id">{{ ask.title }}</div>
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
