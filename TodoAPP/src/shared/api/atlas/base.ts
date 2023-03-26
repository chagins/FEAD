import axios from 'axios';
import { API_KEY, API_URL } from 'shared/config';

const CORS_PROXY_URL = 'https://corsproxy.io/?';
const BASE_ACTION_URL = '/data/v1/action';

const BASE_HEADERS = {
  'Content-Type': 'application/json',
  'api-key': API_KEY,
};

const BASE_BODY = {
  collection: 'Tasks',
  database: 'TodoApp',
  dataSource: 'DBCluster0',
};

export const apiInstance = axios.create({
  baseURL: `${CORS_PROXY_URL}${API_URL}${BASE_ACTION_URL}`,
  headers: BASE_HEADERS,
  transformRequest: (data) => {
    const body = JSON.stringify({ ...BASE_BODY, ...data });
    return body;
  },
});
