import axios from 'axios';

const SCHEME = window['notes']['HTTP_SCHEME'] || 'http';
const HOST = window['notes']['HTTP_HOST'] || 'localhost';
const PORT = window['notes']['HTTP_PORT'] || '9999';

export const http = axios.create({
  baseURL: `${SCHEME}://${HOST}:${PORT}/api/v1/`
  // headers: {
  //   Authorization: 'Bearer {token}'
  // }
});
