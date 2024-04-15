const express = require("express");

//const { MetaDataRoutes } = require("./modules/metadata");
const { AppointmentRoutes } = require("./models/Appointment");
const { VisitingRoutes } = require("./models/Visiting");
const { PatientUserRoutes } = require("./models/PatientUser");
const { ClinicRoutes } = require("./models/Clinic");
const { PharmacyRoutes } = require("./models/Pharmacy");
const { DoctorRoutes } = require("./models/Doctor");
const { DependMemberRoutes } = require("./models/DependMember");
const { SessionRoutes } =require("./models/Session");


const router = express.Router();

router.use("/Appointment", AppointmentRoutes);
router.use("/visiting", VisitingRoutes);
router.use("/PatientUser", PatientUserRoutes);
router.use("/clinic", ClinicRoutes);
router.use("/pharmacy", PharmacyRoutes);
router.use("/doctor", DoctorRoutes);
router.use("/DependMember", DependMemberRoutes);
router.use("/Session",SessionRoutes);
module.exports = router;
