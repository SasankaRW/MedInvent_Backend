const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const router = express.Router();

router.route("/newclinic").post(Validator.create, Controller.createClinic);
router.route("/get/allclinics").get(Controller.getAllClinics);
router.route("/get/:id").get(Controller.getClinicById);
router.route("/update/:id").put(Validator.update, Controller.updateClinic);
router.route("/delete/:id").delete(Controller.deleteClinic);

module.exports = router;
