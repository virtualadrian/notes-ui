import {Component, Vue} from 'vue-property-decorator';
import http from '@/services/http';
import auth from '@/services/authentication';
import environment from '@/services/environment';

import PreviewNote from '@/components/Portal/Shared/PreviewNote/PreviewNote.vue';
import PortalNoteDetail from '@/components/Portal/PortalNoteDetail/PortalNoteDetail.vue';
import NotesQuickCompose from '@/components/Portal/PortalNotes/NotesQuickCompose.vue';
import NotesGrid from '@/components/Portal/PortalNotes/NotesGrid.vue';

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
    'note-compose': NotesQuickCompose,
    'notes-grid': NotesGrid
  }
})
export default class PortalNotes extends Vue {
  notesResult = [];
  currentNote = {};
  previewingNote = {};

  mounted() {
    this.getNotes();
    this.getUser();
  }

  viewNote(note) {
    this.previewingNote = note;
    this.$refs.previewDialog.show();
  }

  editNote(note) {
    this.currentNote = note;
    this.$refs.noteDetail.show();
  }

  createSnippet(note) {
    console.log('createSnippet');
  }

  createFavorite(note) {
    console.log('createFavorite');
  }

  createSharedNote(note) {
    console.log('createSharedNote');
  }

  createCards(note) {
    console.log('createCards');
  }

  duplicateNote(note) {
    console.log('duplicateNote');
  }

  archiveNote(note) {

  }

  pinNote(note) {

  }

  confirmDeleteNote(note) {

  }

  updated() {
    const vm = this;
    this.$nextTick(function() {
      vm.onResize();
    });
  }

  onResize() {

  }

  getUser() {
    api.currentUserAccountId = auth.getCurrentUserAccountId();
    this.currentUserFirstName = auth.getCurrentUserFirstName();
  }

  openNoteEditor(note) {
    this.currentNote = note;
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

  deleteNote() {
    if (!this.currentNote) {
      return;
    }
    http.delete(api.deleteNote(this.currentNote.id))
      .then(() => {
        this.$refs.deleteNote.hide();
        this.$toastr.s('Note has been removed.');
        this.getNotes();
      });
  }

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
