const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const router = express.Router();

//prescription routes
router
  .route("/newprescription")
  .post(Validator.create, Controller.createPrescription);
router
  .route("/getallprescriptions/:userid")
  .get(Controller.getAllPrescriptions);
router
  .route("/getDoctorPrescriptions/:userid")
  .get(Controller.getDoctorPrescriptions);
router
  .route("/getUserPrescriptions/:userid")
  .get(Controller.getUserPrescriptions);
router
  .route("/update/:presid")
  .put(Validator.update, Controller.updatePrescription);
router
  .route("/assign/:presid")
  .put(Validator.assign, Controller.assignPrescription);

//daily medication routes
router.route("/add/dailyMedications").post(Controller.addDailyMedications);
router
  .route("/get/dailyMedications/:userid")
  .get(Controller.getDailyMedications);
router.route("/mark/taken/:medicationId").put(Controller.markAsTaken);

module.exports = router;
