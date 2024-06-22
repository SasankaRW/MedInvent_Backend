const Controller = require("./controller");
const Constants = require("./constants");
const Service = require("./service");
const Routes = require("./router");
const Prescription = require("./Prescription");

module.exports = {
  PrescriptionConstants: Constants,

  PrescriptionService: Service,

  PrescriptionController: Controller,

  PrescriptionRoutes: Routes,

  Prescription: Prescription,
};
