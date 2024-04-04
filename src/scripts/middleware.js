const sequelize = require("../../config/database");
const { PatientUser } = require("../models/PatientUser/patientUser");
const { Pharmacy } = require("../models/Pharmacy/Pharmacy");
const PharmacyAddress = require("../models/Pharmacy/PharmacyAddress");
const PharmacyLocation = require("../models/Pharmacy/PharmacyLocation");

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
