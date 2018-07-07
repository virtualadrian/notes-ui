import { Component, Vue } from 'vue-property-decorator';
import { http } from '@/services/http';
import environment from '@/services/environment';

const api = {
  getNote: (id) => environment.getEndpoint(`note/${id}`),
  saveNote: () => environment.getEndpoint(`note`)
};

@Component
export default class PortalNoteDetail extends Vue {
  currentNote = {};

  mounted () {
    this.currentNote.id = this.$route.params.id;
    this.getNoteDetail();
  }

  getNoteDetail () {
    if (!this.currentNote.id) { return; }
    http.get(api.getNote(this.currentNote.id))
      .then((response) => {
        this.currentNote = response.data;
      });
  }

  saveNote () {
    http.post(api.saveNote())
      .then((response) => {
        this.currentNote = response.data;
      });
  }
}
