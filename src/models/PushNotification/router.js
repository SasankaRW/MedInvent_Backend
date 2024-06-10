const express = require("express");

const Controller = require("./controller");

const router = express.Router();

//send notification method directly
router.route("/send/notification").post(Controller.sendPushNotification);

//OTP send to link user
//router.route("/send/OTP").post(Controller.sendOTPToLInkUser);

// //get session detals relevant to a specific session ID
// router.route("/get/Session/details/:session_id").get(Controller.getSessionDetailsByID);

// //get all session details relevant to specific doctor for doctor's session calendar
// router.route("/get/All/Sessions/details/:doctor_id").get(Controller.getSessionsDetailsByDocID);

module.exports = router;
