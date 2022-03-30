<template>
  <div>
    <div v-for="job in jobs" :key="job.id">{{ job.title }}</div>
  </div>
</template>

<script>
import { fetchJobsList } from '../api/index';

export default {
  created() {
    fetchJobsList()
      .then((res) => { this.jobs = res.data; })
      .catch((err) => throw new Error(err));
  },
  data() {
    return {
      jobs: [],
    };
  },
};
</script>
