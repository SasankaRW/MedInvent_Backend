const Controller = require("./controller");

const Constants = require("./constants");

const Service = require("./service");

const Routes = require("./router");

const Doctor = require("./Doctor");

module.exports = {
  DoctorConstants: Constants,

  DoctorService: Service,

  DoctorController: Controller,

  DoctorRoutes: Routes,

  Doctor: Doctor,
};
