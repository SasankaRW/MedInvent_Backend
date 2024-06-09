const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

const sendConfirmationEmail = (recipient) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: recipient,
    subject: "Appointment Confirmation",
    text: `A new session is scheduled for you. Please check your appointments.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendConfirmationEmail;
