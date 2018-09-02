import {Component, Vue} from 'vue-property-decorator';
import http from '@/services/http';
import auth from '@/services/authentication';
import environment from '@/services/environment';
import striphtml from '@/shared/filter/striphtml';
import PortalNoteDetail from '@/components/Portal/PortalNoteDetail/PortalNoteDetail.vue';
import { VueEditor, Quill } from 'vue2-editor';
import ImageResize from 'quill-image-resize-module';
import {ImageDrop} from 'quill-image-drop-module';
import InputTag from 'vue-input-tag';
import s3image from '@/services/s3image';

const api = {
  getNotes: () => environment.getEndpoint(`note`),
  deleteNote: (id) => environment.getEndpoint(`note/${id}`)
};

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

@Component({
  components: {
    'note-detail': PortalNoteDetail,
    VueEditor,
    InputTag
  },
  filters: {striphtml}
})
export default class PortalNotes extends Vue {
  notesResult = {};
  currentUserFirstName = 'Awesomeness';
  currentNote = {};
  editingNote = false;
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
  editor = {
    dirty: false
  };
  mounted() {
    this.getNotes();
    this.getUserName();
    this.$refs.noteEditor.quill.on('editor-change', this.onTextChanged);
    window.addEventListener('resize', this.resizeEditor);
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
  getUserName() {
    this.currentUserFirstName = auth.getCurrentUserFirstName();
  }

  openNoteEditor(note) {
    this.currentNote = note;
    this.editingNote = true;
    setTimeout(() => { this.editor.dirty = false; }, 500);
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

  onTextChanged() {
    this.editor.dirty = true;
  }

  getNotes() {
    http.get(api.getNotes())
      .then((result) => {
        result.data.content[3].isPinned = true;
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
    if (!this.currentNote) { return; }
    http.delete(api.deleteNote(this.currentNote.id))
      .then(() => {
        this.$refs.deleteNote.hide();
        this.$toastr.s('Note has been removed.');
        this.getNotes();
      });
  }
}
