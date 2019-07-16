import axios from 'axios';
import decode from 'jwt-decode';
import environment from '@/global/services/environment';

const AUTH_CLIENT_ID = environment.getValue('clientId');
const AUTH_CLIENT_KEY = environment.getValue('clientKey');
const AUTH_GRANT_TYPE = environment.getValue('grantType');

const api = {
  getToken: () => environment.getEndpoint(`oauth/token`)
};

const http = axios.create({
  headers: {
    Authorization: `Basic ` + btoa(`${AUTH_CLIENT_ID}:${AUTH_CLIENT_KEY}`)
  }
});

class Authentication {
  login(username, password) {
    const loginData = new FormData();

    loginData.set('grant_type', AUTH_GRANT_TYPE);
    loginData.set('client_id', AUTH_CLIENT_ID);
    loginData.set('username', username);
    loginData.set('password', password);

    return http.post(api.getToken(), loginData, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
      .then((response) => {
        localStorage.setItem('notes::auth', JSON.stringify(response.data));
      });
  }

  logout() {
    localStorage.removeItem('notes::auth');
  }

  isLoggedIn() {
    return Authentication.checkLoggedIn();
  }

  getCurrentUserFirstName() {
    return Authentication.getAuth().firstName;
  }

  getCurrentUserAccountId() {
    return Authentication.getAuth().accountId;
  }

  static guardRoute(to, from, next) {
    if (!Authentication.checkLoggedIn()) {
      next({
        path: '/account/login'
      });
    } else {
      next();
    }
  }

  static getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
  }

  static isTokenExpired(token) {
    const expirationDate = Authentication.getTokenExpirationDate(token);
    return expirationDate < new Date();
  }

  static getAuth() {
    return JSON.parse(localStorage.getItem('notes::auth'));
  }

  static getIdToken() {
    const authData = Authentication.getAuth();
    return authData ? authData.access_token : undefined;
  }

  static checkLoggedIn() {
    const idToken = Authentication.getIdToken();
    return !!idToken && !Authentication.isTokenExpired(idToken);
  }
}

export default new Authentication();
