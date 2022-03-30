<template>
  <div>
    <div v-for="ask in asks" :key="ask.id">{{ ask.title }}</div>
  </div>
</template>

<script>
import { fetchAsksList } from '../api/index';

export default {
  created() {
    fetchAsksList()
      .then((res) => { this.asks = res.data; })
      .catch((err) => throw new Error(err));
  },
  data() {
    return {
      asks: [],
    };
  },
};
</script>
