const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const router = express.Router();

router
  .route("/newappointment")
  .post(Validator.create, Controller.createAppointment);
router.route("/get/user/past/:userId").get(Controller.getUserPastAppointments);
router
  .route("/get/user/upcoming/:userId")
  .get(Controller.getUserUpcomingAppointments);
router
  .route("/get/clinic/past/:clinicId")
  .get(Controller.getClinicPastAppointments);
router
  .route("/get/clinic/upcoming/:clinicId")
  .get(Controller.getClinicUpcomingAppointments);
router.route("/get/:appointmentId").get(Controller.getAppointmentById);
router
  .route("/update/cancel/:appointmentId")
  .put(Validator.update, Controller.cancelAppointment);

module.exports = router;
