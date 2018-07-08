import { Component, Vue } from 'vue-property-decorator';
import http from '@/services/http';
import auth from '@/services/authentication';
import environment from '@/services/environment';
import striphtml from '@/shared/filter/striphtml';

const api = {
  getNotes: () => environment.getEndpoint(`note`),
  deleteNote: (id) => environment.getEndpoint(`note/${id}`)
};

@Component({
  filters: {striphtml}
})
export default class PortalNotes extends Vue {
  notesResult = {};
  currentUserFirstName = 'Awesomeness';

  mounted () {
    this.getNotes();
    this.getUserName();
  }

  getUserName () {
    this.currentUserFirstName = auth.getCurrentUserFirstName();
  }

  getNotes () {
    http.get(api.getNotes())
      .then((result) => {
        this.notesResult = result.data;
      });
  }

  deleteNote (note) {
    http.delete(api.deleteNote(note.id))
      .then(() => {
        this.$toastr.s('Note has been removed.');
        this.getNotes();
      });
  }
}
