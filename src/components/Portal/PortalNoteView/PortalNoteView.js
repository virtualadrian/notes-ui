import { Component, Vue } from 'vue-property-decorator';
import { VueEditor } from 'vue2-editor';
import router from '@/router';
import http from '@/services/http';
import environment from '@/services/environment';

const api = {
  getNote: (id) => environment.getEndpoint(`note/${id}`)
};

@Component({
  components: {VueEditor}
})
export default class PortalNoteDetail extends Vue {
  currentNote = {id: 0, noteTitle: '', noteBody: ''};

  mounted() {
    this.currentNote.id = this.$route.params.id;
    this.getNoteDetail();
  }

  cancel() {
    router.push({name: 'PortalNotes'});
  }

  getNoteDetail() {
    if (!this.currentNote.id) { return; }
    http.get(api.getNote(this.currentNote.id))
      .then((response) => {
        this.currentNote = response.data;
      });
  }
}
