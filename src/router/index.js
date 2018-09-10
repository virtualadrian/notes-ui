import Vue from 'vue';
import Router from 'vue-router';

import auth from '@/services/authentication';

import LandingLayout from '@/components/Landing/LandingLayout/LandingLayout.vue';

import Login from '@/components/Landing/Login/Login.vue';
import Home from '@/components/Landing/Home/Home.vue';
import RegistrationFull from '@/components/Landing/RegistrationFull/RegistrationFull.vue';
import RegistrationConfirm from '@/components/Landing/RegistrationConfirm/RegistrationConfirm.vue';
import PasswordReset from '@/components/Landing/PasswordReset/PasswordReset.vue';
import PasswordResetComplete from '@/components/Landing/PasswordResetComplete/PasswordResetComplete.vue';
import SupportHome from '@/components/Landing/SupportHome/SupportHome.vue';
import NoteView from '@/components/Landing/NoteView/NoteView.vue';

import PortalLayout from '@/components/Portal/layout/PortalLayout/PortalLayout.vue';
import PortalDashboard from '@/components/Portal/layout/PortalDashboard/PortalDashboard.vue';
import PortalNotes from '@/components/Portal/notes/PortalNotes/PortalNotes.vue';
import PortalNoteDetail from '@/components/Portal/notes/PortalNoteDetail/PortalNoteDetail.vue';
import PortalNoteView from '@/components/Portal/notes/PortalNoteView/PortalNoteView.vue';
import PortalSearchNote from '@/components/Portal/notes/PortalSearchNote/PortalSearchNote.vue';

import PortalCardDeckList from '@/components/Portal/deck/PortalCardDeckList/PortalCardDeckList.vue';
import PortalCardDeckDetail from '@/components/Portal/deck/PortalCardDeckDetail/PortalCardDeckDetail.vue';

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
        },
        {
          path: 'account/register/confirm/:token',
          name: 'RegistrationConfirm',
          component: RegistrationConfirm
        },
        {
          path: 'account/password/reset',
          name: 'PasswordReset',
          component: PasswordReset
        },
        {
          path: 'account/password/reset/:token',
          name: 'PasswordResetComplete',
          component: PasswordResetComplete
        },
        {
          path: 'support/help',
          name: 'SupportHome',
          component: SupportHome
        },
        {
          path: 'note/shared/:id',
          name: 'NoteView',
          component: NoteView
        }
      ]
    },
    {
      path: '/portal',
      component: PortalLayout,
      beforeEnter: (to, from, next) => {
        if (!auth.isLoggedIn()) {
          next({
            path: '/account/login'
          });
        } else {
          next();
        }
      },
      children: [
        {
          path: '',
          name: 'PortalDashboard',
          component: PortalDashboard
        },
        {
          path: 'notes/:filter?',
          name: 'Notes',
          component: PortalNotes
        },
        {
          path: 'note/edit/:id?',
          name: 'NoteDetail',
          component: PortalNoteDetail
        },
        {
          path: 'note/view/:id?',
          name: 'PortalNoteView',
          component: PortalNoteView
        },
        {
          path: 'note/share/:id?',
          name: 'PortalShareNote',
          component: PortalNoteView
        },
        {
          path: 'note/search/:term?/:page?/:size?',
          name: 'PortalSearchNote',
          component: PortalSearchNote
        },
        {
          path: 'deck',
          name: 'PortalCardDeckList',
          component: PortalCardDeckList
        },
        {
          path: 'deck/edit/:id?',
          name: 'PortalCardDeckDetail',
          component: PortalCardDeckDetail
        }
      ]
    }
  ]
});
