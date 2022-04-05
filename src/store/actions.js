import {
  fetchList, fetchUser, fetchItem,
} from '../api';

export default {
  async FETCH_LIST({ commit }, routeName) {
    const response = await fetchList(routeName);
    commit('SET_LIST', response.data);
    return response;
  },
  async FETCH_USER({ commit }, userName) {
    const response = await fetchUser(userName);
    commit('SET_USER', response.data);
    return response;
  },
  async FETCH_ITEM({ commit }, itemId) {
    const response = await fetchItem(itemId);
    commit('SET_ITEM', response.data);
    return response;
  },
};
