<template>
  <v-layout v-resize="onResize">
    <v-flex>
      <tinymce id="noteEditor" v-model="note.noteBody"
               :toolbar2="toolbar2" ref="editorBody" :other_options="otherOptions">
      </tinymce>
    </v-flex>
  </v-layout>
</template>
<script>
import {Prop, Component, Vue} from 'vue-property-decorator';
import environment from '@/global/services/environment';
import auth from '@/global/services/authentication';
import s3image from '@/global/services/s3image';
import tinymce from 'vue-tinymce-editor';

const api = {
  getEditorImage: (userId, name) => environment.getS3Endpoint(`/images/${userId}/${name}`),
  currentUserAccountId: 0
};

const fileUpload = {
  handleFileReaderLoad(editor, reader, file, callback) {
    return function() {
      const id = 'blobid' + (new Date()).getTime();
      const blobCache = editor.editorUpload.blobCache;
      const base64 = reader.result.split(',')[1];
      const blobInfo = blobCache.create(id, file, base64);
      blobCache.add(blobInfo);
      callback(blobInfo.blobUri(), {title: file.name});
    };
  },
  handleFileInputChange(editor, callback) {
    return function() {
      const file = this.files[0];
      const reader = new FileReader();
      reader.onload = fileUpload.handleFileReaderLoad(editor, reader, file, callback);
      reader.readAsDataURL(file);
    };
  }
};

@Component({
  components: {
    tinymce
  }
})
export default class NoteEditor extends Vue {
  toolbar2 = 'codesample';

  otherOptions = {
    codesample_content_css: '/static/style/prism.css',
    menubar: 'edit insert view format table tools',
    branding: false,
    file_picker_types: 'image',
    image_title: true,
    automatic_uploads: true,
    images_upload_handler: this.handleUpload,
    file_picker_callback: this.handleFilePick
  };

  @Prop({
    type: Object,
    default: () => {
      return {};
    }
  })
  note;

  mounted() {
    api.currentUserAccountId = auth.getCurrentUserAccountId();
    setTimeout(this.onResize, 200);
  }

  handleFilePick(callback, value, meta) {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');

    fileInput.onchange = fileUpload.handleFileInputChange(this, callback);
    fileInput.click();
  }

  handleUpload(blobInfo, success, failure) {
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

  onResize() {
    if (window.tinymce && window.tinymce.activeEditor) {
      this.windowSize = {
        x: this.$refs.editorBody.$el.clientWidth,
        y: window.innerHeight - 440
      };
      window.tinymce.activeEditor.theme.resizeTo(this.windowSize.x, this.windowSize.y);
    }
  }

  getNoteSaveBody() {
    return window.tinymce.activeEditor.save();
  }

  hasChanges() {
    return window.tinymce.activeEditor.isDirty() || this.note.hasChanges;
  }
}

</script>
<style lang="scss">
  .portal-notes {

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

  .quick-compose {
    background-color: #808598!important;
    color: #ffffff!important;;
  }

  .v-expansion-panel__header__icon .v-icon {
    color: #ffffff !important;
  }

  .quick-compose .qc-header {
    background-color: transparent!important;
    font-size: 18px;
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
