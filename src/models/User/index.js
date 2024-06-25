const Controller = require("./controller");
const Constants = require("./constants");
const Service = require("./service");
const Routes = require("./router");

module.exports = {
  UserConstants: Constants,

  UserService: Service,

  UserController: Controller,

  UserRoutes: Routes,
};
