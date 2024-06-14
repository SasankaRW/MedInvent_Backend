const express = require("express");

const Controller = require("./controller");

const router = express.Router();

//send notification method temporary
router.route("/send/notification").post(Controller.sendPushNotificationTemporary);

//OTP send to link user =>(5)
router.route("/send/OTP/link/user").post(Controller.sendOTPtoLInkUser);

//validate user entered OTP =>(6)
router.route("/check/OTP").post(Controller.checkOTP);

//check user available to get tokens for OTP =>(2)
router.route("/check/user/available").post(Controller.checkAvailability);

//add tokens to TokenStore table(can use for all) =>(1)
router.route("/add/tokens/to/table").post(Controller.addTokens);

//get relevant user tokens to send OTP =>(4)
router.route("/get/tokens/to/send/OTP").post(Controller.getTokensToOTP);

//update is_activeToken(can use for all) =>(3)
router.route("/update/isActive").put(Controller.updateIsActive);

module.exports = router;
