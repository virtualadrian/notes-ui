import {Prop, Component, Vue} from 'vue-property-decorator';
import environment from '@/services/environment';
import auth from '@/services/authentication';
import s3image from '@/services/s3image';
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
    branding: false,
    file_picker_types: 'image',
    image_title: true,
    automatic_uploads: true,
    images_upload_handler: this.handleUpload,
    file_picker_callback: this.handleFilePick
  };

  @Prop()
  note;

  mounted() {
    api.currentUserAccountId = auth.getCurrentUserAccountId();
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
}
