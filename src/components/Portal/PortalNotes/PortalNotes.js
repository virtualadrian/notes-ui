import { Component, Vue } from 'vue-property-decorator';
import router from '@/router';
import http from '@/services/http';
import auth from '@/services/authentication';
import environment from '@/services/environment';
import striphtml from '@/shared/filter/striphtml';
import fab from 'vue-fab';

const api = {
  getNotes: () => environment.getEndpoint(`note`),
  deleteNote: (id) => environment.getEndpoint(`note/${id}`)
};

@Component({
  filters: {striphtml},
  components: {fab}
})
export default class PortalNotes extends Vue {
  notesResult = {};
  currentUserFirstName = 'Awesomeness';
  fabActions = [
    {
      name: 'addNewNote',
      icon: 'add',
      tooltip: 'Add New Note',
      color: '#007bff'
    },
    {
      name: 'searchNotes',
      icon: 'search',
      tooltip: 'Search Notes',
      color: '#007bff'
    },
    {
      name: 'shareNotes',
      icon: 'share',
      tooltip: 'Share  Notes',
      color: '#007bff'
    }
  ];

  addNewNote() {
    router.push({name: 'PortalNoteDetail'});
  }

  searchNotes() {
    window.location.reload();
  }

  shareNotes() {
    router.push({name: 'PortalShareNote'});
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

  deleteNote(note) {
    http.delete(api.deleteNote(note.id))
      .then(() => {
        this.$toastr.s('Note has been removed.');
        this.getNotes();
      });
  }
}
