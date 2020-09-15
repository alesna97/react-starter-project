import axios from 'axios';
import env from '../config/env';

const authApi = axios.create({
  baseURL: env.authApi + '/oauth/token'
});

export default authApi;
