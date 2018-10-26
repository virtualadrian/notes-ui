import axios from 'axios';

function getAccessToken() {
  let apiAuth = localStorage.getItem('notes::auth') ? JSON.parse(localStorage.getItem('notes::auth')) : {};
  return apiAuth.access_token;
}

const http = axios.create();

http.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

export default http;
