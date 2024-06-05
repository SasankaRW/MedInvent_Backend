const Constants = require("./constants");

const DataBase = require("./database");

const { Op } = require("sequelize");

const { to, TE } = require("../../helper");

const createSession = async (data) => {
  const createRecords = DataBase.createRecords(data);

  const [err, result] = await to(createRecords);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const getSessionById = async (id) => {
  const getRecord = DataBase.findOneById(id);

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getUpcomingSessionsByDocID = async (docId) => {
  const today = new Date();

  const getRecord = DataBase.findAllByQuery({
    doctor_id: docId,
    date: {
      [Op.gt]: today,
    },
  });

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getPastSessionsByDocID = async (docId) => {
  const today = new Date();

  const getRecord = DataBase.findAllByQuery({
    doctor_id: docId,
    date: {
      [Op.lt]: today,
    },
  });

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getUpcomingSessionsByClinicID = async (clinicId) => {
  const today = new Date();

  const getRecord = DataBase.findAllByQuery({
    clinic_id: clinicId,
    date: {
      [Op.gt]: today,
    },
  });

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const getPastSessionsByClinicID = async (clinicId) => {
  const today = new Date();

  const getRecord = DataBase.findAllByQuery({
    clinic_id: clinicId,
    date: {
      [Op.lt]: today,
    },
  });

  const [err, result] = await to(getRecord);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

const updateSession = async (session_id, updateData) => {
  const updateRecord = DataBase.updateRecord(session_id, updateData);

  const [err, result] = await to(updateRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  const session = await DataBase.findOneById(session_id);

  return session;
};

const deleteSession = async (session_id) => {
  const deleteRecode = DataBase.deleteSingleRecord(session_id);

  const [err, result] = await to(deleteRecode);

  if (err) TE(err);

  if (!result) TE("Result not found");

  return result;
};

module.exports = {
  createSession,
  getSessionById,
  getUpcomingSessionsByDocID,
  getPastSessionsByDocID,
  getUpcomingSessionsByClinicID,
  getPastSessionsByClinicID,
  deleteSession,
  updateSession,
};
