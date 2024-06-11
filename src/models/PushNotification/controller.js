const Service = require("./service");
const { SUC_CODES } = require("./constants").Codes;
const { SUCCESS, ERROR } = require("../../helper");


const sendOTPtoLInkUser = async (req, res) => {
    try {
      const result = await Service.sendOTPtoLInkUser(req.body);
  
      SUCCESS(res, SUC_CODES, result, req.span);
    } catch (error) {
      console.log(error);
  
      ERROR(res, error, res.span);
    }
};

const checkOTP = async (req, res) => {
  try {
    const result = await Service.checkOTP(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};


const sendPushNotificationTemporary = async (req,res,next) => {
    try {
      const result = await Service.sendPushNotificationTemporary(req,res,next);
    } catch (error) {
      console.log(error);
    }
};


module.exports = {
    sendOTPtoLInkUser,
    checkOTP,
    sendPushNotificationTemporary,
};
  