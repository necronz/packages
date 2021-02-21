import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://data.jsdelivr.com/v1'
});

export default instance;