export default class Api {
  constructor() {
    this.apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
  }

  async __request(url, options) {
    const response = await fetch(`${this.apiEndpoint}${url}`, options);
    return await response.json();
  }

  async getAppConfig() {
    return await this.__request('/custom/v1/casket-settings');
  }

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    const options = {
      method: 'POST',
      body: formData
    };

    return await this.__request('/wp-json/custom/v1/casket-upload-image', options);
  }

  async saveDesign(design) {
    const options = {
      method: 'POST',
      body: JSON.stringify(design)
    };
    return await this.__request('/wp-json/custom/v1/casket-save-json', options);
  }
}