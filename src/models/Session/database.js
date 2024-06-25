const sequelize = require("../../../config/database");
const Session = require("./Session");
const Clinic = require("../Clinic/Clinic");
const Doctor = require("../Doctor/Doctor");
const Appointment = require("../Appointment/Appointment");
const TokenStore = require("../PushNotification/TokenStore");
const CancelSession = require("../Session/CancelSession");
const DoctorArrive = require("../Session/DoctorArrive");
const PatientUser = require("../PatientUser/patientUser");
const { Op } = require("sequelize");

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
        attributes: ["fname", "mname", "lname", "specialization"],
      },
    ],
  });
};

const deleteSingleRecord = async (session_id) => {
  const result = await Session.destroy({ where: { session_id: session_id } });
  return result;
};

const findAllByQuery = async (filter, order) => {
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
        attributes: ["fname", "mname", "lname", "specialization"],
      },
    ],
    order: [["date", order]],
  });
};

const updateRecord = async (session_id, dataNeedToUpdate) =>
  await Session.update(dataNeedToUpdate, {
    where: {
      session_id: session_id,
    },
  });

const findByQuery = async (query) => await Session.findAll(query);

const findOneByQuery = async (query) => await Session.findOne(query);

// newly added below onwards
const findAllSessionsByDoctorID = async (filter) => {
  const getSessionsObject = {
    include: [
      {
        model: Session,
        as: "sessions",
        where: {
          doctor_id: filter,
        },
        include: [
          {
            model: Clinic,
            as: "clinic",
            required: true,
          },
        ],
      },
    ],
  };

  //after 34 require:true,
  const result = await Doctor.findAll(getSessionsObject);
  return result;
};

const findAllSessionsByClicicID = async (filter) => {
  const getSessionsObject = {
    include: [
      {
        model: Session,
        as: "sessions",
        where: {
          clinic_id: filter,
        },
        include: [
          {
            model: Doctor,
            as: "doctor",
            required: true,
          },
        ],
      },
    ],
  };

  const result = await Clinic.findAll(getSessionsObject);
  return result;
};

const findAllBySearch = async (query) => {
  const sessionWhere = {};
  if (query.date) {
    sessionWhere.date = query.date;
  }

  const doctorWhere = {};
  if (query.doctor) {
    doctorWhere[Op.or] = [
      { fname: { [Op.iLike]: `%${query.doctor}%` } },
      { mname: { [Op.iLike]: `%${query.doctor}%` } },
      { lname: { [Op.iLike]: `%${query.doctor}%` } },
      sequelize.where(
        sequelize.fn(
          "concat_ws",
          " ",
          sequelize.col("fname"),
          sequelize.col("mname"),
          sequelize.col("lname")
        ),
        {
          [Op.iLike]: `%${query.doctor}%`,
        }
      ),
      sequelize.where(
        sequelize.fn(
          "concat_ws",
          " ",
          sequelize.col("fname"),
          sequelize.col("lname")
        ),
        {
          [Op.iLike]: `%${query.doctor}%`,
        }
      ),
      sequelize.where(
        sequelize.fn(
          "concat_ws",
          " ",
          sequelize.col("mname"),
          sequelize.col("lname")
        ),
        {
          [Op.iLike]: `%${query.doctor}%`,
        }
      ),
    ];
  }
  if (query.specialization) {
    doctorWhere.specialization = { [Op.iLike]: `%${query.specialization}%` };
  }

  const clinicWhere = {};
  if (query.clinic) {
    clinicWhere.name = { [Op.iLike]: `%${query.clinic}%` };
  }

  const sessions = await Session.findAll({
    where: sessionWhere,
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "scheduledByType",
        "scheduledById",
        "cancelledById",
        "cancelledByType",
      ],
    },
    include: [
      {
        model: Doctor,
        as: "doctor",
        where: doctorWhere,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: Clinic,
        as: "clinic",
        where: clinicWhere,
        attributes: ["name"],
      },
    ],
    order: [["date", "ASC"]],
  });

  return sessions;
};

const updateisCancelled = async (condition, dataNeedToUpdate) => {
  const [updated] = await Session.update(dataNeedToUpdate, condition);
  return updated;
};

const getPatientsdetails = async (query) => await Appointment.findAll(query);

const findAllTokens = async (getBody) => {
  const whereObject = {
    ...getBody,
    isActiveToken: true,
  };

  const getTokensObject = {
    include: {
      model: TokenStore,
      where: whereObject,
      attributes: ["fcm_token"],
    },
    attributes: [],
  };

  const result = await PatientUser.findAll(getTokensObject);
  return result;
};

const findOneByIdForNotifications = async (id) => {
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
    attributes: ["date"],
  });
};

const createCancelSession = async (CancelSessionToupleArray) => {
  let transaction;
  let is_succes = false;
  try {
    transaction = await sequelize.transaction();
    for (let i = 0; i < CancelSessionToupleArray.length; i++) {
      await CancelSession.create(CancelSessionToupleArray[i], { transaction });
    }
    await transaction.commit();
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
  is_succes = true;
  return is_succes;
};

const findAllCancelledByQuery = async (filter, order) => {
  return await CancelSession.findAll({
    where: filter,
    order: [["date", order]],
  });
};

const deleteCancelledRecord = async (cancel_id) => {
  const result = await CancelSession.destroy({
    where: { cancel_id: cancel_id },
  });
  return result;
};

const updateisArrived = async (condition, dataNeedToUpdate) => {
  const [updated] = await Session.update(dataNeedToUpdate, condition);
  return updated;
};

const getUserDocCliniTokendata = async (session_id) => {
  const results = await Session.findAll({
    where: {
      session_id: session_id,
    },
    attributes: ["date", "session_id"],
    include: [
      {
        model: Doctor,
        as: "doctor",
        required: true,
        attributes: ["fname", "mname", "lname"],
      },
      {
        model: Clinic,
        as: "clinic",
        required: true,
        attributes: ["name"],
      },
      {
        model: Appointment,
        as: "appointments",
        required: true,
        attributes: ["user_id"],
        where:{
          user_id: { [Op.not]: null } 
        }
      }
    ]
  });

  return results;
};

const createDoctorArriveRows = async (DoctorArrivalToupleArray) => {
  let transaction;
  let is_succes = false;
  try {
    transaction = await sequelize.transaction();
    for (let i = 0; i < DoctorArrivalToupleArray.length; i++) {
      await DoctorArrive.create(DoctorArrivalToupleArray[i], { transaction });
    }
    await transaction.commit();
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
  is_succes = true;
  return is_succes;
};

const findAllArriveMessagesByQuery = async (filter, order) => {
  return await DoctorArrive.findAll({
    where: filter,
    order: [["date", order]],
  });
};

const deleteArriveRecord = async (arrive_id) => {
  const result = await DoctorArrive.destroy({
    where: { arrive_id: arrive_id },
  });
  return result;
};

module.exports = {
  Schema: Session,
  findOneById,
  findAllByQuery,
  createRecords,
  updateRecord,
  deleteSingleRecord,
  findAllSessionsByClicicID,
  findAllBySearch,
  findByQuery,
  findOneByQuery,
  findAllSessionsByDoctorID,
  updateisCancelled,
  getPatientsdetails,
  findAllTokens,
  findOneByIdForNotifications,
  createCancelSession,
  findAllCancelledByQuery,
  deleteCancelledRecord,
  updateisArrived,
  getUserDocCliniTokendata,
  createDoctorArriveRows,
  findAllArriveMessagesByQuery,
  deleteArriveRecord,
};
