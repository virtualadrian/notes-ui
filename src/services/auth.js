import axios from 'axios';

window['notes'] = window['notes'] | {};

const SCHEME = window['notes']['HTTP_SCHEME'] || 'http';
const HOST = window['notes']['HTTP_HOST'] || 'localhost';
const PORT = window['notes']['HTTP_PORT'] || '9999';
const AUTH_CLIENT_ID = window['notes']['AUTH_CLIENT_ID'] || 'fooClientIdPassword';
const AUTH_CLIENT_KEY = window['notes']['AUTH_CLIENT_KEY'] || 'secret';
const AUTH_GRANT_TYPE = window['notes']['AUTH_GRANT_TYPE'] || 'password';

const http = axios.create({
  baseURL: `${SCHEME}://${HOST}:${PORT}/api/v1/`,
  headers: {
    Authorization: `Basic ` + btoa(`${AUTH_CLIENT_ID}:${AUTH_CLIENT_KEY}`)
  }
});

export default {
  login: function (username, password) {
    const loginData = new FormData();

    loginData.set('grant_type', AUTH_GRANT_TYPE);
    loginData.set('client_id', AUTH_CLIENT_ID);
    loginData.set('username', username);
    loginData.set('password', password);

    return http.post('oauth/token', loginData, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
      .then((response) => {
        localStorage.setItem('notes::auth', JSON.stringify(response.data));
      });
  }
};
