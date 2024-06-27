const express = require("express");
const Controller = require("./controller");
const Validator = require("./validator");
const router = express.Router();

router
  .route("/add/new/PatientUser")
  .post(Validator.create, Controller.createPatientUser);

router.route("/get/PatientUsers/details").get(Controller.getAllPatientUsers);

router
  .route("/get/PatientUser/details/byUserId/:userID")
  .get(Controller.getPatientUserByID);

router
  .route("/get/PatientUser/details/byNic/:nic")
  .get(Controller.getPatientUserByNic);

router
  .route("/get/PatientUser/details/byEmail/:email")
  .get(Controller.getPatientUserByEmail);

router
  .route("/get/PatientUser/details/byMobileNo/:mobileNo")
  .get(Controller.getPatientUserByMobileNo);

router.route("/check/emailandmobileno").get(Controller.checkEmailAndMobileNo);

router.route("/check/nic/:nic").get(Controller.checkNic);

router.route("/check/emailandnic").get(Controller.checkEmailAndNic);

router
  .route("/update/PatientUser/:userID")
  .put(Controller.updatePatientUserByID);

router
  .route("/delete/PatientUser/:userID")
  .delete(Controller.deletePatientUserByID);

module.exports = router;
