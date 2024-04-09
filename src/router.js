const express = require("express");

//const { MetaDataRoutes } = require("./modules/metadata");

const { PatientUserRoutes } = require("./models/PatientUser");
const { ClinicRoutes } = require("./models/Clinic");
const { PharmacyRoutes } = require("./models/Pharmacy");
const { DoctorRoutes } = require("./models/Doctor");

const router = express.Router();

router.use("/PatientUser", PatientUserRoutes);
router.use("/clinic", ClinicRoutes);
router.use("/pharmacy", PharmacyRoutes);
router.use("/doctor", DoctorRoutes);

module.exports = router;
