// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import Vuex from 'vuex';
import Vueditor from 'vueditor';

import 'vueditor/dist/style/vueditor.min.css';

// your config here
let config = {
  toolbar: [
    'removeFormat', 'undo', 'redo', '|', 'code', 'element', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider', 'bold', 'italic', 'underline', 'strikeThrough',
    'link', 'unLink', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
    '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'table', '|', 'sourceCode', 'markdown'
  ],
  fontName: [
    {val: 'arial black'},
    {val: 'times new roman'},
    {val: 'Courier New'}
  ],
  fontSize: ['12px', '14px', '18px', '24px', '36px', '48px']
};

Vue.use(Vuex);
Vue.use(Vueditor, config);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App, Vueditor},
  template: '<App/>'
});
