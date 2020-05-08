const logger = require("../logger");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
  constructor(userEmail, email, announcement, description) {
    this.to = userEmail;
    this.from = process.env.EMAIL;
    this.email = {
      title: email.title,
      body: email.body,
      thanks: email.thanks,
    };
    this.announcement = {
      resume: announcement.resume,
      description: announcement.description,
    };
    this.description = {
      column1: {
        keyword: description.column1.keyword,
        description: description.column1.description,
      },
      column2: {
        keyword: description.column2.keyword,
        description: description.column2.description,
      },
      column3: {
        keyword: description.column3.keyword,
        description: description.column3.description,
      },
    };
  }

  send(purpose) {
    const msg = {
      to: this.to,
      from: this.from,
      dynamic_template_data: {
        sender_name: "Mr. Postel",
        title: this.email.title,
        email_body: this.email.body,
        thanks: this.email.thanks,
        announcement: this.announcement,
        column1: this.description.column1,
        column2: this.description.column2,
        column3: this.description.column3,
      },
      template_id: "d-1570c8919ebf4f0ea524efd529008026",
    };

    sgMail
      .send(msg)
      .then(() => {
        logger.info({
          message: `"${purpose} email" was send sucessfully`,
        });
      })
      .catch((error) => {
        logger.error({
          message: `Error: ${error.code}, ${error.message}. Failed to send ${purpose} email`,
        });
      });
  }
};

// const Email = require("../../utils/Email");
// await new Email(
//   "alba.sofia.n.n@gmail.com",
//   {
//     title: "Welcome to Mr. Postel",
//     body:
//       "Thank you for signing up, Alba. <br> With <strong>MrPostel</strong> you can send your packages all over the US. <br> To celebrate that you chose us, we will give you a discount to start your experience with us!",
//     thanks: "Thank you for choosing us!",
//   },
//   {
//     resume: "-50% OFF",
//     description: "Subscription discount",
//   },
//   {
//     column1: {
//       keyword: "Ship",
//       description: "Anywhere in the US! It's quick and simple",
//     },
//     column2: {
//       keyword: "Track",
//       description: "Your shipment's delivery process using our Telegram bot",
//     },
//     column3: {
//       keyword: "Keep connected",
//       description: "Stay safe. Leave the rest to us!",
//     },
//   }
// ).send("Welcome");
