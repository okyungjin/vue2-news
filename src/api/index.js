import axios from 'axios';
import { handleException } from '../utils/handler';

const config = {
  baseUrl: 'https://api.hnpwa.com/v0',
};

const fetchList = async (name) => {
  try {
    return await axios.get(`${config.baseUrl}/${name}/1.json`);
  } catch (error) {
    handleException(error);
    return error;
  }
};

const fetchUser = async (userName) => {
  try {
    return await axios.get(`${config.baseUrl}/user/${userName}.json`);
  } catch (error) {
    handleException(error);
    return error;
  }
};

const fetchItem = async (itemId) => {
  try {
    return await axios.get(`${config.baseUrl}/item/${itemId}.json`);
  } catch (error) {
    handleException(error);
    return error;
  }
};

export {
  fetchList,
  fetchUser,
  fetchItem,
};
