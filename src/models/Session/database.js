const sequelize = require("../../../config/database");
const Session = require("./Session");
const Clinic = require("../Clinic/Clinic");
const Doctor = require("../Doctor/Doctor");

const createRecords = async (data) => {
  const { dates, ...sessionData } = data;
  const sessions = [];
  let transaction;

  try {
    transaction = await sequelize.transaction();
    for (const date of dates) {
      const singleRecord = {
        ...sessionData,
        date: date,
      };
      const session = await Session.create(singleRecord, { transaction });
      sessions.push(session);
    }
    await transaction.commit();
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }

  return sessions[0];
};

const findOneById = async (id) => {
  return await Session.findByPk(id, {
    include: [
      {
        model: Clinic,
        as: "clinic",
        attributes: ["name"],
      },
      {
        model: Doctor,
        as: "doctor",
        attributes: ["fname", "mname", "lname"],
      },
    ],
  });
};

const deleteSingleRecord = async (session_id) => {
  const result = await Session.destroy({ where: { session_id: session_id } });
  return result;
};

const findAllByQuery = async (filter) => {
  return await Session.findAll({
    where: filter,
    include: [
      {
        model: Clinic,
        as: "clinic",
        attributes: ["name"],
      },
      {
        model: Doctor,
        as: "doctor",
        attributes: ["fname", "mname", "lname"],
      },
    ],
  });
};

const updateRecord = async (session_id, dataNeedToUpdate) =>
  await Session.update(dataNeedToUpdate, {
    where: {
      session_id: session_id,
    },
  });

module.exports = {
  Schema: Session,
  findOneById,
  findAllByQuery,
  createRecords,
  updateRecord,
  deleteSingleRecord,
};
