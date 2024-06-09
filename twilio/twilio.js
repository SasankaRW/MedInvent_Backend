const dotenv = require("dotenv");
const twilio = require("twilio");
dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const toPhoneNumber = "+94720613890";

const sendSmsNotification = async (message) => {
  console.log(process.env.TWILIO_SID);
  console.log(process.env.TWILIO_AUTH_TOKEN);
  console.log(process.env.TWILIO_PHONE_NUMBER);

  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: toPhoneNumber,
  });
};

module.exports = {
  sendSmsNotification,
};
