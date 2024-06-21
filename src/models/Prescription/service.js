const DataBase = require("./database");
const { to, TE } = require("../../helper");

const createPrescription = async (data) => {
  const createPrescription = DataBase.createPrescription(
    data.presData,
    data.presMedicines
  );

  const [err, result] = await to(createPrescription);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const getAllPrescriptions = async (userid) => {
  const getRecords = DataBase.findAll(userid);

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getDoctorPrescriptions = async (userid) => {
  const getRecords = DataBase.findByQuery("doctor", userid);

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const getUserPrescriptions = async (userid) => {
  const getRecords = DataBase.findByQuery("user", userid);

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const updatePrescription = async (presId, data) => {
  const updateRecord = DataBase.updateRecord(presId, data);

  const [err, result] = await to(updateRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  return result;
};

const assignPrescription = async (presId, data) => {
  const updateRecord = DataBase.assignPrescription(presId, data);

  const [err, result] = await to(updateRecord);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  return result;
};

const addDailyMedications = async (data) => {
  const addDailyMedications = DataBase.addDailyMedications(data);

  const [err, result] = await to(addDailyMedications);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

const getDailyMedications = async (userid) => {
  const getRecords = DataBase.getDailyMedications(userid);

  const [err, result] = await to(getRecords);

  if (err) TE(err);

  if (!result) TE("Results not found");

  return result;
};

const markAsTaken = async (medicationId, currentStatus) => {
  const markAsTaken = DataBase.markAsTaken(medicationId, currentStatus);

  const [err, result] = await to(markAsTaken);

  if (err) TE(err.errors[0] ? err.errors[0].message : err);

  if (!result) TE("Result not found");

  return result;
};

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getDoctorPrescriptions,
  getUserPrescriptions,
  updatePrescription,
  assignPrescription,

  getDailyMedications,
  addDailyMedications,
  markAsTaken,
};
