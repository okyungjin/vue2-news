import axios from 'axios';

const config = {
  baseUrl: 'https://api.hnpwa.com/v0',
};

const fetchAsksList = () => axios.get(`${config.baseUrl}/ask/1.json`);

const fetchJobsList = () => axios.get(`${config.baseUrl}/jobs/1.json`);

const fetchNewsList = () => axios.get(`${config.baseUrl}/news/1.json`);

export {
  fetchAsksList,
  fetchJobsList,
  fetchNewsList,
};
