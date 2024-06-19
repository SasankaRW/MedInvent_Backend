const Prescription = require("./Prescription");
const PresMedicine = require("./PresMedicine");
const sequelize = require("../../../config/database");
const { Op } = require("sequelize");
const MedicationIntake = require("./MedicationIntake");

async function createPrescription(prescriptionData, medicineData) {
  const { presName, createdBy, doctorName, userID } = prescriptionData;

  try {
    const transaction = await sequelize.transaction();

    const prescription = await Prescription.create(
      {
        presName,
        createdBy,
        userID,
        doctorName: createdBy === "doctor" ? doctorName : null,
      },
      { transaction }
    );

    for (const medicine of medicineData) {
      const { name, qty, frq, mealTiming, duration, reminders } = medicine;

      await PresMedicine.create(
        {
          name,
          qty,
          frq,
          mealTiming,
          duration,
          remainingDays: duration,
          reminders: reminders && reminders.length > 0 ? reminders : null,
          prescription_id: prescription.prescription_id,
        },
        { transaction }
      );
    }

    await transaction.commit();

    return prescription;
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
}

const findAll = async (userid) => {
  return await Prescription.findAll({
    where: {
      userID: userid,
    },
    order: [["createdAt", "DESC"]],
    include: [{ model: PresMedicine, as: "presMedicine" }],
  });
};

const findByQuery = async (query, userid) => {
  return await Prescription.findAll({
    where: {
      [Op.and]: [{ createdBy: query }, { userID: userid }],
    },
    order: [["createdAt", "DESC"]],
    include: [{ model: PresMedicine, as: "presMedicine" }],
  });
};

const updateRecord = async (presId, data) => {
  return await PresMedicine.update(
    { reminders: data.reminders },
    {
      where: {
        prescription_id: presId,
        medicine_id: data.medicineId,
      },
    }
  );
};

const findOneById = async (id) => {
  return await Doctor.findByPk(id);
};

const addDailyMedications = async (data) => {
  const newDailyMedication = await MedicationIntake.create(data);

  return newDailyMedication;
};

const getDailyMedications = async (userId) => {
  return await Prescription.findAll({
    where: {
      userID: userId,
    },
    attributes: ["prescription_id", "presName"],
    include: [
      {
        model: PresMedicine,
        as: "presMedicine",
        attributes: ["medicine_id", "name", "qty", "frq", "mealTiming"],
        include: [
          {
            model: MedicationIntake,
            as: "medicationIntake",
            attributes: ["id", "time", "taken"],
          },
        ],
      },
    ],
  });
};

const markAsTaken = async (medicationId) => {
  return await MedicationIntake.update(
    { taken: true },
    {
      where: {
        id: medicationId,
      },
    }
  );
};

module.exports = {
  Schema: Prescription,
  createPrescription,
  findAll,
  findByQuery,
  findOneById,
  updateRecord,

  addDailyMedications,
  getDailyMedications,
  markAsTaken,
};
