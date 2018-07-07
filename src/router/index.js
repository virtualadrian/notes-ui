import Vue from 'vue';
import decode from 'jwt-decode';

import Router from 'vue-router';
import LandingLayout from '@/components/LandingLayout/LandingLayout.vue';

import Login from '@/components/Login/Login.vue';
import Home from '@/components/Home/Home.vue';
import RegistrationFull from '@/components/RegistrationFull/RegistrationFull.vue';

import PortalLayout from '@/components/PortalLayout/PortalLayout.vue';
import PortalDashboard from '@/components/PortalDashboard/PortalDashboard.vue';

Vue.use(Router);

function getTokenExpirationDate (encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

function getIdToken () {
  const authData = JSON.parse(localStorage.getItem('notes::auth'));
  return authData ? authData.access_token : undefined;
}

function isLoggedIn () {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function guardRoute (to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/account/login'
    });
  } else {
    next();
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      component: LandingLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        },
        {
          path: 'account/login',
          name: 'Login',
          component: Login
        },
        {
          path: 'account/register',
          name: 'RegistrationFull',
          component: RegistrationFull
        }
      ]
    },
    {
      path: '/portal',
      component: PortalLayout,
      beforeEnter: guardRoute,
      children: [
        {
          path: '',
          name: 'PortalDashboard',
          component: PortalDashboard
        }
      ]
    }
  ]
});
