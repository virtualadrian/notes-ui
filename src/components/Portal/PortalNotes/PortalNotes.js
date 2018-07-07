import { Component, Vue } from 'vue-property-decorator';
import http from '@/services/http';
import auth from '@/services/authentication';
import environment from '@/services/environment';
import striphtml from '@/shared/filter/striphtml';

const api = {
  getAllNotes: (id) => environment.getEndpoint(`note`)
};

@Component({
  filters: {striphtml}
})
export default class PortalNotes extends Vue {
  notesResult = {};
  currentUserFirstName = 'Your';

  mounted () {
    this.getNotes();
    this.getUserName();
  }

  getUserName () {
    this.currentUserFirstName = auth.getCurrentUserFirstName();
  }

  getNotes () {
    http.get(api.getAllNotes())
      .then((result) => {
        this.notesResult = result.data;
      });
  }
}
