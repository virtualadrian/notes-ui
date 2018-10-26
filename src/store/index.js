import Vue from 'vue';
import Vuex from 'vuex';
import PortalLayouModule from '@/store/portal-global-store';
import NoteModule from '@/store/note.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    portal: PortalLayouModule,
    note: NoteModule
  }
});
