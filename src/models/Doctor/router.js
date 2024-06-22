const express = require("express");
const Controller = require("./controller");
const Validator = require("./validator");
const router = express.Router();

router.route("/newdoctor").post(Validator.create, Controller.createDoctor);
router.route("/get/alldoctors").get(Controller.getAllDoctors);
router.route("/get/:id").get(Controller.getDoctorById);
router.route("/get/getByName/:name").get(Controller.getDoctorByName);
router.route("/update/:id").put(Validator.update, Controller.updateDoctor);
router.route("/delete/:id").delete(Controller.deleteDoctor);
module.exports = router;
