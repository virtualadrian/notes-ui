// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App';
import router from './router';
import store from './store';
import VueMoment from 'vue-moment';
import Toastr from 'vue-toastr';
import BootstrapVue from 'bootstrap-vue';
import 'vuetify/dist/vuetify.min.css';

import 'vue-toastr/src/vue-toastr.scss';
import 'animate.css/animate.min.css';
import 'font-awesome/css/font-awesome.min.css';

import VueShortkey from 'vue-shortkey';

import 'highlight.js/styles/default.css';
import 'highlight.js/styles/agate.css';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#2a56c6',
    secondary: '#3b78e7',
    accent: '#f7f7f7',
    error: '#f44336',
    danger: '#f80054',
    info: '#039be5',
    success: '#37b74a',
    warning: '#fbd050'
  }
});
Vue.use(VueShortkey);
Vue.use(BootstrapVue);
Vue.use(VueMoment);
Vue.use(Toastr);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  mounted: function() {
    this.$toastr.defaultTimeout = 1000;
  },
  template: '<App/>'
});
