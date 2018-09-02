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
  deleteNote: (id) => environment.getEndpoint(`note/${id}`)
};

@Component({
  components: {
    'note-detail': PortalNoteDetail,
    'tiny-mce': tinymce,
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
    automatic_uploads: true,
    images_upload_handler(blobInfo, success, failure) {
      console.log(blobInfo.filename());
    },
    file_picker_callback: function(cb, value, meta) {
      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      // Note: In modern browsers input[type="file"] is functional without
      // even adding it to the DOM, but that might not be the case in some older
      // or quirky browsers like IE, so you might want to add it to the DOM
      // just in case, and visually hide it. And do not forget do remove it
      // once you do not need it anymore.

      input.onchange = function() {
        var file = this.files[0];

        var reader = new FileReader();
        reader.onload = function() {
          // Note: Now we need to register the blob in TinyMCEs image blob
          // registry. In the next release this part hopefully won't be
          // necessary, as we are looking to handle it internally.
          var id = 'blobid' + (new Date()).getTime();
          var blobCache = tinymce.activeEditor.editorUpload.blobCache;
          var base64 = reader.result.split(',')[1];
          var blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);

          // call the callback and populate the Title field with the file name
          cb(blobInfo.blobUri(), {title: file.name});
        };
        reader.readAsDataURL(file);
      };

      input.click();

      // win.document.getElementById(fieldName).value = 'my browser value';
    }
  };
  editor = {
    dirty: false
  };

  search = '';

  mounted() {
    this.getNotes();
    this.getUserName();
  }

  updated() {
    const vm = this;
    this.$nextTick(function() {
      vm.onResize();
    });
  }

  get tagsArray() {
    return this.currentNote.noteTags ? this.currentNote.noteTags.split(',') : [];
  }

  set tagsArray(tags) {
    this.currentNote.noteTags = tags.join(',');
  }

  pasted() {
    this.$nextTick(() => {
      this.select.push(...this.search.split(','));
      this.$nextTick(() => {
        this.search = '';
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
}
