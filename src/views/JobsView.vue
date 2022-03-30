<template>
  <div>
    <div v-for="job in jobs" :key="job.id">{{ job.title }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  created() {
    this.$store.dispatch('FETCH_JOBS');
  },
  computed: {
    ...mapState(['jobs']),
  },
};
</script>
