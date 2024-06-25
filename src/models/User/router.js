const express = require("express");
const Controller = require("./controller");
const router = express.Router();

router.route("/login").post(Controller.logInUser);
router.route("/create").post(Controller.createUser);
router.route("/resetPassword").post(Controller.resetPassword);
router.route("/update").post(Controller.updateUser);

module.exports = router;
