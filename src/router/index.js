import Vue from 'vue';
import Router from 'vue-router';

import auth from '@/services/authentication';

import LandingLayout from '@/components/LandingLayout/LandingLayout.vue';

import Login from '@/components/Login/Login.vue';
import Home from '@/components/Home/Home.vue';
import RegistrationFull from '@/components/RegistrationFull/RegistrationFull.vue';

import PortalLayout from '@/components/PortalLayout/PortalLayout.vue';
import PortalDashboard from '@/components/PortalDashboard/PortalDashboard.vue';
import PortalNotes from '@/components/PortalNotes/PortalNotes.vue';
import PortalNoteDetail from '@/components/PortalNoteDetail/PortalNoteDetail.vue';

Vue.use(Router);

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
      beforeEnter: auth.guardRoute,
      children: [
        {
          path: '',
          name: 'PortalDashboard',
          component: PortalDashboard
        },
        {
          path: 'notes',
          name: 'PortalNotes',
          component: PortalNotes
        },
        {
          path: 'note/:id?',
          name: 'PortalNoteDetail',
          component: PortalNoteDetail
        }
      ]
    }
  ]
});
