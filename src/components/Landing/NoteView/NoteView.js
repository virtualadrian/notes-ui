import { Component, Vue } from 'vue-property-decorator';
import router from '@/router';
import http from '@/services/http';
import environment from '@/services/environment';
import hljs from 'highlight.js';

const api = {
  getNote: (id) => environment.getEndpoint(`note/shared/${id}`)
};

@Component()
export default class NoteView extends Vue {
  currentNote = {id: 0, noteTitle: '', noteBody: ''};
  mounted() {
    this.currentNote.id = this.$route.params.id;
    this.getNoteDetail();
  }

  updated() {
    this.$el.querySelectorAll('.ql-syntax').forEach((el, idx, arr) => {
      hljs.highlightBlock(el);
    });
  }

  cancel() {
    router.push({name: 'Home'});
  }

  getNoteDetail() {
    if (!this.currentNote.id) { return; }
    http.get(api.getNote(this.currentNote.id))
      .then((response) => {
        this.currentNote = response.data;
      });
  }
}
