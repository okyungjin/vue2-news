import { fetchAsksList, fetchJobsList, fetchNewsList } from '../api';

export default {
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
};
