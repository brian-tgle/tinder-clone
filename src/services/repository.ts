import axios from 'axios';

const baseURL = 'http://localhost:4000/api/';
const headers = {
  'app-id': '60349db146ff8b0837d18351'
};

const instance = axios.create({
  baseURL,
  headers
});
instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
export default instance;
