const express = require("express");

const Controller = require("./controller");

const router = express.Router();

//send notification method temporary
router.route("/send/notification").post(Controller.sendPushNotificationTemporary);

//OTP send to link user
router.route("/send/OTP/link/user").post(Controller.sendOTPtoLInkUser);

//validate user entered OTP
router.route("/check/OTP").post(Controller.checkOTP);

module.exports = router;
