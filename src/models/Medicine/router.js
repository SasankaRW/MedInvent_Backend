const express = require("express");

const Controller = require("./controller");

const router = express.Router();

router.route("/get/getByName/:name").get(Controller.getMedicineByName);

module.exports = router;
