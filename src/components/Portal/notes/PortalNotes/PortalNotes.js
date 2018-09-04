import {Component, Emit, Vue} from 'vue-property-decorator';
import http from '@/services/http';
import auth from '@/services/authentication';
import environment from '@/services/environment';
import _ from 'lodash';
import PreviewNote from '@/components/Portal/shared/PreviewNote/PreviewNote.vue';
import NoteGrid from '@/components/Portal/shared/NoteGrid/NoteGrid.vue';
import PortalNoteDetail from '@/components/Portal/notes/PortalNoteDetail/PortalNoteDetail.vue';
import QuickCompose from '@/components/Portal/shared/QuickCompose/QuickCompose.vue';

import noteService from '@/components/Portal/notes/core/note.service.js';

const api = {
  getNotes: () => environment.getEndpoint(`note`),
  getEditorImage: (userId, name) => environment.getS3Endpoint(`/images/${userId}/${name}`),
  deleteNote: (id) => environment.getEndpoint(`note/${id}`),
  saveNote: () => environment.getEndpoint(`note`),
  currentUserAccountId: 0
};

@Component({
  components: {
    'preview-note': PreviewNote,
    'note-detail': PortalNoteDetail,
    'quick-compose': QuickCompose,
    'note-grid': NoteGrid
  }
})
export default class PortalNotes extends Vue {
  notesResult = [];
  currentNote = {};
  previewingNote = {};
  snack = {
    isVisible: false,
    color: 'success',
    message: ''
  };

  mounted() {
    this.getNotes();
    this.getUser();
  }

  success(message) {
    this.snack.isVisible = true;
    this.snack.color = 'green';
    this.snack.message = message;
  }

  error(message) {
    this.snack.isVisible = true;
    this.snack.color = 'red lighten-1';
    this.snack.message = message;
  }

  viewNote(note) {
    this.previewingNote = note;
    this.$refs.previewDialog.show();
  }

  editNote(note) {
    this.currentNote = note;
    this.$refs.noteDetail.show();
  }

  @Emit()
  createCardsFromNote(note) {
    console.log('createCardsFromNote');
  }

  @Emit()
  confirmDeleteNote(note) {

  }

  deleteNote(note) {

  }

  pinNote(note) {
    return noteService.createPinnedNote(note)
      .then((res) => {
        note.pinIndex = res.data.pinIndex;
      });
  }

  createFavoriteNote(note) {
    return noteService.createFavoriteNote(note)
      .then((res) => {
        note.favoriteIndex = res.data.favoriteIndex;
      });
  }

  shareNote(note) {
    return noteService.shareNote(note)
      .then((res) => {
        _.cloneDeep(res.data, note);
      });
  }

  duplicateNote(note) {
    return noteService.duplicateNote(note)
      .then((res) => {
        this.notesResult.content.push(res.data);
        _.sortBy(this.notesResult.content, ['noteOrderId', 'pinIndex', 'id']);
      });
  }

  archiveNote(note) {
    return noteService.archiveNote(note);
  }

  getUser() {
    api.currentUserAccountId = auth.getCurrentUserAccountId();
    this.currentUserFirstName = auth.getCurrentUserFirstName();
  }

  onTextChanged() {
    this.editor.dirty = true;
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

  //
  // deleteNote() {
  //   if (!this.currentNote) {
  //     return;
  //   }
  //   http.delete(api.deleteNote(this.currentNote.id))
  //     .then(() => {
  //       this.$refs.deleteNote.hide();
  //       this.$toastr.s('Note has been removed.');
  //       this.getNotes();
  //     });
  // }

  cancel() {
    this.editingNote = false;
    this.editor.dirty = false;
    // return;
    // editor-change
    // if (!this.editor.dirty) {
    //   this.editingNote = false;
    //   this.editor.dirty = false;
    //   this.currentNote = null;
    // } else {
    //   this.$refs.unsavedChanges.show();
    // }
  }
}
