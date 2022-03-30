import Vue from 'vue';
import Vuex from 'vuex';
import { fetchAsksList, fetchJobsList, fetchNewsList } from '../api';

Vue.use(Vuex);

export const store = new Vuex.Store({
  store: {
    news: [],
    jobs: [],
    asks: [],
  },
  mutations: {
    SET_NEWS(state, news) {
      state.news = news;
    },
    SET_JOBS(state, jobs) {
      state.jobs = jobs;
    },
    SET_ASKS(state, asks) {
      state.asks = asks;
    },
  },
  actions: {
    FETCH_NEWS(context) {
      fetchNewsList()
        .then(({ data }) => { context.commit('SET_NEWS', data); })
        .catch((err) => throw new Error(err));
    },
    FETCH_JOBS(context) {
      fetchJobsList()
        .then(({ data }) => { context.commit('SET_JOBS', data); })
        .catch((err) => throw new Error(err));
    },
    FETCH_ASKS(context) {
      fetchAsksList()
        .then(({ data }) => { context.commit('SET_ASKS', data); })
        .catch((err) => throw new Error(err));
    },
  },
});
