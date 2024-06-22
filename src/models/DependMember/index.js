const Controller = require("./controller");
const Constants = require("./constants");
const Service = require("./service");
const Routes = require("./router");
const DependMember = require("./DependMember");

module.exports = {
  DependMemberConstants: Constants,

  DependMemberService: Service,

  DependMemberController: Controller,

  DependMemberRoutes: Routes,

  DependMember: DependMember,
};
