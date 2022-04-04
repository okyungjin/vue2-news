<template>
  <div>
    <UserProfile :userInfo="userInfo">
      <div slot="userName">{{ userInfo.id }}</div>
      <template slot="time">{{ userInfo.created }}</template>
      <div slot="karma">{{ userInfo.karma }}</div>
    </UserProfile>
  </div>
</template>

<script>
import UserProfile from '../components/UserProfile.vue';

export default {
  components: { UserProfile },
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
