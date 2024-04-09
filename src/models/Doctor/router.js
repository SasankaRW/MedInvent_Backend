const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const router = express.Router();

router.route("/newdoctor").post(Validator.create, Controller.createDoctor);
router.route("/get/alldoctors").get(Controller.getAllDoctors);
router.route("/get/:id").get(Controller.getDoctorById);
router.route("/update/:id").put(Validator.update, Controller.updatePharmacy);
router.route("/delete/:id").delete(Controller.deleteDoctor);
module.exports = router;
