const Controller = require("./controller");

const Constants = require("./constants");

const Service = require("./service");

const Routes = require("./router");

const Appointment = require("./Appointment");

module.exports = {
  AppointmentConstants: Constants,

  AppointmentService: Service,

  AppointmentController: Controller,

  AppointmentRoutes: Routes,

  Appointment: Appointment,
};
