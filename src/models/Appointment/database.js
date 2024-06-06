const { Op } = require("sequelize");
const sequelize = require("../../../config/database");
const Appointment = require("./Appointment");
const Session = require("../Session/Session");
const Doctor = require("../Doctor/Doctor");
const Clinic = require("../Clinic/Clinic");

const createSingleRecord = async (data) => {
  const transaction = await sequelize.transaction();

  try {
    const session = await Session.findByPk(data.session_id);

    if (!session) {
      throw new Error("Session not found");
    }

    if (session.activePatients >= session.noOfPatients) {
      throw new Error("Session is full");
    }

    const appointmentCount = await Appointment.count({
      where: { session_id: data.session_id },
      transaction,
    });

    const appointmentNo = appointmentCount + 1;

    const newAppointment = await Appointment.create(
      {
        ...data,
        appointmentNo: appointmentNo,
      },
      { transaction }
    );

    await session.increment("activePatients", { by: 1 });

    await transaction.commit();

    return newAppointment;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const findOneById = async (id) => {
  return await Appointment.findByPk(id, {
    include: [
      {
        model: Session,
        as: "session",
        attributes: ["date", "timeFrom", "timeTo"],
        include: [
          {
            model: Doctor,
            as: "doctor",
            attributes: ["fname", "mname", "lname"],
          },
          {
            model: Clinic,
            as: "clinic",
            attributes: ["name"],
          },
        ],
      },
    ],
  });
};

const findAll = async (appointmentFilter, sessionFilter) => {
  return await Appointment.findAll({
    where: appointmentFilter,
    include: [
      {
        model: Session,
        as: "session",
        where: sessionFilter,
        attributes: ["date", "timeFrom", "timeTo"],
        include: [
          {
            model: Doctor,
            as: "doctor",
            attributes: ["fname", "mname", "lname"],
          },
          {
            model: Clinic,
            as: "clinic",
            attributes: ["name"],
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

const findByQuery = async (query) => {
  return await Appointment.findAll({
    where: {
      [Op.or]: [
        { patientName: { [Op.iLike]: `%${query}%` } },
        { contactNo: { [Op.iLike]: `%${query}%` } },
        { email: { [Op.iLike]: `%${query}%` } },
        { area: { [Op.iLike]: `%${query}%` } },
        { nic: { [Op.iLike]: `%${query}%` } },
      ],
    },
    include: [{ model: Session, as: "session" }],
  });
};

const deleteSingleRecord = async (id) => {
  return await Appointment.destroy({ where: { appointment_id: id } });
};

const updateMultipleRecords = async (query, updates) => {
  return await Appointment.update(updates, { where: query });
};

const updateRecord = async (appointmentId, data) => {
  const transaction = await sequelize.transaction();

  try {
    const appointment = await Appointment.findByPk(appointmentId, {
      transaction,
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    const session = await Session.findByPk(appointment.session_id, {
      transaction,
    });

    if (!session) {
      throw new Error("Session not found");
    }

    await appointment.update({ isCancelled: true, ...data }, { transaction });
    await session.decrement("activePatients", { by: 1 }, { transaction });

    await transaction.commit();

    return await Appointment.findByPk(appointment.appointment_id);
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

module.exports = {
  Schema: Appointment,
  createSingleRecord,
  deleteSingleRecord,
  updateMultipleRecords,
  updateRecord,
  findOneById,
  findAll,
  findByQuery,
};
