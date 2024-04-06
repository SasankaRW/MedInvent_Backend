const sequelize = require("../../config/database");
const Appointment = require("../models/Appointment/Appointment");
const Clinic = require("../models/Clinic/Clinic");
const ClinicAddress = require("../models/Clinic/ClinicAddress");
const ClinicLocation = require("../models/Clinic/ClinicLocation");
const Doctor = require("../models/Doctor/Doctor");
const Visting = require("../models/Doctor/Visting");
const PatientUser = require("../models/PatientUser/patientUser");
const Pharmacy = require("../models/Pharmacy/Pharmacy");
const PharmacyAddress = require("../models/Pharmacy/PharmacyAddress");
const PharmacyLocation = require("../models/Pharmacy/PharmacyLocation");
const Session = require("../models/Session/Session");
const SessionDates = require("../models/Session/SessionDates");

module.exports = {
  generateTables: async () => {
    try {
      // Define the models you want to sync here
      await sequelize.sync({ alter: false, force: false });
      console.log("Tables synced successfully.");
    } catch (error) {
      console.error("Error syncing tables:", error);
    }
  },
};

//, models: [PatientUser]
