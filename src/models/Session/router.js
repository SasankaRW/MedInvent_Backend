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

module.exports = router;
