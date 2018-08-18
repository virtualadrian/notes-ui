
window['notes'] = window['notes'] || {};

class Environment {
  getEndpoint(endpoint) {
    if (endpoint && endpoint.substring(0, 1) !== '/') {
      endpoint = `/${endpoint}`;
    }
    return window.notes.serverUrl + endpoint;
  }
  getValue(key) {
    return window['notes'][key];
  }
  getValueDefault(key, def) {
    return window['notes'][key] || def;
  }
  getS3Endpoint(endpoint) {
    if (endpoint && endpoint.substring(0, 1) !== '/') {
      endpoint = `/${endpoint}`;
    }
    const bucketName = this.getValue('AWSS3Bucket');
    return `https://s3.amazonaws.com/${bucketName}/${endpoint}`;
  }
}

export default new Environment();
