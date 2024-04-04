const express = require("express");

//const { MetaDataRoutes } = require("./modules/metadata");

const { PatientUserRoutes } = require("./models/PatientUser");

const router = express.Router();

router.use("/new-user-details", PatientUserRoutes);

module.exports = router; 