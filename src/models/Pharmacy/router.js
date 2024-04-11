const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const router = express.Router();

router.route("/newpharmacy").post(Validator.create, Controller.createPharmacy);
router.route("/get/allpharmacies").get(Controller.getAllPharmacies);
router.route("/get/:id").get(Controller.getPharmacyById);
router.route("/get/getByName/:name").get(Controller.getPharmacyByName);
router.route("/getnearby").get(Controller.getNearByPharmacies);
router.route("/update/:id").put(Validator.update, Controller.updatePharmacy);
router.route("/delete/:id").delete(Controller.deletePharmacy);
module.exports = router;
