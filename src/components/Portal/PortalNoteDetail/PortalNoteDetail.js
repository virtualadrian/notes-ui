import { Component, Vue } from 'vue-property-decorator';
import { VueEditor } from 'vue2-editor';
import router from '@/router';
import http from '@/services/http';
import auth from '@/services/authentication';
import s3image from '@/services/s3image';
import environment from '@/services/environment';

const getEmptyNote = function() {
  return {id: -1, noteBody: '', noteTitle: '', noteTags: ''};
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
