import Vue from 'vue';
import Vuex from 'vuex';
import { fetchNewsList } from '../api';

Vue.use(Vuex);

export const store = new Vuex.Store({
  store: {
    newsList: [],
  },
  mutations: {
    SET_NEWS(state, newsList) {
      state.newsList = newsList;
    },
  },
  actions: {
    FETCH_NEWS(context) {
      fetchNewsList()
        .then((res) => { context.commit('SET_NEWS', res.data); })
        .catch((err) => throw new Error(err));
    },
  },
});
