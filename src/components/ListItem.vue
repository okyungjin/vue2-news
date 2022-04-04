<template>
  <div>
    <ul class="news-list">
      <li v-for="item in listItems" :key="item.id" class="post">
        <div class="points">
          {{ item.points || 0 }}
        </div>
        <div>
          <p class="news-title">
            <template v-if="item.domain">
              <a :href="item.url">{{ item.title }}</a>
            </template>
            <template v-else>
              <router-link :to="`items/${item.id}`">
                {{ item.title }}
              </router-link>
            </template>
          </p>
          <small class="link-text">
            {{ item.time_ago }} by
            <router-link
              v-if="item.user"
              :to="`/users/${item.user}`">{{ item.user }}</router-link>
            <a :href="item.url" v-else>
              {{ item.domain }}
            </a>
          </small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    const routeName = this.$route.name;
    if (routeName === 'news') {
      this.$store.dispatch('FETCH_NEWS');
    } else if (routeName === 'ask') {
      this.$store.dispatch('FETCH_ASKS');
    } else if (routeName === 'jobs') {
      this.$store.dispatch('FETCH_JOBS');
    }
  },
  computed: {
    listItems() {
      const routeName = this.$route.name;
      if (routeName === 'news') {
        return this.$store.state.news;
      } if (routeName === 'ask') {
        return this.$store.state.asks;
      } if (routeName === 'jobs') {
        return this.$store.state.jobs;
      }
      return [];
    },
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
