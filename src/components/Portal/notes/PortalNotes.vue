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

    <preview-note :note.sync="previewingNote" ref="previewDialog"></preview-note>

    <note-grid :notes.sync="noteList"
               @view-note="viewNote" @pin-note="pinNote"
               @delete-note="deleteNote" @create-cards-from-note="createCardsFromNote"
               @create-favorite-note="createFavoriteNote"
               @duplicate-note="duplicateNote" @archive-note="archiveNote">

    </note-grid>

  </section>
</template>
<script>
import { Component, Vue, Emit } from 'vue-property-decorator';

import auth from '@/global/services/authentication';
import PreviewNote from '@/components/Portal/shared/PreviewNote.vue';
import NoteGrid from '@/components/Portal/shared/NoteGrid.vue';
import QuickCompose from '@/components/Portal/shared/QuickCompose.vue';
import {mapActions, mapGetters} from 'vuex';

@Component({
  components: {
    'preview-note': PreviewNote,
    'quick-compose': QuickCompose,
    'note-grid': NoteGrid
  },
  computed: {
    ...mapGetters('noteStore', ['noteList'])
  },
  methods: {
    ...mapActions('noteStore', ['getNotes', 'pinNote', 'createFavoriteNote', 'shareNote', 'duplicateNote', 'archiveNote'])
  }
})
export default class PortalNotes extends Vue {
  currentNote = {};
  previewingNote = {};
  filter = 'ALL';

  snack = {
    isVisible: false,
    color: 'success',
    message: ''
  };

  mounted() {
    this.filter = this.$route.params.filter || 'ALL';
    this.getNotes(this.filter);
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

  @Emit()
  createCardsFromNote(note) {
    console.log('createCardsFromNote');
  }

  @Emit()
  confirmDeleteNote(note) {

  }

  deleteNote(note) {

  }

  getUser() {
    // api.currentUserAccountId = auth.getCurrentUserAccountId();
    this.currentUserFirstName = auth.getCurrentUserFirstName();
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
