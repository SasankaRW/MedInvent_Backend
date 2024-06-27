const Prescription = require("./Prescription");
const PresMedicine = require("./PresMedicine");
const sequelize = require("../../../config/database");
const { Op } = require("sequelize");
const MedicationIntake = require("./MedicationIntake");
const DependMember = require("../DependMember/DependMember");

async function createPrescription(prescriptionData, medicineData) {
  const { presName, createdBy, doctorName, userID } = prescriptionData;
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Colombo",
  });

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

      const result = await PresMedicine.create(
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
      const medicine_id = result.dataValues.medicine_id;
      if (reminders && reminders.length) {
        for (const reminder of reminders) {
          await MedicationIntake.create(
            {
              medicine_id,
              date: today,
              time: reminder,
              taken: false,
            },
            { transaction }
          );
        }
      }
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
    include: [
      { model: PresMedicine, as: "presMedicine" },
      {
        model: DependMember,
        as: "dependMember",
        attributes: ["dID", "Fname", "Lname", "relationship"],
      },
    ],
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
  const transaction = await sequelize.transaction();
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Colombo",
  });
  let result;

  try {
    result = await PresMedicine.update(
      { reminders: data.reminders },
      {
        where: {
          prescription_id: presId,
          medicine_id: data.medicineId,
        },
        transaction,
      }
    );

    if (data.reminders && data.reminders.length > 0) {
      for (const reminder of data.reminders) {
        await MedicationIntake.create(
          {
            medicine_id: data.medicineId,
            date: today,
            time: reminder,
            taken: false,
          },
          { transaction }
        );
      }
    }

    await transaction.commit();

    return result;
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
};

const assignPrescription = async (presId, data) => {
  return await Prescription.update(data, {
    where: {
      prescription_id: presId,
    },
  });
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

const markAsTaken = async (medicationId, currentStatus) => {
  if (currentStatus) {
    return await MedicationIntake.update(
      { taken: false },
      {
        where: { id: medicationId },
      }
    );
  } else {
    return await MedicationIntake.update(
      { taken: true },
      {
        where: { id: medicationId },
      }
    );
  }
};

module.exports = {
  Schema: Prescription,
  createPrescription,
  findAll,
  findByQuery,
  findOneById,
  updateRecord,
  assignPrescription,

  addDailyMedications,
  getDailyMedications,
  markAsTaken,
};
