const express = require("express");

//const { MetaDataRoutes } = require("./modules/metadata");

const { PatientUserRoutes } = require("./models/PatientUser");
const { DependMemberRoutes } = require("./models/DependMember");

const router = express.Router();

router.use("/PatientUser", PatientUserRoutes);
router.use("/DependMember", DependMemberRoutes);

module.exports = router; 