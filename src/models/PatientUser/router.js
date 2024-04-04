const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");
 
const router = express.Router();

//router.route("/").get(Controller.getRestaurantsData);

router.route("/").post(Validator.create, Controller.createPatientUserData);

//router.route("/:id").get(Controller.getRestaurantData);

//router.route("/:id").put(Validator.update, Controller.updateRestaurantData);

//router.route("/:id").delete(Controller.deleteRestaurantData);

module.exports = router;
