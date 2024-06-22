const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const router = express.Router();

router
  .route("/add/new/PatientUser")
  .post(Validator.create, Controller.createPatientUserData);

router
  .route("/get/PatientUser/details/byUserId/:userID")
  .get(Controller.getPatientUserDetailsByID);

router.route("/check/emailandmobileno").get(Controller.checkEmailAndMobileNo);

router.route("/check/nic/:nic").get(Controller.checkNic);

router.route("/check/emailandnic").get(Controller.checkEmailAndNic);

router
  .route("/get/PatientUser/details/byNic/:nic")
  .get(Controller.getPatientUserDetailsByNic);

router
  .route("/get/PatientUsers/details")
  .get(Controller.getAllPatientUsersDetails);

router
  .route("/update/PatientUser/:userID")
  .put(Controller.updatePatientUserDetailsByID);

router
  .route("/delete/PatientUser/:userID")
  .delete(Controller.deletePatientUserDetailsByID);

module.exports = router;
