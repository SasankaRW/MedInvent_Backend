const express = require("express");

const Controller = require("./controller");

const router = express.Router();

//send notification method temporary
router.route("/send/notification").post(Controller.sendPushNotificationTemporary);

//OTP send to link user
router.route("/send/OTP/link/user").post(Controller.sendOTPtoLInkUser);

//validate user entered OTP
router.route("/check/OTP").post(Controller.checkOTP);

//check user available to get tokens dor OTP
router.route("/check/user/available").get(Controller.checkAvailability);

//add tokens to TokenStore table(can use for all)
router.route("/add/tokens/to/table").post(Controller.addTokens);

//get relevant user tokens to send OTP
router.route("/get/tokens/to/send/OTP").get(Controller.getTokensToOTP);

//update is_activeToken(can use for all)
router.route("/update/isActive").put(Controller.updateIsActive);

module.exports = router;
