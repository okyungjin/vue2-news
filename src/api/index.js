import axios from 'axios';

const config = {
  baseUrl: 'https://api.hnpwa.com/v0',
};

const fetchList = (name) => axios.get(`${config.baseUrl}/${name}/1.json`);

const fetchUser = (userName) => axios.get(`${config.baseUrl}/user/${userName}.json`);

const fetchItem = (itemId) => axios.get(`${config.baseUrl}/item/${itemId}.json`);

export {
  fetchList,
  fetchUser,
  fetchItem,
};
