const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const router = express.Router();

router.route("/newclinic").post(Validator.create, Controller.createClinic);
router.route("/get/allclinics").get(Controller.getAllClinics);
router.route("/getnearby", Controller.getNearByClinics);
router.route("/get/:id").get(Controller.getClinicById);
router.route("/get/getByName/:name").get(Controller.getClinicByName);
router.route("/getnearby").get(Controller.getNearByClinics);
router.route("/update/:id").put(Validator.update, Controller.updateClinic);
router.route("/delete/:id").delete(Controller.deleteClinic);

module.exports = router;
