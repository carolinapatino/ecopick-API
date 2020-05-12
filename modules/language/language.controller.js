const createError = require("http-errors");
const logger = require("../../config/logger");
const Translate = require("../../utils/Translate");

module.exports = {
  translate: async (req, res, next) => {
    let texts = await Translate.translateTexts(req.params.language);
    if (texts instanceof Error || texts.data.response.code != 200) {
      logger.error({
        message: `STATUS ${texts.data.response.code} | TRANSLATOR ERROR | ${texts.data.response.message}. Failed to translate to ${req.params.language}`,
      });
      res.json({});
      next(
        createError(texts.data.response.code, `${texts.data.response.message}`)
      );
    } else {
      let terms = [];
      texts.data.result.terms.forEach((term) => {
        terms.push({
          name: term.term,
          context: term.context,
          translation: term.translation.content,
        });
      });
      logger.info(
        `STATUS 200 | OK | Text translated to ${req.params.language}`
      );
      res.json(terms);
    }
  },
};
