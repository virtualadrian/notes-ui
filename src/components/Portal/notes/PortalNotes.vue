<template>
  <section >
    <v-snackbar top right :timeout="3000"
                multi-line="multi-line"
                v-model="snack.isVisible" :color="snack.color">
      <v-flex xs1><v-icon size="22px" flat class="white--text">done_all</v-icon></v-flex>
      <v-spacer></v-spacer>
      <v-flex xs8 class="subheading font-weight-medium text-xs-right" >{{snack.message}}</v-flex>
      <v-flex xs3><v-btn icon flat @click="snack.isVisible = false"><v-icon>close</v-icon></v-btn></v-flex>
    </v-snackbar>

    <preview-note @edit-note="editNote" :note.sync="previewingNote" ref="previewDialog"></preview-note>

    <note-grid :notes.sync="notes"
               @view-note="viewNote"
               @edit-note="editNote" @pin-note="pinNote"
               @delete-note="deleteNote" @create-cards-from-note="createCardsFromNote"
               @create-favorite-note="createFavoriteNote"
               @duplicate-note="duplicateNote" @archive-note="archiveNote">

    </note-grid>

  </section>
</template>
<script>
import { Component, Emit, Vue } from 'vue-property-decorator';
import http from '@/global/services/http';
import auth from '@/global/services/authentication';
import environment from '@/global/services/environment';
import PreviewNote from '@/components/Portal/shared/PreviewNote.vue';
import NoteGrid from '@/components/Portal/shared/NoteGrid.vue';
import PortalNoteDetail from '@/components/Portal/notes/PortalNoteDetail.vue';
import QuickCompose from '@/components/Portal/shared/QuickCompose.vue';

import noteService from '@/core/service/note.service.js';

const api = {
  getNotes: (term) => environment.getEndpoint(`note/filter/${term}`),
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

  get notes() {
    return this.notesResult.content;
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
    return noteService.shareNote(note).then(() => this.getNotes());
  }

  duplicateNote(note) {
    return noteService.duplicateNote(note).then(() => this.getNotes());
  }

  archiveNote(note) {
    return noteService.archiveNote(note).then(() => this.getNotes());
  }

  getUser() {
    api.currentUserAccountId = auth.getCurrentUserAccountId();
    this.currentUserFirstName = auth.getCurrentUserFirstName();
  }

  getNotes() {
    const filter = this.$route.params.filter || 'ALL';
    http.get(api.getNotes(filter))
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

</script>
<style lang="scss">
  .portal-notes {

    .pinned {
      transform: rotate(45deg);
    }
    .pinned {
      transform: rotate(45deg);
    }

    #noteTitle, #noteBody {
      color: #656565!important;
    }
    #noteTitle {
      font-size: 20px;
      font-weight: bolder;
    }

  }

  .note-private-toggle label {
    top: 5px!important;
  }

  .tag-input span.chip, .tag-input span.v-chip {
    background-color: #1976d2;
    color: #fff;
    padding-left:7px;
  }

  .tag-input span.chip::before, .tag-input span.v-chip::before {
    content: "label";
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 1em;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

</style>
