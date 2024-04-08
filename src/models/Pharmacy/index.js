const Controller = require("./controller");

const Constants = require("./constants");

const Service = require("./service");

const Routes = require("./router");

const Pharmacy = require("./Pharmacy");

module.exports = {
  PharmacyConstants: Constants,

  PharmacyService: Service,

  PharmacyController: Controller,

  PharmacyRoutes: Routes,

  Pharmacy: Pharmacy,
};
