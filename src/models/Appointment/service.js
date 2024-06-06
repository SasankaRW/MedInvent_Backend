const DataBase = require("./database");

const { to, TE } = require("../../helper");

const { Op } = require("sequelize");

const createAppointment = async (data) => {
  const createSingleRecord = DataBase.createSingleRecord(data);

  const [err, result] = await to(createSingleRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const getUserUpcomingAppointments = async (userId) => {
  const getRecords = DataBase.findAll(
    {
      user_id: userId,
    },
    {
      date: {
        [Op.gte]: new Date().toISOString().split("T")[0],
      },
    }
  );

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getUserPastAppointments = async (userId) => {
  const getRecords = DataBase.findAll(
    {
      user_id: userId,
    },
    {
      date: {
        [Op.lt]: new Date().toISOString().split("T")[0],
      },
    }
  );

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getClinicUpcomingAppointments = async (clinicId) => {
  const getRecords = DataBase.findAll(
    {},
    {
      date: {
        [Op.gte]: new Date().toISOString().split("T")[0],
      },
      clinic_id: clinicId,
    }
  );

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getClinicPastAppointments = async (clinicId) => {
  const getRecords = DataBase.findAll(
    {},
    {
      date: {
        [Op.lt]: new Date().toISOString().split("T")[0],
      },
      clinic_id: clinicId,
    }
  );

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getAppointmentById = async (id) => {
  const getRecord = DataBase.findOneById(id);

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const cancelAppointment = async (appointmentId, data) => {
  const updateRecord = DataBase.updateRecord(appointmentId, data);

  const [err, result] = await to(updateRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  const appointment = await DataBase.findOneById(appointmentId);

  return appointment;
};

module.exports = {
  getUserUpcomingAppointments,
  getUserPastAppointments,
  getClinicUpcomingAppointments,
  getClinicPastAppointments,
  createAppointment,
  getAppointmentById,
  cancelAppointment,
};
