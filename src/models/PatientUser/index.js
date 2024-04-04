const Controller = require("./controller");

const Constants = require("./constants");

const Service = require("./service");

const Routes = require("./router");

const Restaurant = require("./patientUser");

module.exports = {
  PatientUserConstants: Constants,

  PatientUserService: Service,

  PatientUserController: Controller,

  PatientUserRoutes: Routes,

  Restaurant: Restaurant,
};
