import {
  fetchList, fetchUser, fetchItem,
} from '../api';

export default {
  FETCH_LIST({ commit }, routeName) {
    fetchList(routeName)
      .then(({ data }) => {
        commit('SET_LIST', data);
      })
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
