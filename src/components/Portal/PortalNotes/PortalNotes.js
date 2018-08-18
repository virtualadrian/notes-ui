import { Component, Vue } from 'vue-property-decorator';
import router from '@/router';
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
  noteSearch = {
    term: ''
  };
  currentNote = {};

  showSearch() {
    this.$refs.noteSearch.show();
  }

  searchNotes() {
    router.push({name: 'PortalSearchNote',
      params: {
        term: this.noteSearch.term,
        page: 1,
        size: 10
      }});
  }

  mounted() {
    this.getNotes();
    this.getUserName();
  }

  getUserName() {
    this.currentUserFirstName = auth.getCurrentUserFirstName();
  }

  getNotes() {
    http.get(api.getNotes())
      .then((result) => {
        this.notesResult = result.data;
      });
  }

  toggleDeleteConfirm(note) {
    this.currentNote = note;
    if (note) {
      this.$refs.deleteNote.show();
    } else {
      this.$refs.deleteNote.hide();
    }
  }

  deleteNote() {
    if (!this.currentNote) { return; }
    http.delete(api.deleteNote(this.currentNote.id))
      .then(() => {
        this.$refs.deleteNote.hide();
        this.$toastr.s('Note has been removed.');
        this.getNotes();
      });
  }
}
