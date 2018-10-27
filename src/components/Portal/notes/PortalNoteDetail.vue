<template>
  <section>
    <v-snackbar bottom :timeout="3000"
                multi-line="multi-line"
                v-model="snack.isVisible" :color="snack.color">
      <v-flex xs1><v-icon size="22px" flat class="white--text">done_all</v-icon></v-flex>
      <v-spacer></v-spacer>
      <v-flex xs8 class="subheading font-weight-medium text-xs-right" >{{snack.message}}</v-flex>
      <v-flex xs3><v-btn icon flat @click="snack.isVisible = false"><v-icon>close</v-icon></v-btn></v-flex>
    </v-snackbar>
    <v-card>
      <save-toolbar @save-note="save" @clear-note="clearChanges"></save-toolbar>
      <v-container fluid>
        <v-layout>
          <v-flex xs12>

            <!-- Note Body WYSIWYG -->
            <note-editor ref="editor"></note-editor>

          </v-flex>
        </v-layout>
      </v-container>

    </v-card>
    <v-dialog v-model="saveDialog" refs="saveDialog"
              persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Save Changes?</v-card-title>
        <v-card-text>
          You have unsaved changes! Would you like save before you leave?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="danger" flat @click.native="discardChanges">Don't Save</v-btn>
          <v-btn color="success" flat @click.native="saveAndClose">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>
import {Component, Vue} from 'vue-property-decorator';
import {mapActions, mapGetters} from 'vuex';

import SaveToolbar from '@/components/Portal/shared/SaveToolbar.vue';
import NoteEditor from '@/components/Portal/shared/NoteEditor.vue';

@Component({
  components: {
    'save-toolbar': SaveToolbar,
    'note-editor': NoteEditor
  },
  computed: {
    ...mapGetters('noteStore', ['currentNote'])
  },
  methods: {
    ...mapActions('noteStore', ['saveNote', 'getNoteDetail', 'clearNote'])
  }
})
export default class PortalNoteDetail extends Vue {
  saveDialog = false;
  snack = {
    isVisible: false,
    color: 'success',
    message: ''
  };

  closeEditor() {
    this.clearNote();
    window.tinymce.activeEditor.setDirty(false);
    this.currentNote.hasChanges = false;
    this.$router.push({name: 'Notes', params: { filter: 'ALL' }});
  }

  saveAndClose() {
    this.save();
    this.closeEditor();
  }

  clearChanges() {
    if (this.$refs.editor.hasChanges()) {
      this.saveDialog = true;
      return;
    }
    this.closeEditor();
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

  save() {
    window.tinymce.activeEditor.setDirty(false);
    this.currentNote.hasChanges = false;

    return this.saveNote(this.$refs.editor.getNoteSaveBody())
      .then(() => {
        this.success('Note has been saved.');
      });
  }
}
</script>
<style scoped lang="scss">
  .portal-note-detail {
    height: auto;
  }
  .note-title-row {
    padding-top: 3px;
  }
  .note-action {
    padding: 25px 0 10px 0px;
    margin-top: 0;
    background-color: #f7f7f7;
  }

  .note-title-input {
    font-size: 18px;
  }

  .note-action-back {
    padding: 0;
    text-align: center;
  }

  .note-action-save {
    padding: 0;
    text-align: right;
  }

  .quillWrapper {
    height: 95%;
  }

  .ql-container {
    height: calc(100% - 47px);
  }

  .ql-editor {
    height: calc(100% - 42px);
  }
</style>
