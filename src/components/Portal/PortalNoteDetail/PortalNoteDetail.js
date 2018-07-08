import { Component, Vue } from 'vue-property-decorator';
import http from '@/services/http';
import { VueEditor } from 'vue2-editor';
import router from '@/router';

import environment from '@/services/environment';

const getEmptyNote = function () {
  return {id: -1, noteBody: '', noteTitle: ''};
};

const api = {
  getNote: (id) => environment.getEndpoint(`note/${id}`),
  saveEditorImage: () => environment.getEndpoint(`note/upload/file`),
  getEditorImage: (name) => environment.getEndpoint(`assets/note/images/${name}`),
  saveNote: () => environment.getEndpoint(`note`)
};

@Component({
  components: {VueEditor}
})
export default class PortalNoteDetail extends Vue {
  currentNote = getEmptyNote();

  mounted () {
    this.currentNote.id = this.$route.params.id;
    this.getNoteDetail();
  }

  getNoteDetail () {
    if (!this.currentNote.id) { return; }
    http.get(api.getNote(this.currentNote.id))
      .then((response) => {
        this.showNote(response);
      });
  }

  saveNote () {
    const save = (this.currentNote.id >= 0)
      ? http.put(api.saveNote(), this.currentNote)
      : http.post(api.saveNote(), this.currentNote);

    save.then((response) => {
      this.showNote(response);
      this.$toastr.defaultTimeout = 1000;
      this.$toastr.s('Note has been saved.');
    });
  }

  cancelEdit () {
    router.push({name: 'PortalNotes'});
  }

  insertImage (file, Editor, cursorLocation) {
    const formData = new FormData();
    formData.append('file', file);

    http.post(api.saveEditorImage(), formData)
      .then((result) => {
        Editor.insertEmbed(cursorLocation, 'image', api.getEditorImage(file.name));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showNote (response) {
    if (response.data && response.data !== '') {
      this.currentNote = response.data;
      router.push({name: 'PortalNoteDetail', params: { id: this.currentNote.id }});
    }
  }
}
