import { APP_ID } from 'shared/config';
import * as realm from 'realm-web';

export const atlasApiInstance = new realm.App({ id: APP_ID });

// const CORS_PROXY_URL = 'https://corsproxy.io/?';
// const BASE_ACTION_URL = '/data/v1/action';

// const BASE_HEADERS = {
//   'Content-Type': 'application/json',
//   'api-key': API_KEY,
// };

// const BASE_BODY = {
//   collection: 'Tasks',
//   database: 'TodoApp',
//   dataSource: 'DBCluster0',
// };

// export const apiDataInstance = axios.create({
//   baseURL: `${CORS_PROXY_URL}${API_URL}${BASE_ACTION_URL}`,
//   headers: BASE_HEADERS,
//   transformRequest: (data) => {
//     const body = JSON.stringify({ ...BASE_BODY, ...data });
//     return body;
//   },
// });
