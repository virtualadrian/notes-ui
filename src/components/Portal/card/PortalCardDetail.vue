<template>
  <section class="portal-note-detail" id="portalNoteDetail" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="container-fluid">
      <div class="row note-action">
        <div class="col-sm-12 note-title-row">
          <div class="input-group">
            <div class="input-group-prepend">
            <span class="input-group-text">
                <b-form-checkbox v-model="currentNote.isPrivate"
                                 value="true"
                                 unchecked-value="false">Shared</b-form-checkbox>
            </span>
            </div>
            <input v-model="currentNote.noteTitle" type="text"
                   class="form-control note-title-input" placeholder="Add A Title" aria-label="Title"
                   aria-describedby="note-title">
            &nbsp;
            <div class="input-group-prepend">
              <span class="input-group-text">Tags</span>
            </div>
            <input v-model="currentNote.noteTags" type="text"
                   class="form-control note-title-input" placeholder="Add Some Tags" aria-label="Tags"
                   aria-describedby="note-tags">
            &nbsp;
            <b-button v-on:click="cancel()" title="Cancel" variant="secondary">Close</b-button>
            &nbsp;
            <b-button v-on:click="saveNote()" v-shortkey="['ctrl', 's']" @shortkey="saveNote()" title="Save" variant="success">Save Note</b-button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 padding-0">
          <vue-editor
            :customModules="customModulesForEditor"
            :editorOptions="editorSettings"
            ref="noteEditor"
            useCustomImageHandler
            @imageAdded="insertS3Image"
            v-model="currentNote.noteBody"></vue-editor>
        </div>
      </div>
    </div>
    <b-modal id="modal-center" ref="unsavedChanges" centered title="Save Changes First?">
      <p class="my-4">You have unsaved changes! Would you like save before you leave?</p>
      <div slot="modal-footer" class="w-100">
        <b-btn @click="backNoSave" class="btn btn-danger btn-shadow btn-rounded float-sm-left">Don't Save</b-btn>
        <b-btn @click="backWithSave"
               class="btn btn-success btn-shadow btn-rounded float-sm-right">Save Note
        </b-btn>
        <span class="float-sm-right"> &nbsp; </span>
        <b-btn @click="backCancel"
               class="btn btn-secondary btn-shadow btn-rounded float-sm-right">Cancel
        </b-btn>
      </div>

    </b-modal>
  </section>

</template>
<script>
  import { Component, Vue } from 'vue-property-decorator';
  import { VueEditor, Quill } from 'vue2-editor';
  import router from '@/router/index';
  import http from '@/services/http';
  import auth from '@/services/authentication';
  import s3image from '@/services/s3image';
  import environment from '@/services/environment';
  import {ImageDrop} from 'quill-image-drop-module';
  import ImageResize from 'quill-image-resize-module';

  Quill.register('modules/imageResize', ImageResize);
  Quill.register('modules/imageDrop', ImageDrop);

  const getEmptyNote = function() {
    return {id: -1, noteBody: '', noteTitle: '', noteTags: '', isPrivate: true};
  };

  const api = {
    getNote: (id) => environment.getEndpoint(`note/${id}`),
    getEditorImage: (userId, name) => environment.getS3Endpoint(`/images/${userId}/${name}`),
    saveNote: () => environment.getEndpoint(`note`)
  };

  @Component({
    components: {VueEditor}
  })
  export default class PortalNoteDetail extends Vue {
    currentNote = getEmptyNote();
    editor = {
      dirty: false
    };
    customModulesForEditor = [
      { alias: 'imageDrop', module: ImageDrop },
      { alias: 'imageResize', module: ImageResize }
    ];
    editorSettings = {
      modules: {
        imageDrop: true,
        imageResize: {}
      }
    };

    onTextChanged() {
      this.editor.dirty = true;
    }

    mounted() {
      this.currentNote.id = this.$route.params.id;
      this.loadNoteDetail();
      this.resizeEditor();
      window.addEventListener('resize', this.resizeEditor);
    }

    beforeDestroy() {
      window.removeEventListener('resize', this.resizeEditor);
    }

    resizeEditor() {
      const quillWrapper = document.querySelectorAll('.quillWrapper')[0];
      if (quillWrapper) {
        const height = document.body.clientHeight - 217;
        quillWrapper.style.height = `${height}px`;
      }
    }

    getNoteDetail() {
      if (!this.currentNote.id) { return; }
      return http.get(api.getNote(this.currentNote.id));
    }

    loadNoteDetail() {
      if (!this.currentNote.id) { return; }
      return this.getNoteDetail()
        .then((response) => {
          this.showNote(response);
        })
        .then(() => {
          this.$refs.noteEditor.quill.on('editor-change', this.onTextChanged);
        })
        .then(() => {
          this.editor.dirty = false;
        });
    }

    saveNote() {
      const save = (this.currentNote.id >= 0)
        ? http.put(api.saveNote(), this.currentNote)
        : http.post(api.saveNote(), this.currentNote);

      return save.then((response) => {
        this.showNote(response);
        this.$toastr.defaultTimeout = 1000;
        this.$toastr.s('Note has been saved.');
        this.editor.dirty = false;
      });
    }

    backWithSave() {
      this.saveNote()
        .then(() => {
          router.push({name: 'PortalNotes'});
        });
    }

    backNoSave() {
      router.push({name: 'PortalNotes'});
    }

    backCancel() {
      this.$refs.unsavedChanges.hide();
    }

    cancel() {
      // editor-change
      if (!this.editor.dirty) {
        router.push({name: 'PortalNotes'});
      } else {
        this.$refs.unsavedChanges.show();
      }
    }

    insertS3Image(file, Editor, cursorLocation) {
      s3image.getSignature()
        .then(() => {
          s3image.uploadImage(file)
            .then(() => {
              Editor.insertEmbed(cursorLocation,
                'image',
                api.getEditorImage(auth.getCurrentUserAccountId(), file.name));
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }

    showNote(response) {
      if (response.data && response.data !== '') {
        this.currentNote = response.data;
        router.push({name: 'PortalNoteDetail', params: { id: this.currentNote.id }});
      }
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
