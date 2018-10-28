import Vue from 'vue';
import Router from 'vue-router';

import auth from '@/global/services/authentication';

import LandingLayout from '@/components/Landing/LandingLayout.vue';

import Login from '@/components/Landing/Login.vue';
import Home from '@/components/Landing/Home.vue';
import RegistrationFull from '@/components/Landing/RegistrationFull.vue';
import RegistrationConfirm from '@/components/Landing/RegistrationConfirm.vue';
import PasswordReset from '@/components/Landing/PasswordReset.vue';
import PasswordResetComplete from '@/components/Landing/PasswordResetComplete.vue';
import SupportHome from '@/components/Landing/SupportHome.vue';
import NoteView from '@/components/Landing/NoteView.vue';

import PortalLayout from '@/components/Portal/layout/PortalLayout.vue';
import PortalNotes from '@/components/Portal/notes/PortalNotes.vue';
import PortalNoteDetail from '@/components/Portal/notes/PortalNoteDetail.vue';
import PortalNoteView from '@/components/Portal/notes/PortalNoteView.vue';
import PortalSearchNote from '@/components/Portal/notes/PortalSearchNote.vue';

import PortalCardDeckList from '@/components/Portal/deck/PortalCardDeckList.vue';
import PortalCardDeckDetail from '@/components/Portal/deck/PortalCardDeckDetail.vue';

import PortalNoteTags from '@/components/Portal/notes/PortalNoteTags';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: LandingLayout,
      beforeEnter: (to, from, next) => {
        if (auth.isLoggedIn()) {
          next({
            path: '/portal/notes/ALL'
          });
        } else {
          next();
        }
      },
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
          redirect: { name: 'Notes', params: {filter: 'ALL'} }
        },
        {
          path: 'notes/:filter?',
          name: 'Notes',
          component: PortalNotes
        },
        {
          path: 'note/browse/tags',
          name: 'NoteTags',
          component: PortalNoteTags
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
