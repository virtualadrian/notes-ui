
// import PortalLayouModule from '@/store/portal-global-store';
import noteModule from '@/store/note.module.js';

import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

const store = new Store({
  modules: {
    noteStore: noteModule
  }
});

export default store;
