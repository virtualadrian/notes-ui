
// import PortalLayouModule from '@/store/portal-global-store';
import noteModule from '@/store/note.module.js';

import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);
const global = {
  namespaced: true,
  state: {
    drawerVisible: true
  },
  mutations: {
    toggleDrawer(state) {
      state.drawerVisible = !state.drawerVisible;
    }
  },
  getters: {
    getDrawerVisible(state) {
      return state.drawerVisible;
    }
  }
};

const store = new Store({
  modules: {
    global: global,
    noteStore: noteModule
  }
});

export default store;
