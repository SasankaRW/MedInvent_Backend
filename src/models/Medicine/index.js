const Controller = require("./controller");

const Constants = require("./constants");

const Service = require("./service");

const Routes = require("./router");

const Medicine = require("./Medicine");

module.exports = {
  MedicineConstants: Constants,

  MedicineService: Service,

  MedicineController: Controller,

  MedicineRoutes: Routes,

  Medicine: Medicine,
};
