const logger = require("../config/logger");
const Translate = require("./Translate");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function translate(lan) {
  let language;
  if (lan == 1) {
    language = "en-us";
  } else if (lan == 2) {
    language = "es-ve";
  }
  return Translate.translateTexts(language);
}

module.exports = class Email {
  constructor(userEmail, userName, purpose, language) {
    this.userEmail = userEmail;
    this.userName = userName;
    this.from = process.env.EMAIL;
    this.purpose = purpose;
    this.language = language;
    this.data = {
      sender_name: "Mr. Postel",
      announcement: {},
      column1: {},
      column2: {},
      column3: {},
    };
  }

  async translateEmail(lan, purpose, password) {
    let translator = await translate(lan);
    let translatedText = translator.data.result.terms.filter((term) => {
      return term.context == "email" + purpose || term.context == "email";
    });
    translatedText.forEach((term) => {
      if (term.term == "emailTitle") {
        this.data.subject = term.translation.content;
        this.data.title = term.translation.content;
      } else if (term.term == "emailBody" && this.purpose !== "Password") {
        this.data.email_body = this.userName + ", " + term.translation.content;
      } else if (term.term == "emailBody" && this.purpose == "Password") {
        this.data.email_body =
          this.userName +
          ", " +
          term.translation.content +
          " <strong>" +
          password +
          "</strong>";
      } else if (term.term == "emailDescription") {
        this.data.announcement.description = term.translation.content;
      } else if (term.term == "emailThanks") {
        this.data.thanks = term.translation.content;
      } else if (term.term == "emailC1Keyword") {
        this.data.column1.keyword = term.translation.content;
      } else if (term.term == "emailC2Keyword") {
        this.data.column2.keyword = term.translation.content;
      } else if (term.term == "emailC3Keyword") {
        this.data.column3.keyword = term.translation.content;
      } else if (term.term == "emailC1Description") {
        this.data.column1.description = term.translation.content;
      } else if (term.term == "emailC2Description") {
        this.data.column2.description = term.translation.content;
      } else if (term.term == "emailC3Description") {
        this.data.column3.description = term.translation.content;
      }
    });
  }

  async discountAnnouncement(discount) {
    this.data.announcement.resume = `${discount}%`;
    await this.translateEmail(this.language, this.purpose, null);
    const msg = {
      to: this.userEmail,
      from: this.from,
      dynamic_template_data: this.data,
      template_id: process.env.SENDGRID_TEMPLATE,
    };
    this.send(msg);
  }

  async passwordChange(password) {
    await this.translateEmail(this.language, this.purpose, password);
    const msg = {
      to: this.userEmail,
      from: this.from,
      dynamic_template_data: this.data,
      template_id: process.env.SENDGRID_TEMPLATE,
    };
    this.send(msg);
  }

  async invoice(file) {
    await this.translateEmail(this.language, this.purpose);
    const msg = {
      to: this.userEmail,
      from: this.from,
      dynamic_template_data: this.data,
      attachments: [
        {
          filename: file.originalname,
          type: file.mimetype,
          content: file.buffer.toString("base64"),
        },
      ],
      template_id: process.env.SENDGRID_TEMPLATE,
    };
    this.send(msg);
  }

  async send(msg) {
    sgMail
      .send(msg)
      .then(() => {
        logger.info({
          message: `"${this.purpose} email" was send sucessfully`,
        });
      })
      .catch((error) => {
        logger.error({
          message: `Error: ${error.code}, ${error.message}. Failed to send ${this.purpose} email`,
        });
      });
  }
};
