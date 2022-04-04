<template>
  <div>
    <ul class="news-list">
      <li v-for="aNews in news" :key="aNews.id" class="post">
        <div class="points">
          {{ aNews.points }}
        </div>
        <div>
          <p class="news-title">
            <a :href="aNews.url">{{ aNews.title }}</a>
          </p>
          <small class="link-text">
            {{ aNews.time_ago }} by
            <router-link :to="`/users/${aNews.user}`">{{ aNews.user }}</router-link>
          </small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  created() {
    this.$store.dispatch('FETCH_NEWS');
  },
  computed: {
    ...mapState(['news']),
  },
};
</script>

<style scoped>
.news-list {
  margin: 0;
  padding: 0;
}
.post {
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.points {
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42b883;
}
.news-title {
  margin: 0;
  padding: 0;

}
.link-text {
  color: #828282;
}
</style>
