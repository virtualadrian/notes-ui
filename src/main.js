// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueMoment from 'vue-moment';
import Toastr from 'vue-toastr';
import 'vue-toastr/src/vue-toastr.scss';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'animate.css/animate.min.css';

import VueShortkey from 'vue-shortkey';

import 'highlight.js/styles/default.css';
import 'highlight.js/styles/agate.css';

Vue.config.productionTip = false;

Vue.use(VueShortkey);
Vue.use(BootstrapVue);
Vue.use(VueMoment);
Vue.use(Toastr);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  mounted: function() {
    this.$toastr.defaultTimeout = 1000;
  },
  template: '<App/>'
});
