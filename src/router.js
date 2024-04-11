const express = require("express");

//const { MetaDataRoutes } = require("./modules/metadata");
const { AppointmentRoutes } = require("./models/Appointment" );

const { PatientUserRoutes } = require("./models/PatientUser");
const { ClinicRoutes } = require("./models/Clinic");
const { PharmacyRoutes } = require("./models/Pharmacy");
const { DoctorRoutes } = require("./models/Doctor");
const { DependMemberRoutes } = require("./models/DependMember");

const router = express.Router();

router.use("/Appointment", AppointmentRoutes);

router.use("/PatientUser", PatientUserRoutes);
router.use("/clinic", ClinicRoutes);
router.use("/pharmacy", PharmacyRoutes);
router.use("/doctor", DoctorRoutes);
router.use("/DependMember", DependMemberRoutes);
module.exports = router;

