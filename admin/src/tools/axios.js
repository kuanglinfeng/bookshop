import axios from 'axios';
import config from '../config';

const { baseURL } = config;

const instance = axios.create({
  baseURL,
});

export default instance;
