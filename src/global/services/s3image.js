import environment from '@/global/services/environment';
import http from '@/global/services/http';
import auth from '@/global/services/authentication';
import axios from 'axios';

const s3http = axios.create();

const api = {
  getS3Policy: () => environment.getEndpoint(`storage/s3/sign`)
};

const s3api = {
  upload: () => environment.getS3Endpoint('')
};

class S3ImageUpload {
  policy = {};
  getSignature() {
    return http.get(api.getS3Policy())
      .then(result => {
        this.policy = result.data;
      });
  }
  uploadImage(blobInfo) {
    const formData = new FormData();
    const fileKey = `images/${auth.getCurrentUserAccountId()}/${blobInfo.filename()}`;

    formData.append('key', fileKey);
    formData.append('AWSAccessKeyId', environment.getValue('AWSAccessKeyId'));
    formData.append('acl', environment.getValue('AWSS3Acl'));
    formData.append('policy', this.policy.postPolicy);
    formData.append('signature', this.policy.policySignature);
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    return s3http.post(s3api.upload(), formData);
  }
}

export default new S3ImageUpload();
