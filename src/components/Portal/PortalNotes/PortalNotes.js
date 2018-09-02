import {Component, Vue} from 'vue-property-decorator';
import http from '@/services/http';
import auth from '@/services/authentication';
import environment from '@/services/environment';
import striphtml from '@/shared/filter/striphtml';
import PortalNoteDetail from '@/components/Portal/PortalNoteDetail/PortalNoteDetail.vue';

import InputTag from 'vue-input-tag';
import s3image from '@/services/s3image';

import tinymce from 'vue-tinymce-editor';

const api = {
  getNotes: () => environment.getEndpoint(`note`),
  getEditorImage: (userId, name) => environment.getS3Endpoint(`/images/${userId}/${name}`),
  deleteNote: (id) => environment.getEndpoint(`note/${id}`),
  saveNote: () => environment.getEndpoint(`note`),
  currentUserAccountId: 0
};

@Component({
  components: {
    'note-detail': PortalNoteDetail,
    tinymce,
    InputTag
  },
  filters: {striphtml}
})
export default class PortalNotes extends Vue {
  notesResult = {};
  currentUserFirstName = 'Awesomeness';
  currentNote = {};
  editingNote = false;

  toolbar2 = 'codesample';

  otherOptions = {
    branding: false,
    file_picker_types: 'image',
    image_title: true,
    automatic_uploads: true,
    images_upload_handler: this.uploadToAwsS3,
    file_picker_callback: function(callback, value, meta) {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      const editor = this;
      input.onchange = function() {
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function() {
          const id = 'blobid' + (new Date()).getTime();
          const blobCache = editor.editorUpload.blobCache;
          var base64 = reader.result.split(',')[1];
          var blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);
          callback(blobInfo.blobUri(), {title: file.name});
        };
        reader.readAsDataURL(file);
      };

      input.click();
    }
  };
  editor = {
    dirty: false,
    tag: '',
    tags: []
  };

  mounted() {
    this.getNotes();
    this.getUser();
  }

  updated() {
    const vm = this;
    this.$nextTick(function() {
      vm.onResize();
    });
  }

  pasted() {
    if (!this.editor.tag) { return; }
    this.$nextTick(() => {
      this.editor.tags.push(...this.editor.tag.split(','));
      this.$nextTick(() => {
        this.editor.tag = '';
      });
    });
  }

  onResize() {
    if (window.tinymce && window.tinymce.activeEditor) {
      this.windowSize = {
        x: this.$refs.noteEditorForm.$el.clientWidth,
        y: window.innerHeight - 340
      };
      window.tinymce.activeEditor.theme.resizeTo(this.windowSize.x, this.windowSize.y);
    }
  }

  uploadToAwsS3(blobInfo, success, failure) {
    s3image.getSignature()
      .then(() => {
        s3image.uploadImage(blobInfo)
          .then(() => {
            success(api.getEditorImage(api.currentUserAccountId, blobInfo.filename()), 2000);
          })
          .catch((err) => {
            failure(err);
          });
      });
  }

  getUser() {
    api.currentUserAccountId = auth.getCurrentUserAccountId();
    this.currentUserFirstName = auth.getCurrentUserFirstName();
  }

  openNoteEditor(note) {
    this.currentNote = note;
    this.editingNote = true;
    this.editor.tags = this.currentNote.noteTags.split(',') || [];
    setTimeout(() => {
      this.editor.dirty = false;
    }, 500);
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
    return;
    // editor-change
    if (!this.editor.dirty) {
      this.editingNote = false;
      this.editor.dirty = false;
      this.currentNote = null;
    } else {
      this.$refs.unsavedChanges.show();
    }
  }

  saveNote() {
    this.currentNote.noteTags = this.editor.tags.join(',');
    const save = (this.currentNote.id >= 0)
      ? http.put(api.saveNote(), this.currentNote)
      : http.post(api.saveNote(), this.currentNote);

    return save
      .then(response => { return response.data; })
      .then(response => {
        if (this.currentNote.id >= 0) {
          this.currentNote.noteTitle = response.noteTitle;
          this.currentNote.noteBody = response.noteBody;
          this.currentNote.noteTags = response.noteTags;
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
