import Vue from 'vue';
import Vuex from 'vuex';
import PortalLayouModule from '@/store/portal-global-store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    portal: PortalLayouModule
  }
});
