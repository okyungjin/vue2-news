import {
  fetchList, fetchUser, fetchItem,
} from '../api';

export default {
  FETCH_LIST({ commit }, routeName) {
    return fetchList(routeName)
      .then(({ data }) => {
        commit('SET_LIST', data);
      })
      .catch((err) => throw new Error(err));
  },
  FETCH_USER({ commit }, userName) {
    return fetchUser(userName)
      .then(({ data }) => {
        commit('SET_USER', data);
      })
      .catch((err) => throw new Error(err));
  },
  FETCH_ITEM({ commit }, itemId) {
    return fetchItem(itemId)
      .then(({ data }) => {
        commit('SET_ITEM', data);
      })
      .catch((err) => throw new Error(err));
  },
};
