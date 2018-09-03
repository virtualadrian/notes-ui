import { Component, Vue } from 'vue-property-decorator';
import http from '@/services/http';
import environment from '@/services/environment';

import SaveToolbar from '@/components/Portal/Shared/SaveToolbar/SaveToolbar.vue';
import PortalNoteMeta from '@/components/Portal/PortalNoteMeta/PortalNoteMeta.vue';
import NoteEditor from '@/components/Portal/Shared/NoteEditor/NoteEditor.vue';

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
  hasChanges = false;
  editingNote = false;
  note = {};

  mounted() {
    this.loadNoteDetail();
  }

  loadNoteDetail() {

  }

  clearChanges() {

  }

  saveChanges(note) {

  }

  getNoteDetail() {
    if (!this.note.id) { return; }
    return http.get(api.getNote(this.note.id));
  }

  saveNote() {
    this.note.noteTags = this.editor.tags.join(',');
    const save = (this.note.id >= 0)
      ? http.put(api.saveNote(), this.note)
      : http.post(api.saveNote(), this.note);

    return save
      .then(response => { return response.data; })
      .then(response => {
        if (this.note.id >= 0) {
          this.note.noteTitle = response.noteTitle;
          this.note.noteBody = response.noteBody;
          this.note.noteTags = response.noteTags;
        } else {
          this.notesResult.content.push(response);
        }

        this.$toastr.defaultTimeout = 1000;
        this.$toastr.s('Note has been saved.');
        this.editingNote = false;
        this.editor.dirty = false;
      });
  }
}
