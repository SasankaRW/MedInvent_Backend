const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const router = express.Router();

router.route("/newvisiting").post(Validator.create, Controller.createVisiting);
router
  .route("/clinic/get/allvisitings/:clinic_id")
  .get(Controller.getAllVisitingDoctors);
router
  .route("/doctor/get/allvisitings/:doctor_id")
  .get(Controller.getAllVisitingClinics);
router
  .route("/clinic/get/pendingvisitings/:clinic_id")
  .get(Controller.getPendingDoctors);
router
  .route("/doctor/get/pendingvisitings/:doctor_id")
  .get(Controller.getPendingClinics);
router.route("/update").put(Validator.update, Controller.updateVisiting);
router.route("/delete").delete(Controller.deleteVisiting);

module.exports = router;
