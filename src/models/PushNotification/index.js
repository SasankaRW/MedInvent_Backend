const Controller = require("./controller");
const Constants = require("./constants");
const Service = require("./service");
const Routes = require("./router");
const OTP = require("./OTP");


module.exports = {
    NotificationController: Controller,
    NotificationRoutes: Routes,
    NotificationConstants: Constants, 
    NotificationService: Service,
    OTP: OTP,
};
