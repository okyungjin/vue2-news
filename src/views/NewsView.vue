<template>
  <div>
    <div v-for="user in users" :key="user.id">{{ user.title }}</div>
  </div>
</template>

<script>
import { fetchNewsList } from '../api/index';

export default {
  created() {
    fetchNewsList()
      .then((res) => { this.users = res.data; })
      .catch((err) => throw new Error(err));
  },
  data() {
    return {
      users: [],
    };
  },
};
</script>
