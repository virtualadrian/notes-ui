import { Component, Vue } from 'vue-property-decorator';
import { http } from '@/services/http';
import environment from '@/services/environment';

const api = {
  getAllNotes: (id) => environment.getEndpoint(`note`)
};

@Component
export default class PortalNotes extends Vue {
  notesResult = {};

  mounted () {
    this.getNotes();
  }

  getNotes () {
    http.get(api.getAllNotes())
      .then((result) => {
        this.notesResult = result.data;
      });
  }
}
