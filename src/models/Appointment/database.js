const { Op } = require("sequelize");
const Appointment = require("./Appointment");
const Clinic = require("../Clinic/Clinic");

const createSingleRecord = async (singleRecord) => {
  const data = singleRecord.data;
  return await Appointment.create({
    appointmentNo: data.no,
    patientTitle: data.patientTitle,
    patientName: data.patientName,
    contactNo: data.contactNo,
    email: data.email,
    area: data.area,
    nic: data.nic,
    date: data.date,
    clinicId: data.clinicId,
  });
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
    include: [{ model: Clinic, as: "clinic" }],
  });
};

const findAll = async () => {
  return await Appointment.findAll({
    order: [["createdAt", "DESC"]],
    include: [{ model: Clinic, as: "clinic" }],
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
    include: [{ model: Clinic, as: "clinic" }],
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
    include: [{ model: Clinic, as: "clinic" }],
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
    include: [{ model: Clinic, as: "clinic" }],
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
