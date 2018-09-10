import { Component, Vue } from 'vue-property-decorator';
import http from '@/services/http';
import environment from '@/services/environment';

import SaveToolbar from '@/components/Portal/shared/SaveToolbar/SaveToolbar.vue';
import PortalNoteMeta from '@/components/Portal/notes/PortalNoteMeta/PortalNoteMeta.vue';
import NoteEditor from '@/components/Portal/shared/NoteEditor/NoteEditor.vue';

const api = {
  getNote: (id) => environment.getEndpoint(`note/${id}`),
  getEditorImage: (userId, name) => environment.getS3Endpoint(`/images/${userId}/${name}`),
  saveNote: () => environment.getEndpoint(`note`)
};

@Component({
  components: {
    'save-toolbar': SaveToolbar,
    'note-meta': PortalNoteMeta,
    'note-editor': NoteEditor
  }
})
export default class PortalNoteDetail extends Vue {
  saveDialog = false;
  editingNote = false;
  note = {};
  snack = {
    isVisible: false,
    color: 'success',
    message: ''
  };

  mounted() {
    this.loadNoteDetail();
  }

  loadNoteDetail() {
    this.note.id = this.$route.params.id;
    this.getNoteDetail();
  }

  discardChanges() {
    window.tinymce.activeEditor.setDirty(false);
    this.$router.push({name: 'Notes', params: { filter: 'ALL' }});
  }

  saveAndClose() {
    this.saveNote();
    this.$router.push({name: 'Notes', params: { filter: 'ALL' }});
  }

  clearChanges() {
    if (this.$refs.editor.hasChanges()) {
      this.saveDialog = true;
      return;
    }
    this.$router.push({name: 'Notes', params: { filter: 'ALL' }});
  }

  getNoteDetail() {
    if (!this.note.id) { return; }
    return http.get(api.getNote(this.note.id))
      .then((res) => {
        this.note = res.data;
      })
      .then(() => {
        window.tinymce.activeEditor.setDirty(false);
      });
  }

  success(message) {
    this.snack.isVisible = true;
    this.snack.color = 'secondary';
    this.snack.message = message;
  }

  error(message) {
    this.snack.isVisible = true;
    this.snack.color = 'error lighten-1 white--text';
    this.snack.message = message;
  }

  saveNote() {
    this.note.noteBody = this.$refs.editor.getNoteSaveBody();

    const save = (this.note.id >= 0)
      ? http.put(api.saveNote(), this.note)
      : http.post(api.saveNote(), this.note);

    return save
      .then(response => { return response.data; })
      .then(response => {
        this.note = response;
        this.success('Note has been saved.');
        this.editingNote = false;
      })
      .then(() => {
        window.tinymce.activeEditor.setDirty(false);
      });
  }
}
