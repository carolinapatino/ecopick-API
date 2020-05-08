const logger = require("../logger");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
  constructor(userEmail, userName, purpose) {
    this.userEmail = userEmail;
    this.userName = userName;
    this.from = process.env.EMAIL;
    this.purpose = purpose;
  }

  discountAnnouncement(discount) {
    if (this.purpose == "Welcome") {
      var data = {
        subject: "Welcome to Mr. Postel!",
        sender_name: "Mr. Postel",
        title: "Welcome to Mr. Postel",
        email_body: `Thank you for signing up, ${this.userName}. <br> With <strong>MrPostel</strong> you can send your packages all over the US. <br> To celebrate that you chose us, we will give you a discount to start your experience with us!`,
        thanks: "Thank you for choosing us!",
        announcement: {
          resume: `${discount} OFF`,
          description: "Welcome discount",
        },
      };
    } else if (this.purpose == "Discount") {
      var data = {
        subject: "Special discount",
        sender_name: "Mr. Postel",
        title: "Mr. Postel special discount!",
        email_body: `Hey ${this.userName}. <br> <strong>MrPostel</strong> loves to celebrate everyday with you. <br> So we are happy to give you a discount gift!`,
        thanks: "Thank you for choosing us!",
        announcement: {
          resume: `${discount} OFF`,
          description: "Special discount",
        },
      };
    }

    data.column1 = {
      keyword: "Ship",
      description: "Anywhere in the US! It's quick and simple",
    };
    data.column2 = {
      keyword: "Track",
      description: "Your shipment's delivery process using our Telegram bot",
    };
    data.column3 = {
      keyword: "Keep connected",
      description: "Stay safe. Leave the rest to us!",
    };

    const msg = {
      to: this.userEmail,
      from: this.from,
      dynamic_template_data: data,
      template_id: "d-1570c8919ebf4f0ea524efd529008026",
    };

    this.send(msg);
  }

  passwordChange(password) {
    var data = {
      subject: "Password change",
      sender_name: "Mr. Postel",
      title: "New password",
      email_body: `Hello ${this.userName}. <br> Your new password is <strong>${password}</strong>.`,
      thanks: "Thank you for choosing us!",
      announcement: {
        resume: `Password change`,
      },
    };
    data.column1 = {
      keyword: "Ship",
      description: "Anywhere in the US! It's quick and simple",
    };
    data.column2 = {
      keyword: "Track",
      description: "Your shipment's delivery process using our Telegram bot",
    };
    data.column3 = {
      keyword: "Keep connected",
      description: "Stay safe. Leave the rest to us!",
    };

    const msg = {
      to: this.userEmail,
      from: this.from,
      dynamic_template_data: data,
      template_id: "d-1570c8919ebf4f0ea524efd529008026",
    };

    this.send(msg);
  }

  send(msg) {
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

// const Email = require("../../utils/Email");

// function (req, res, next) {
//   await new Email(
//         req.body.userEmail,
//         req.body.email,
//         req.body.announcement,
//         req.body.description
//       ).send(req.body.purpose);
// })
