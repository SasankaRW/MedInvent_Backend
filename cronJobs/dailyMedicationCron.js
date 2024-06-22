const cron = require("node-cron");
const sequelize = require("../config/database");
const PresMedicine = require("../src/models/Prescription/PresMedicine");
const MedicationIntake = require("../src/models/Prescription/MedicationIntake");
const { Op } = require("sequelize");

cron.schedule("5 0 * * *", async () => {
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Colombo",
  });

  const transaction = await sequelize.transaction();
  try {
    // Clear the MedicationIntake table
    await MedicationIntake.destroy({
      where: {},
      truncate: true,
      transaction,
    });

    // Find all medications with duration greater than 0
    const medications = await PresMedicine.findAll({
      where: {
        remainingDays: {
          [Op.gt]: 0,
        },
      },
      transaction,
    });

    // Loop through each medication and add to MedicationIntake
    for (let medication of medications) {
      // skip if no reminders
      if (!medication.reminders) {
        continue;
      }
      // Use the reminders
      const reminderTimes = medication.reminders;

      for (let i = 0; i < reminderTimes.length; i++) {
        await MedicationIntake.create(
          {
            medicine_id: medication.medicine_id,
            date: today,
            time: reminderTimes[i],
            taken: false,
          },
          { transaction }
        );
      }
    }

    await transaction.commit();
    console.log("Medications added to MedicationIntake successfully.");
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating medication intake table", error);
  }
});
