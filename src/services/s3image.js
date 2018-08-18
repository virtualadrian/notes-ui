import environment from '@/services/environment';
import http from '@/services/http';
import auth from '@/services/authentication';
import axios from 'axios';

const s3http = axios.create();

const api = {
  getS3Policy: () => environment.getEndpoint(`storage/s3/sign`)
};

const s3api = {
  upload: () => 'https://s3.amazonaws.com/userasset.dev.noteler.com/' // environment.getS3Endpoint('http://sigv4examplebucket.s3.amazonaws.com/')
};

class S3ImageUpload {
  policy = {};
  getSignature() {
    return http.get(api.getS3Policy())
      .then(result => {
        this.policy = result.data;
      });
  }
  uploadImage(file) {
    const formData = new FormData();

    formData.append('key', `images/${auth.getCurrentUserAccountId()}/${file.name}`);
    formData.append('AWSAccessKeyId', 'AKIAIK2BQXMNK2YZHHZA');
    formData.append('acl', 'ec2-bundle-read');
    formData.append('policy', this.policy.postPolicy);
    formData.append('signature', this.policy.policySignature);
    formData.append('file', file);

    return s3http.post(s3api.upload(), formData);

    //
    // .then(result => {
    //   console.dir(result);
    // });
  }
}

export default new S3ImageUpload();
