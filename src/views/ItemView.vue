<template>
  <div>
    <section>
      <UserProfile :user-info="itemInfo">
        <div slot="userName">{{ itemInfo.user }}</div>
        <template slot="time">{{ itemInfo.time_ago }}</template>
      </UserProfile>
    </section>
    <section>
      <h1>{{ itemInfo.title }}</h1>
      <div v-html="itemInfo.content"></div>
      <ul v-for="comment in itemInfo.comments" :key="comment.id">
        <li v-html="comment.content"></li>
      </ul>
    </section>
  </div>
</template>

<script>
import UserProfile from '../components/UserProfile.vue';

export default {
  components: { UserProfile },
  created() {
    this.$store.dispatch('FETCH_ITEM', this.itemId);
  },
  computed: {
    itemId() {
      return this.$route.params.id;
    },
    itemInfo() {
      return this.$store.state.itemInfo;
    },
  },
};
</script>

<style scoped>
.user-container {
  display: flex;
  align-items: center;
}
.user-description {
  padding-left: 8px;
}
.time {
  font-size: 0.7rem;
}
</style>
