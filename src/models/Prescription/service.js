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
};

// const getDoctorById = async (id) => {
//   const getRecord = DataBase.findOneById(id);

//   const [err, result] = await to(getRecord);

//   if (err) TE(err);

//   if (!result) TE("Result not found");

//   return result;
// };

// const getDoctorByName = async (name) => {
//   const getRecord = DataBase.findByQuery(name);

//   const [err, result] = await to(getRecord);

//   if (err) TE(err);

//   if (!result) TE("Result not found");

//   return result;
// };

// const deleteDoctor = async (id) => {
//   const deleteRecord = DataBase.deleteSingleRecord(id);

//   const [err, result] = await to(deleteRecord);

//   if (err) TE(err);

//   if (!result) TE("Result not found");

//   return result;
// };

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getDoctorPrescriptions,
  getUserPrescriptions,
  updatePrescription,
};
