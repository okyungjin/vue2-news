<template>
  <div>
    <p>{{ userInfo.id }}</p>
    <p>{{ userInfo.karma }}</p>
    <p>{{ userInfo.created }}</p>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('FETCH_USER', this.userName);
  },
  computed: {
    userName() {
      return this.$route.params.id;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>
