const axios = require("axios");
const FormData = require("form-data");

module.exports = {
  translateTexts: (language) => {
    const form = new FormData();
    form.append("api_token", process.env.POEDITOR_API_KEY);
    form.append("id", process.env.POEDITOR_PROJECT_ID);
    form.append("language", language);
    return axios
      .post("https://api.poeditor.com/v2/terms/list", form, {
        headers: form.getHeaders(),
      })
      .catch((error) => {
        return new Error(error);
      });
  },
};
