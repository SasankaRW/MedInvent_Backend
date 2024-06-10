const express = require("express");

const Controller = require("./controller");

const Validator = require("./vaidator");

const router = express.Router();

router.route("/newsession").post(Validator.create, Controller.createSession);
router.route("/delete/:session_id").delete(Controller.deleteSession);
router.route("/get/byId/:session_id").get(Controller.getSessionById);
router
  .route("/get/clinic/upcoming/:clinic_id")
  .get(Controller.getUpcomingSessionsByClinicID);
router
  .route("/get/clinic/past/:clinic_id")
  .get(Controller.getPastSessionsByClinicID);
router
  .route("/get/doctor/upcoming/:doctor_id")
  .get(Controller.getUpcomingSessionsByDocID);
router
  .route("/get/doctor/past/:doctor_id")
  .get(Controller.getPastSessionsByDocID);
router.route("/get/upcoming").get(Controller.getSessionsByDocAndClinicIDs);
router
  .route("/update/:session_id")
  .put(Validator.update, Controller.updateSession);

//get all session details relevant to specific doctor for doctor's session calendar
//router.route("/get/All/Sessions/details/:doctor_id").get(Controller.getSessionsDetailsByDocID);

//get all session details relevant to specific clinic for clinic's session calendar
//router.route("/get/All/Sessions/details/by/:clinic_id").get(Controller.getSessionsDetailsByClinicID);

// Session cancel by doctor or clinic using session calendar or upcoming session page
//router.route("/update/Cancel/Session/:session_id").put(Validator.update,Controller.updateCancelSessionByID);

module.exports = router;
