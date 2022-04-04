<template>
  <div>
    <p v-for="job in jobs" :key="job.id">
      <router-link :to="job.url">{{ job.title }}</router-link>
      <small>{{ job.time_age }} {{ job.domain }}</small>
    </p>
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
