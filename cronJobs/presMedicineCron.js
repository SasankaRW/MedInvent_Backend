const cron = require("node-cron");
const sequelize = require("../config/database");
const PresMedicine = require("../src/models/Prescription/PresMedicine");
const { Op } = require("sequelize");

cron.schedule("0 0 * * *", async () => {
  try {
    await PresMedicine.update(
      { remainingDays: sequelize.literal('"remainingDays" - 1') },
      { where: { remainingDays: { [Op.gt]: 0 } } }
    );
  } catch (error) {
    console.error("Error updating remainingDays: ", error);
  }
});
