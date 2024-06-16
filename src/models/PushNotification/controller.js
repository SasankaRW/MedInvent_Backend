const Service = require("./service");
const { SUC_CODES } = require("./constants").Codes;
const { SUCCESS, ERROR } = require("../../helper");
const NotificationFunctions =require('./notificationfunction');


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
      const result = await NotificationFunctions.sendPushNotificationTemporary(req,res,next);
    } catch (error) {
      console.log(error);
    }
};

const getTokensToOTP =async(req,res)=>{
  try {
    const result = await Service.getTokensToOTP(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {

    ERROR(res, error, res.span);
  }
}

const checkAvailability =async(req,res)=>{
  try {
    const result = await Service.checkAvailability(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {

    ERROR(res, error, res.span);
  }
}

const addTokens = async (req, res) => {
  try {
    const result = await Service.addTokens(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const updateIsActive = async (req, res) => {
  try {
    const result = await Service.updateIsActive(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

const getAllOTP = async (req, res) => {
  try {
    const result = await Service.getAllOTP(req.body);

    SUCCESS(res, SUC_CODES, result, req.span);
  } catch (error) {
    console.log(error);

    ERROR(res, error, res.span);
  }
};

module.exports = {
    sendOTPtoLInkUser,
    checkOTP,
    getTokensToOTP,
    checkAvailability,
    addTokens,
    updateIsActive,
    sendPushNotificationTemporary,
    getAllOTP,
};
  