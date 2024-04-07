const express = require("express");

//const { MetaDataRoutes } = require("./modules/metadata");

const { PatientUserRoutes } = require("./models/PatientUser");

const router = express.Router();

router.use("/PatientUser", PatientUserRoutes);

module.exports = router; 