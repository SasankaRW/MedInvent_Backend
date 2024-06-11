const sequelize = require("../../config/database");
const Appointment = require("../models/Appointment/Appointment");
const Clinic = require("../models/Clinic/Clinic");
const ClinicAddress = require("../models/Clinic/ClinicAddress");
const Doctor = require("../models/Doctor/Doctor");
const Visting = require("../models/Visiting/Visiting");
const PatientUser = require("../models/PatientUser/patientUser");
const DependMember = require("../models/DependMember/DependMember");
const Pharmacy = require("../models/Pharmacy/Pharmacy");
const PharmacyAddress = require("../models/Pharmacy/PharmacyAddress");
const Session = require("../models/Session/Session");
const Prescription = require("../models/Prescription/Prescription");
const PresMedicine = require("../models/Prescription/PresMedicine");
const Medicine = require("../models/Medicine/Medicine");
const TokenStore = require("../models/PushNotification/TokenStore");
const OTP = require("../models/PushNotification/OTP");


module.exports = {
  generateTables: async () => {
    try {
      await sequelize.sync({ alter: false, force: false });
      console.log("Tables synced successfully.");
    } catch (error) {
      console.error("Error syncing tables:", error);
    }
  },
};

