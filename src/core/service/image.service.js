import environment from '@/global/services/environment';
import auth from '@/global/services/authentication';
import s3image from '@/global/services/s3image';

const api = {
  getEditorImage: (userId, name) => environment.getS3Endpoint(`/images/${userId}/${name}`),
  currentUserAccountId: auth.getCurrentUserAccountId()
};

class ImageService {
  static handleFileReaderLoad(editor, reader, file, callback) {
    return function() {
      const id = 'blobid' + (new Date()).getTime();
      const blobCache = editor.editorUpload.blobCache;
      const base64 = reader.result.split(',')[1];
      const blobInfo = blobCache.create(id, file, base64);
      blobCache.add(blobInfo);
      callback(blobInfo.blobUri(), {title: file.name});
    };
  }

  static handleFileInputChange(editor, callback) {
    return function() {
      const file = this.files[0];
      const reader = new FileReader();
      reader.onload = ImageService.handleFileReaderLoad(editor, reader, file, callback);
      reader.readAsDataURL(file);
    };
  }

  handleFilePick(callback, value, meta) {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');

    fileInput.onchange = ImageService.handleFileInputChange(this, callback);
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

export default new ImageService();
