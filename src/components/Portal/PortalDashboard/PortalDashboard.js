import { Component, Vue } from 'vue-property-decorator';
import router from '@/router';

@Component
export default class PortalDashboard extends Vue {
  noteSearch = {
    term: ''
  };

  mounted() {
  }
  searchNotes() {
    router.push({name: 'PortalSearchNote',
      params: {
        term: this.noteSearch.term,
        page: 1,
        size: 10
      }});
  }
}
