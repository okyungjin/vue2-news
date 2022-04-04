import {
  fetchAsksList, fetchJobsList, fetchNewsList, fetchUser, fetchItem,
} from '../api';

export default {
  FETCH_NEWS({ commit }) {
    fetchNewsList()
      .then(({ data }) => {
        commit('SET_NEWS', data);
        return data; // TODO: Promise로 변경
      })
      .catch((err) => throw new Error(err));
  },
  FETCH_JOBS({ commit }) {
    fetchJobsList()
      .then(({ data }) => { commit('SET_JOBS', data); })
      .catch((err) => throw new Error(err));
  },
  FETCH_ASKS({ commit }) {
    fetchAsksList()
      .then(({ data }) => { commit('SET_ASKS', data); })
      .catch((err) => throw new Error(err));
  },
  FETCH_USER({ commit }, userName) {
    fetchUser(userName)
      .then(({ data }) => {
        commit('SET_USER', data);
      })
      .catch((err) => throw new Error(err));
  },
  FETCH_ITEM({ commit }, itemId) {
    fetchItem(itemId)
      .then(({ data }) => {
        commit('SET_ITEM', data);
      })
      .catch((err) => throw new Error(err));
  },
};
