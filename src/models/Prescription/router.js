const express = require("express");

const Controller = require("./controller");

const Validator = require("./validator");

const router = express.Router();

router
  .route("/newprescription")
  .post(Validator.create, Controller.createPrescription);

module.exports = router;
