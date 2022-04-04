<template>
  <div>
    <UserProfile :userInfo="userInfo">
      <div slot="userName">{{ userInfo.id }}</div>
      <span slot="time">{{ 'Joined ' + userInfo.created }}</span>
      <span slot="karma">{{ userInfo.karma }}</span>
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
