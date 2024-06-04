const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const router = express.Router();

router
  .route("/newprescription")
  .post(Validator.create, Controller.createPrescription);
router.route("/getallprescriptions/:userid").get(Controller.getAllPrescriptions);
router.route("/getDoctorPrescriptions/:userid").get(Controller.getDoctorPrescriptions);
router.route("/getUserPrescriptions/:userid").get(Controller.getUserPrescriptions);
router.route("/update/:presid").put(Validator.update, Controller.updatePrescription);

module.exports = router;
