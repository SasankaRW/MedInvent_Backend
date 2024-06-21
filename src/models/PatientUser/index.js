const Controller = require("./controller");
const Constants = require("./constants");
const Service = require("./service");
const Routes = require("./router");
const PatientUser = require("./patientUser");

module.exports = {
  PatientUserConstants: Constants,

  PatientUserService: Service,

  PatientUserController: Controller,

  PatientUserRoutes: Routes,

  PatientUser: PatientUser,
};
