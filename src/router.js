const express = require("express");

//const { MetaDataRoutes } = require("./modules/metadata");

const { PatientUserRoutes } = require("./models/PatientUser");
const { ClinicRoutes } = require("./models/Clinic");
const { PharmacyRoutes } = require("./models/Pharmacy");

const router = express.Router();

router.use("/PatientUser", PatientUserRoutes);
router.use("/clinic", ClinicRoutes);
router.use("/pharmacy", PharmacyRoutes);

module.exports = router;
