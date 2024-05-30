const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const router = express.Router();

router.route("/newAppointment").post(Validator.create, Controller.createAppointment);
router.route("/get/pastAppointments").get(Controller.getPastAppointments);
router.route("/get/upComingAppointments").get(Controller.getUpcomingAppointments);
router.route("/get/getAppointmentcById/:Id").get(Controller.getAppointmentcById);
router.route("/update/cancelAppointment:id").put(Validator.update, Controller.cancelAppointment);


module.exports = router;
