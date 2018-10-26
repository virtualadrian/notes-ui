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
      <save-toolbar @save-note="saveNote" @clear-note="clearChanges"></save-toolbar>
      <v-container fluid>
        <v-layout>
          <v-flex xs12>

            <!-- Note title, tags, etc -->
            <note-meta :note="note"></note-meta>

            <!-- Note Body WYSIWYG -->
            <note-editor :note="note" ref="editor"></note-editor>

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
  import { Component, Vue } from 'vue-property-decorator';
  import http from '@/services/http';
  import environment from '@/services/environment';

  import SaveToolbar from '@/components/Portal/shared/SaveToolbar.vue';
  import PortalNoteMeta from '@/components/Portal/notes/PortalNoteMeta.vue';
  import NoteEditor from '@/components/Portal/shared/NoteEditor.vue';

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
