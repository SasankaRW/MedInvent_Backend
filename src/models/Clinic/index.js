const Controller = require("./controller");

const Constants = require("./constants");

const Service = require("./service");

const Routes = require("./router");

const Clinic = require("./Clinic");

module.exports = {
  ClinicConstants: Constants,

  ClinicService: Service,

  ClinicController: Controller,

  ClinicRoutes: Routes,

  Clinic: Clinic,
};
