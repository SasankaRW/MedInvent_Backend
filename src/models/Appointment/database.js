const { Op } = require("sequelize");
const Appointment = require("./Appointment");
const Session = require("../Session/Session");

const createSingleRecord = async (singleRecord) => {
  return await Appointment.create(singleRecord);
};


const deleteSingleRecord = async (id) => {
  return await Appointment.destroy({ where: { appointment_id: id } });
};

const updateMultipleRecords = async (query, updates) => {
  return await Appointment.update(updates, { where: query });
};

const updateRecord = async (condition, dataNeedToUpdate) => {
  return await Appointment.update(dataNeedToUpdate, { where: condition });
};

const findOneById = async (id) => {
  return await Appointment.findByPk(id, {
    include: [{ model: Session, as: "session" }],
  });
};

const findAll = async () => {
  return await Appointment.findAll({
    order: [["createdAt", "DESC"]],
    include: [{ model: Session, as: "session" }],
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

const getUpcomingAppointments = async () => {
  const currentDate = new Date();
  return await Appointment.findAll({
    where: {
      date: {
        [Op.gt]: currentDate,
      },
    },
    order: [["date", "ASC"]],
    include: [{ model: Session, as: "session" }],
  });
};

const getPastAppointments = async () => {
  const currentDate = new Date();
  return await Appointment.findAll({
    where: {
      date: {
        [Op.lt]: currentDate,
      },
    },
    order: [["date", "DESC"]],
    include: [{ model: Session, as: "session" }],
  });
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
  getUpcomingAppointments,
  getPastAppointments,
};
